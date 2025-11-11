// routes/user.js
import express, { text } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
 import nodemailer from "nodemailer";
 
import bcrypt from "bcryptjs";
const router = express.Router();

// 📝 Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    const user = await User.create({ name, email, password, otp, otpExpires });
    await user.save()
 const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
},
 })
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verify Your Email with OTP",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });
    res.json({ message: "OTP sent to email"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/verify-otp", async (req, res) => {
  try {
    const {email, otp} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "User not found"});
    if(user.isVerified) return res.status(400).json({message: "Already verified"});
    if(user.otp !== otp) return res.status(400).json({message: "Invalid OTP"})
      if(user.otpExpires < new Date()) return res.status(400).json({message: "OTP expired"});
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    const token = jwt.sign({id: user._id}, process.env.USER_JWT_SECRET, { expiresIn: "7d"});
    res.json({message: "Email verified successfully", token})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})
// 🔐 Login
// POST /api/UserAuth/login
router.post("/login", async (req, res) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.USER_JWT_SECRET || "your_jwt_secret", { expiresIn: "7d" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
