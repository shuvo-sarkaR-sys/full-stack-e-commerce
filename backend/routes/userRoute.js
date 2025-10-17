import express from "express";
 import User from "../models/User.js";

const router = express.Router();

// ✅ Get logged-in user profile
router.get("/profile",  async (req, res) => {
  try {
    // req.user is already populated in protectUser middleware
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
