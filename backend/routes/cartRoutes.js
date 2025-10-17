import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
 
const router = express.Router();

// 🛒 Add item to cart
router.post("/add",   async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📜 Get cart items
router.get("/",   async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(cart || { items: [] });
});

// ✏️ Update item quantity
router.put("/update",   async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(i => i.product.toString() === productId);
  if (item) item.quantity = quantity;

  await cart.save();
  res.json(cart);
});

// ❌ Remove item
router.delete("/remove/:productId",   async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();

  res.json(cart);
});

export default router;
