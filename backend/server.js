import express from "express";
 import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";
import cartRoutes from "./routes/cartRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import userRoutes from "./routes/userRoute.js";
dotenv.config();
connectDB();
const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
const createDefaultAdmin = async () => {
  try {
    const email = "md.sirforce@gmail.com";     // ✅ unified email
    const password = "admin";              // ✅ password for login

    const existing = await Admin.findOne({ email });

    if (!existing) {
      // const hashedPassword = await bcrypt.hash("admin", 10);
      // await Admin.create({ email, password: hashedPassword });
      await Admin.create({ email, password });
      console.log(`✅ Default admin created: email=${email}, password=${password}`);
    } else {
      console.log("ℹ️ Default admin already exists");
    }
  } catch (err) {
    console.error("❌ Error creating default admin:", err);
  }
};

// Run the default admin creation on startup
createDefaultAdmin();

 app.use('/api/auth', authRoutes);

// Routes
app.use("/api/products", productRoutes);

app.use("/api/UserAuth", userAuthRoutes);
app.use("/api/users", userRoutes); // For profile route
app.use("/api/cart", cartRoutes);
// After DB connect

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
