import express from "express";
import Product from "../models/Product.js";
import slugify from "slugify";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
 import { protect } from "../middleware/auth.js";

 

 const router = express.Router();

// Use multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE product (admin)
router.post("/",   upload.array("images"), async (req, res) => {
  try {
    // optional: check admin role
    const { name, previousPrice, offerPrice, brand, description, category, stock } = req.body;
    const slug = slugify(name || Date.now().toString(), { lower: true, strict: true });

    const uploadedImages = [];
    const files = req.files || [];

    // upload each file buffer to cloudinary
    for (const file of files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
      uploadedImages.push({ url: result.secure_url, public_id: result.public_id });
    }

    const product = new Product({
      name, previousPrice, offerPrice, brand, description, category, stock,
      images: uploadedImages,
      slug,
      createdAt: Date.now()
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// // READ all products (public)
// router.get("/", async (req, res) => {
//   try {
//     // optionally add pagination / filtering / sorting
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
  
// });
 
// ✅ Get all products or filter by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) {
      // ✅ case-insensitive match
      filter.category = new RegExp(`^${category}$`, "i");
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});


 

// 🔍 Search Products by name (case-insensitive)
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const products = await Product.find({
      name: { $regex: query, $options: "i" }, // case-insensitive search
    });

    res.json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// UPDATE product (admin)
router.put("/:id",  upload.array("images"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    // update fields
    const { name, previousPrice, offerPrice, brand, description, category, stock } = req.body;
    if (name) {
      product.name = name;
      product.slug = slugify(name, { lower: true, strict: true });
    }
    if (previousPrice) product.previousPrice = previousPrice;
    if (offerPrice) product.offerPrice = offerPrice;
    if (brand) product.brand = brand;
    if (description) product.description = description;
    if (category) product.category = category;
    if (typeof stock !== "undefined") product.stock = stock;

    // optional: handle new images (append)
    const files = req.files || [];
    for (const file of files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => { if (error) reject(error); else resolve(result); }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
      product.images.push({ url: result.secure_url, public_id: result.public_id });
    }

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE product (admin)
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    // remove images from Cloudinary
    for (const img of (product.images || [])) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await product.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Mark / Update Hot Deal
router.put("/hotdeal/:id",   async (req, res) => {
  try {
    const { isHotDeal, discount } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isHotDeal = isHotDeal;
    product.discount = discount;
    await product.save();

    res.json({ message: "Hot deal updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🟢 Get all Hot Deal Products
router.get("/hotdeals", async (req, res) => {
  try {
    const hotDeals = await Product.find({ isHotDeal: true }).sort({ createdAt: -1 });
    res.json(hotDeals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// READ single product by slug
router.get("/:slug", async (req, res) => {
  try {
    const p = await Product.findOne({ slug: req.params.slug });
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
