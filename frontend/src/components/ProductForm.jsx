import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../api/API";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
export default function ProductForm({ productId }) {
  const [form, setForm] = useState({
    name: "",
    previousPrice: "",
    offerPrice: "",
    category: "",
    brand: "",
    description: "",
    stock: 0,
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [categoryImage, setCategoryImage] = useState([]);
  const [categoryPreview, setCategoryPreview] = useState([]);
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


  useEffect(() => {
    if (categoryImage.length === 0) {
      setCategoryPreview([]);
      return;
    }
    const urls = categoryImage.map(file => URL.createObjectURL(file));
    setCategoryPreview(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [categoryImage]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }
  //  Handle description from React Quill
  const handleDescriptionChange = (value) => {
    setForm((prev) => ({ ...prev, description: value }));
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };
  // Category file 
  const handleCategoryFile = (e) => {
    setCategoryImage(Array.from(e.target.files));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));

    

    if (categoryImage.length > 0) {
      fd.append("categoryImage", categoryImage[0]); // ✅ only one file
    }
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
 // Optional toolbar customization for React Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4 bg-white rounded shadow">
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
          className="border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="number"
          name="previousPrice"
          placeholder="Previous Price"
          value={form.previousPrice}
          onChange={handleInputChange}
          className="border p-2 border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="offerPrice"
          placeholder="Offer Price"
          value={form.offerPrice}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <label htmlFor="categoryImage" className="block   mb-1">Category Image</label>
        <input type="file" accept="image/*" placeholder="Category Image" onChange={handleCategoryFile} />
        <div className="flex flex-wrap gap-2 mt-2">
          {categoryPreview.map((src, idx) => (
            <img key={idx} src={src} className="w-20 h-20 object-cover rounded" alt="preview" />
          ))}
        </div>
        <input type="text" name="brand" placeholder="Brand Name" value={form.brand} onChange={handleInputChange} required className="border p-2 rounded" />
       
        <label className="block mb-1 font-medium">Description</label>
        <ReactQuill
          theme="snow"
          value={form.description}
          onChange={handleDescriptionChange}
          modules={modules}
          className="h-40"
          placeholder="Write detailed product description..."
        />
         <br />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />

        <div>
          <label className="block font-medium mb-1">Images</label>
          <input type="file" required multiple accept="image/*" onChange={handleFileChange} />
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
