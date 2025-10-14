import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, index: true, unique: true },
  description: String,
  brand: String,
  previousPrice: { type: Number, required: true, default: 0 },
  offerPrice: { type: Number, required: true, default: 0 },
  images: [{ url: String, public_id: String }],
  category: String,
  stock: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
