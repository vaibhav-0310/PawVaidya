import express from 'express';
import Blog from "../schema/blogs.schema.js";

const router = express.Router();

router.get("/blog",async(req,res)=>{
    try{
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    }catch(err){
        res.status(500).json({error: err.message}); 
    }
});

export default router;