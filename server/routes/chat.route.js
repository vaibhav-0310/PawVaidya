import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Ensure you have this package installed
const router = express.Router();

const API_KEY = process.env.GEMINI_API_KEY; 
if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    process.exit(1); 
}
const genAI = new GoogleGenerativeAI(API_KEY);

router.post('/gemini-chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "Message is required." });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 


        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text }); 
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: "Failed to get response from AI." });
    }
});

export default router;