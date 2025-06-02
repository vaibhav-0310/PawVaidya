import express from 'express';
import phr from '../schema/phr.schemas';
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
import fs from 'fs';
import { isLoggedin } from '../middleware/auth.middleware.js';
import dotenv from 'dotenv';
dotenv.config();

const router =express.Router();

// Configure Cloudinary
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

// Upload endpoint
router.post('/upload',isLoggedin, upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath);

    // Delete local file
    fs.unlinkSync(filePath);

    // Save metadata to MongoDB
    const newPHR = new phr({
      userId: req.user._id,  // Ensure userId is passed in request body
      name: result.secure_url
    });

    await newPHR.save();

    res.json({ success: true, url: result.secure_url, data: newPHR });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});
