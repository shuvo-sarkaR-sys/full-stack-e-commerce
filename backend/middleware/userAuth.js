import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectUser = async (req, res, next) => {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    try {
      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.USER_JWT_SECRET || "user_secret");
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch {
      res.status(401).json({ message: "Invalid user token" });
    }
  } else {
    res.status(401).json({ message: "No user token" });
  }
};
