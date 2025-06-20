import express from 'express';
import mongoose from 'mongoose';
import Essential from '../schema/essentail.schema.js';
import essentialsData from './data.js'; 
import dotenv from 'dotenv';
dotenv.config();

const app=express();

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pawvaidya");
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
const pushEssentials = async (essentialsArray) => {
  try {
    await Essential.deleteMany({}); // Clear existing essentials
    await Essential.insertMany(essentialsArray);
    console.log("All essential items saved successfully");
  } catch (error) {
    console.error("Error saving essential items:", error);
  }
};

connect()
  .then(() => pushEssentials(essentialsData))
  .catch((err) => {
    console.error("Failed to push essentials:", err);
  });
