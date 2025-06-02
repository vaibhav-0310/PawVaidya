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

    const result = await cloudinary.uploader.upload(filePath);
    // fs.unlinkSync(filePath); // optionally remove local file

    const newPHR = new phr({
      userId: req.user._id,
      name: result.secure_url
    });

    await newPHR.save();

    // Update user's phr array
    const user = await User.findById(req.user._id);
    user.phr.push(newPHR._id);
    await user.save();

    res.json({ success: true, url: result.secure_url, data: newPHR });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

export default router;