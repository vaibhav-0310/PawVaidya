import express from "express";
import User from "../schema/user.schema.js";
import passport from "passport";

const router = express.Router();

router.post("/signup",async(req,res)=>{
    try{
    let {username, email, district, state, password}=req.body;
    let existingUsername = await User.findOne({"username": username});
    console.log(existingUsername.username);
    if(existingUsername.username){
        res.status(403).json({message : "User with username already exists"});
        return;
    }
    let newUser= new User({
        username, email, state, district
    });
    User.register(newUser, password);
    res.status(200).json({message: "User created successfully", user_id: newUser._id.toString()});
}
catch(e){
    res.status(400).json({message:"user creation failed"});
    console.log(e);
}
});

export default router;