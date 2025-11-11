import express from "express";
import Order from "../models/Order.js";
 import jwt from "jsonwebtoken"; 
 import User from "../models/User.js";
 
const router = express.Router();

 const authMiddleware = (req, res, next) => {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
     return res.status(401).json({ message: "No token provided" });
   }
 
   const token = authHeader.split(" ")[1];
   try {
     const decoded = jwt.verify(token, process.env.USER_JWT_SECRET || "your_jwt_secret");
     req.user = decoded;
     next();
   } catch (err) {
     return res.status(401).json({ message: "Invalid token" });
   }
 };

// ✅ Create COD order
router.post("/create-cod", authMiddleware, async (req, res) => {
  try {
    const { userId ,items, totalAmount, address, phone, email } = req.body;
    
   
    const order = new Order({
      userId,
      items,
      totalAmount,
      deliveryAddress: address,
      phone,
      email,
      paymentMethod: "cod",
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully (COD)", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create COD order" });
  }
});

// ✅ Get all orders (Admin only)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// ✅ Get user’s orders (for profile)
router.get("/user/:userId", authMiddleware,  async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
});

// ✅ Update order status (Admin)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
});

// ✅ Cancel order (User)
router.put("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "pending" || order.status === "processing") {
      order.status = "cancelled";
      await order.save();
      return res.json({ message: "Order cancelled successfully" });
    } else {
      return res.status(400).json({ message: "Cannot cancel this order now" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error cancelling order" });
  }
});

export default router;
