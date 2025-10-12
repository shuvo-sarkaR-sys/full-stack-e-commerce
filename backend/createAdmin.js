// scripts/createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const email = "admin@example.com";
const password = "admin123";

const hashedPassword = await bcrypt.hash(password, 10);
const admin = new Admin({ email, password: hashedPassword });

await admin.save();
console.log("✅ Admin created:", admin);
process.exit();
