// import express from "express";
// import Cart from "../models/Cart.js";
// import Product from "../models/Product.js";
//  import authMiddleware from "../middleware/userAuth.js"; // ✅ import your middleware

// const router = express.Router();

// router.post("/add", authMiddleware, async (req, res) => {
//   const { productId, quantity } = req.body;
//   try {
//     let cart = await Cart.findOne({ user: req.user._id });

//     if (!cart) {
//       cart = new Cart({ user: req.user._id, items: [] });
//     }

//     const existingItem = cart.items.find(item => item.product.toString() === productId);

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ product: productId, quantity });
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📜 Get cart items
// router.get("/", authMiddleware, async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
//   res.json(cart || { items: [] });
// });

// // ✏️ Update item quantity
// router.put("/update", authMiddleware, async (req, res) => {
//   const { productId, quantity } = req.body;
//   const cart = await Cart.findOne({ user: req.user._id });

//   if (!cart) return res.status(404).json({ message: "Cart not found" });

//   const item = cart.items.find(i => i.product.toString() === productId);
//   if (item) item.quantity = quantity;

//   await cart.save();
//   res.json(cart);
// });

// // ❌ Remove item
// router.delete("/remove/:productId", authMiddleware, async (req, res) => {
//   const { productId } = req.params;
//   const cart = await Cart.findOne({ user: req.user._id });

//   if (!cart) return res.status(404).json({ message: "Cart not found" });

//   cart.items = cart.items.filter(i => i.product.toString() !== productId);
//   await cart.save();

//   res.json(cart);
// });


// export default router;
import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Middleware to verify user token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// // ✅ Add product to cart
// router.post("/add", authMiddleware, async (req, res) => {
//   const { productId, quantity } = req.body;

//   try {
//     let cart = await Cart.findOne({ user: req.user.id });

//     if (!cart) {
//       cart = new Cart({ user: req.user.id, items: [] });
//     }

//     const existingItem = cart.items.find(
//       (item) => item.product.toString() === productId
//     );

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ product: productId, quantity });
//     }

//     await cart.save();
//     res.json({ message: "Product added to cart", cart });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// ✅ Add product to cart
router.post("/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Calculate offer price
    const basePrice = product.offerPrice || product.previousPrice || 0;
    const finalPrice = product.discount
      ? basePrice - (basePrice * product.discount) / 100
      : basePrice;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, offerPrice: finalPrice });
    }

    await cart.save();
    res.json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Remove item
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
    await cart.save();
    res.json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ Update item quantity
router.put("/update", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const item = cart.items.find((i) => i.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
    }
    await cart.save();
    res.json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
