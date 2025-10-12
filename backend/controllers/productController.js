import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
 

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

     
 
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
     
    });

    if (req.files && req.files.length > 0) {
      product.images = req.files.map(f => ({
        url: f.path,
        public_id: f.filename,
      }));
    }

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.assign(product, req.body);

    if (req.files && req.files.length > 0) {
      product.images.push(
        ...req.files.map(f => ({
          url: f.path,
          public_id: f.filename,
        }))
      );
    }

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
