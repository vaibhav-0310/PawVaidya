import express from "express";
import User from "../schema/user.schema.js";
import passport from "passport";
import nodemailer from "nodemailer";

let o = 0;

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let { username, email, district, state, password } = req.body;
    let existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      res.status(403).json({ message: "User with username already exists" });
      return;
    }
    let newUser = new User({
      username,
      email,
      state,
      district,
    });
    const { otp } = req.body; 
    if (o == otp) {
      User.register(newUser, password);
      res.status(200).json({
        message: "User created successfully",
        user_id: newUser._id.toString(),
      });
    } else {
      res.status(200).json({ message: "Invalid OTP" });
    }
  } catch (e) {
    res.status(400).json({ message: "user creation failed" });
    console.log(e);
  }
});

router.post("/send-otp", async(req, res) => {
  o = Math.floor(Math.random() * 1000000);
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "vbhargav0310@gmail.com",
      pass: "elsvmuakmltbikfn",
    },
  });
  const to=req.body.email;
   const info = await transporter.sendMail({
    from: '"PawVaidya" <vbhargav0310@gmail.com>',
    to,
    subject: "OTP for PawVaidya",
    text: `OTP for Successful login is ${o}`, 
  });
  res.status(200).json({ message: "OTP sent", otp: o });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      console.log(req.body);
      return res.json({
        message: "Login successful",
        userId: user._id.toString(),
      });
    });
  })(req, res, next);
});
export default router;
