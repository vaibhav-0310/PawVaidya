import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

let pdf = "";

// Function to try multiple PDF parsing strategies
const tryMultiplePdfParsers = async (pdfBuffer) => {
  const strategies = [
    // Strategy 1: Standard pdf-parse
    async () => {
      console.log("Trying standard pdf-parse...");
      const data = await pdfParse(pdfBuffer);
      return data.text;
    },

    // Strategy 2: pdf-parse with different options
    async () => {
      console.log("Trying pdf-parse with options...");
      const data = await pdfParse(pdfBuffer, {
        max: 0,
        version: "v1.10.100",
      });
      return data.text;
    },

    // Strategy 3: pdf-parse with error tolerance
    async () => {
      console.log("Trying pdf-parse with custom render...");
      const data = await pdfParse(pdfBuffer, {
        max: 0,
        pagerender: async (pageData) => {
          try {
            const textContent = await pageData.getTextContent();
            let lastY,
              text = "";
            for (let item of textContent.items) {
              if (lastY == item.transform[5] || !lastY) {
                text += item.str;
              } else {
                text += "\n" + item.str;
              }
              lastY = item.transform[5];
            }
            return text;
          } catch (error) {
            console.log("Custom render failed, falling back to default");
            return pageData
              .getTextContent()
              .then((content) =>
                content.items.map((item) => item.str).join(" ")
              );
          }
        },
      });
      return data.text;
    },

    // Strategy 4: Basic text extraction (fallback)
    async () => {
      console.log("Trying basic text extraction...");
      const data = await pdfParse(pdfBuffer, {
        max: 0,
        normalizeWhitespace: false,
        disableCombineTextItems: false,
      });
      return data.text;
    },
  ];

  let lastError;
  let extractedText = "";

  for (let i = 0; i < strategies.length; i++) {
    try {
      console.log(`Trying PDF parsing strategy ${i + 1}...`);
      const result = await strategies[i]();
      if (result && result.trim().length > 0) {
        console.log(
          `Successfully parsed PDF with strategy ${i + 1}, extracted ${
            result.length
          } characters`
        );
        extractedText = result;
        break;
      }
    } catch (error) {
      console.log(`Strategy ${i + 1} failed:`, error.message);
      lastError = error;

      // Continue to next strategy instead of failing immediately
      if (i === strategies.length - 1) {
        // If this is the last strategy, throw the error
        throw lastError;
      }
    }
  }

  if (!extractedText || extractedText.trim().length === 0) {
    throw (
      lastError ||
      new Error("All PDF parsing strategies failed to extract text")
    );
  }

  return extractedText;
};

router.post("/pdf-upload", (req, res) => {
  const uploadSingle = upload.single("pdf");

  uploadSingle(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      if (err.code === "UNEXPECTED_FIELD") {
        return res.status(400).json({
          error: 'Unexpected field error. Expected field name: "pdf"',
        });
      }
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          error: "File too large. Maximum size allowed is 10MB",
        });
      }
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate file size and type
    if (req.file.size === 0) {
      return res.status(400).json({ error: "Uploaded file is empty" });
    }

    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: "File size exceeds 10MB limit" });
    }

    try {
      console.log(
        `Processing PDF file: ${req.file.originalname} (${req.file.size} bytes)`
      );

      const pdfBuffer = req.file.buffer;

      // Validate PDF header
      const pdfHeader = pdfBuffer.slice(0, 4).toString();
      if (!pdfHeader.startsWith("%PDF")) {
        return res.status(400).json({
          error:
            "Invalid PDF file. The file does not appear to be a valid PDF document.",
        });
      }

      // Try multiple parsing strategies
      const extractedText = await tryMultiplePdfParsers(pdfBuffer);

      if (!extractedText || extractedText.trim().length === 0) {
        return res.status(400).json({
          error:
            "No text content could be extracted from the PDF. The file might be image-based or corrupted.",
        });
      }

      pdf = extractedText;
      console.log(
        `Successfully extracted ${extractedText.length} characters from PDF`
      );

      res.json({
        message: "PDF uploaded and text extracted successfully.",
        textLength: extractedText.length,
        preview:
          extractedText.substring(0, 200) +
          (extractedText.length > 200 ? "..." : ""),
      });
    } catch (parseErr) {
      console.error("PDF parsing error:", parseErr);

      // Provide more specific error messages
      let errorMessage = "Failed to parse PDF: ";

      if (parseErr.message.includes("bad XRef entry")) {
        errorMessage +=
          "The PDF file appears to be corrupted or has invalid cross-reference entries. Please try with a different PDF file.";
      } else if (parseErr.message.includes("Invalid PDF structure")) {
        errorMessage +=
          "The PDF file structure is invalid. Please ensure the file is not corrupted.";
      } else if (parseErr.message.includes("Encrypted PDF")) {
        errorMessage +=
          "The PDF file is password-protected or encrypted. Please upload an unprotected PDF.";
      } else {
        errorMessage += `${parseErr.message}. This might be due to a corrupted file, unsupported PDF version, or password protection.`;
      }

      res.status(500).json({
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development" ? parseErr.stack : undefined,
      });
    }
  });
});

router.post("/ask", async (req, res) => {
  const { query } = req.body;

  // Validate input
  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Query cannot be empty" });
  }

  if (!pdf || pdf.trim().length === 0) {
    return res.status(400).json({
      error: "No PDF content available. Please upload a PDF file first.",
    });
  }

  // Limit context size to prevent token overflow
  const maxContextLength = 8000;
  const context =
    pdf.length > maxContextLength
      ? pdf.substring(0, maxContextLength) + "\n[Content truncated...]"
      : pdf;

  try {
    console.log(
      `Processing query: "${query.substring(0, 100)}${
        query.length > 100 ? "..." : ""
      }"`
    );
    console.log(`Context length: ${context.length} characters`);

    // Try Claude first, then fallback to other models
    const models = [
      "anthropic/claude-3.5-sonnet",
      "openai/gpt-4o-mini",
      "mistralai/mistral-7b-instruct",
    ];

    let response;
    let lastError;

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);
        response = await axios.post(
          OPENROUTER_API_URL,
          {
            model: model,
            messages: [
              {
                role: "system",
                content: `You are a helpful veterinary AI assistant specialized in analyzing pet medical documents and providing informative responses. 

Guidelines for responses:
1. First, carefully analyze the provided document content for relevant information
2. If the document contains the requested information, provide a clear answer based on that content
3. If the document doesn't contain specific information but you have general veterinary knowledge that could help, you may provide general educational information while clearly stating it's not from the document
4. For medication questions: If the document mentions symptoms or conditions, you can suggest common veterinary treatments while emphasizing the need for professional veterinary consultation
5. Always prioritize pet safety and recommend consulting a licensed veterinarian for specific medical decisions
6. Be helpful and informative while being responsible about medical advice

Format your responses clearly and be specific when possible.`,
              },
              {
                role: "user",
                content: `Please analyze the following veterinary document and answer the question. If the document contains the answer, provide it directly. If not, but you can provide helpful general veterinary information related to the question, please do so while noting that it's general information and professional consultation is recommended.

Document Content:
${context}

Question: ${query}

Please provide a helpful and informative answer.`,
              },
            ],
            max_tokens: 1024,
            temperature: 0.3,
          },
          {
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: 30000, // 30 second timeout
          }
        );

        console.log(`Successfully got response from ${model}`);
        break; // Success, exit the loop
      } catch (modelError) {
        console.log(
          `Model ${model} failed:`,
          modelError.response?.data?.error || modelError.message
        );
        lastError = modelError;
        continue; // Try next model
      }
    }

    if (!response) {
      throw lastError || new Error("All models failed to respond");
    }

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error("Invalid response format from AI service");
    }

    const answer = response.data.choices[0].message.content;

    if (!answer || answer.trim().length === 0) {
      return res.status(500).json({
        error: "AI service returned an empty response. Please try again.",
      });
    }

    console.log(`Successfully generated answer of ${answer.length} characters`);
    res.json({
      answer: answer.trim(),
      contextLength: context.length,
      queryLength: query.length,
    });
  } catch (error) {
    console.error(
      "Error querying AI service:",
      error.response?.data || error.message
    );

    let errorMessage = "Failed to get response from AI service";

    if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out. Please try again.";
    } else if (error.response?.status === 401) {
      errorMessage =
        "AI service authentication failed. Please check API configuration.";
    } else if (error.response?.status === 429) {
      errorMessage =
        "Too many requests. Please wait a moment before trying again.";
    } else if (error.response?.status === 413) {
      errorMessage =
        "Request payload too large. Try with a shorter question or smaller document.";
    } else if (error.response?.data?.error) {
      errorMessage = `AI service error: ${error.response.data.error}`;
    }

    res.status(500).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
