import express from 'express';
import phr from '../schema/phr.schemas.js';
import User from "../schema/user.schema.js";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { isLoggedIn } from "../middleware/middleware.js";
import dotenv from 'dotenv';
dotenv.config();

const router =express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
  destination: './public/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', isLoggedIn, upload.single('file'), async (req, res) => {
  try {
    console.log("File upload initiated");
    const filePath = req.file.path;
    const { title } = req.body;

    // Validate title
    if (!title || !title.trim()) {
      return res.status(400).json({ 
        error: 'Title is required', 
        message: 'Please provide a title for your document' 
      });
    }

    const result = await cloudinary.uploader.upload(filePath);

    const newPHR = new phr({
      title: title.trim(),
      userId: req.user._id,
      name: result.secure_url,
      size: req.file.size,
      originalName: req.file.originalname
    });

    await newPHR.save();

    // Update user's phr array
    const user = await User.findById(req.user._id);
    if (!user.phr) {
  user.phr = [];
}

    user.phr.push(newPHR._id);
    await user.save();

    res.json({ 
      success: true, 
      url: result.secure_url, 
      data: newPHR,
      message: 'File uploaded successfully!'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Upload failed', 
      details: err.message,
      message: 'File upload failed. Please try again.'
    });
  }
});

// Get PHRs route - remains the same but ensure it returns title
router.get('/user/phrs', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;

    const userPHRs = await phr.find({ userId }).sort({ createdAt: -1 });

    return res.json(userPHRs);
  } catch (err) {
    console.error("Failed to fetch PHR files:", err);
    return res.status(500).json({ 
      error: "Failed to fetch PHR files",
      message: "Failed to load your files. Please refresh the page."
    });
  }
});
export default router;