import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';

const app=express();
const port=process.env.PORT;
app.use(cors());

const connect = async ()=>{
   await mongoose.connect(process.env.MONGO_URL);
};

connect()
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(e);
});

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
});