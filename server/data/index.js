import express from 'express';
import mongoose from 'mongoose';
import Vet from '../schema/vet.schemas.js';
import data from './vet.js'; 
import dotenv from 'dotenv';
dotenv.config();

const app=express();

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://vbhargav0310:Jaimatadi@cluster0.yo8jy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/pawvaidya");
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
const pushEssentials = async (essentialsArray) => {
  try {
    await Vet.deleteMany({}); 
    await Vet.insertMany(essentialsArray);
    console.log("All essential items saved successfully");
  } catch (error) {
    console.error("Error saving essential items:", error);
  }
};

connect()
  .then(() => pushEssentials(data))
  .catch((err) => {
    console.error("Failed to push essentials:", err);
  });
