import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// ✅ Simple health check route
router.get("/", (req, res) => {
  res.send("Auth route is running...");
});

// ✅ Admin Login Route
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // 🧠 Clean the email to avoid whitespace & case mismatch
    email = email.trim().toLowerCase();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("❌ Admin not found for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      console.log("❌ Password mismatch for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.json({
      token,
      admin: { email: admin.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: err.message });
  }
});


// ✅ 1. Forgot Password - Send OTP
router.post("/forgot-password", async (req, res) => {
  let { email } = req.body;
  email = email.trim().toLowerCase();

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  admin.resetOTP = otp;
  admin.resetOTPExpires = Date.now() + 15 * 60 * 1000; // 15 min
  await admin.save();

  await sendEmail(email, "Password Reset OTP", `Your OTP code is: ${otp}`);
  res.json({ message: "OTP sent to your email" });
});

// ✅ 2. Verify OTP
router.post("/verify-otp", async (req, res) => {
  let { email, otp } = req.body;
  email = email.trim().toLowerCase();

  const admin = await Admin.findOne({ email, resetOTP: otp });
  if (!admin) return res.status(400).json({ message: "Invalid OTP" });

  if (admin.resetOTPExpires < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  res.json({ message: "OTP verified" });
});

// ✅ 3. Reset Password & Email (No bcrypt)
router.post("/reset-password", async (req, res) => {
  let { email, otp, newPassword, newEmail } = req.body;
  email = email.trim().toLowerCase();
  if (newEmail) newEmail = newEmail.trim().toLowerCase();

  const admin = await Admin.findOne({ email, resetOTP: otp });
  if (!admin) return res.status(400).json({ message: "Invalid OTP or email" });

  if (admin.resetOTPExpires < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  // ✅ Directly set new password (No hashing)
  admin.password = newPassword;

  // ✅ Update email if provided
  if (newEmail && newEmail !== email) {
    const existingAdmin = await Admin.findOne({ email: newEmail });
    if (existingAdmin) {
      return res.status(400).json({ message: "New email already in use" });
    }
    admin.email = newEmail;
  }

  // ✅ Clear OTP fields
  admin.resetOTP = undefined;
  admin.resetOTPExpires = undefined;

  await admin.save();

  res.json({ message: "Email & Password updated successfully" });
});


export default router;
