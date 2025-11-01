// Category.js
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  image: {
    url: String,
    public_id: String,
  },
});

export default mongoose.model("Category", CategorySchema);
