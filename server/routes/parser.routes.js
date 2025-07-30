import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  }
});

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

let pdf = '';

router.post('/pdf-upload', (req, res) => {
  const uploadSingle = upload.single('pdf');
  
  uploadSingle(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      if (err.code === 'UNEXPECTED_FIELD') {
        return res.status(400).json({ 
          error: 'Unexpected field error. Expected field name: "pdf"'
        });
      }
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    try {
      const pdfBuffer = req.file.buffer;
      const data = await pdfParse(pdfBuffer);
      pdf = data.text;
      res.json({ message: 'PDF uploaded and text extracted.' });
    } catch (parseErr) {
      console.error('PDF parsing error:', parseErr);
      res.status(500).json({ error: 'Failed to parse PDF: ' + parseErr.message });
    }
  });
});

router.post('/ask', async (req, res) => {
  const { query } = req.body;
  const context = pdf.slice(0, 8000); 

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `Context:\n${context}\n\nQuestion: ${query}` },
        ],
        max_tokens: 512,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error('Error querying OpenRouter:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from model' });
  }
});

export default router;

