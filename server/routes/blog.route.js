import express from 'express';
import Blog from "../schema/blogs.schema.js";
import {isLoggedIn} from '../middleware/middleware.js';

const router = express.Router();

router.get("/blog",async(req,res)=>{
    try{
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    }catch(err){
        res.status(500).json({error: err.message}); 
    }
});

router.post("/create/blog", async (req, res) => {
    const { title, author, content, image } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({ error: "Title, author, and content are required." });
    }

    try {
        const newBlog = new Blog({
            title,
            description: content, 
            image: image || null // Optional field
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;