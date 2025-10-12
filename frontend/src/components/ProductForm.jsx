import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../api/API";
import { useNavigate } from "react-router-dom";

export default function ProductForm({ productId }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: 0,
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const navigate = useNavigate();
 console.log('api base url', API_BASE_URL);
  // Load existing product for edit
  useEffect(() => {
    if (productId) {
      fetch(`${API_BASE_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => setForm(data))
        .catch(err => console.error("Fetch product error:", err));
    }
  }, [productId]);

  // Preview selected images
  useEffect(() => {
    if (images.length === 0) {
      setPreview([]);
      return;
    }
    const urls = images.map(file => URL.createObjectURL(file));
    setPreview(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [images]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    images.forEach(img => fd.append("images", img));

    try {
      const res = await fetch(
        productId
          ? `${API_BASE_URL}/products/${productId}`
          : `${API_BASE_URL}/products`,
        {
          method: productId ? "PUT" : "POST",
          body: fd,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save product");
      }

      alert(productId ? "Product updated" : "Product created");
      
    } catch (error) {
      console.error("Save product error:", error);
      alert("Error saving product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-3">
        {productId ? "Edit Product" : "Add New Product"}
      </h2>

      <div className="grid gap-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        <div>
          <label className="block font-medium mb-1">Images</label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />
          <div className="flex flex-wrap gap-2 mt-2">
            {preview.map((src, idx) => (
              <img key={idx} src={src} className="w-20 h-20 object-cover rounded" alt="preview" />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {productId ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
