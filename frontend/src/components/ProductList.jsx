import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    previousPrice: "",
    offerPrice: "",
    brand: "",
    description: "",
    category: "",
    stock: 0,
    images: [],
  });

  // ✅ Load products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (res.ok) {
      alert(result.message);
      fetchProducts();
    } else {
      alert(result.message);
    }
  };

  // ✅ Start editing
  const startEdit = (product) => {
    setEditingProduct(product._id);
    setEditForm({
      name: product.name,
      previousPrice: product.previousPrice,
      offerPrice: product.offerPrice || "",
      brand: product.brand || "",
      description: product.description || "",
      category: product.category || "",
      stock: product.stock || 0,
      images: [],
    });
  };

  // ✅ Handle edit form input
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setEditForm({ ...editForm, images: Array.from(files) });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };
const handleDescriptionChange = (value) =>{
    setEditForm((prev) => ({ ...prev, description: value }));
}
  // ✅ Submit updated product
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("previousPrice", editForm.previousPrice);
    formData.append("offerPrice", editForm.offerPrice);
    formData.append("brand", editForm.brand);
    formData.append("description", editForm.description);
    formData.append("category", editForm.category);
    formData.append("stock", editForm.stock);

    editForm.images.forEach((file) => {
      formData.append("images", file);
    });

    const res = await fetch(`http://localhost:5000/api/products/${editingProduct}`, {
      method: "PUT",
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      alert("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } else {
      alert(result.message || "Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Product List</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-14">
        {products.map((p) => (
          <div key={p._id} className="border border-gray-200 rounded p-3 flex flex-col">
            {/* ✅ Show first image */}
            {p.images && p.images.length > 0 ? (
              <img
                src={p.images[0].url}
                alt={p.name}
                className="w-[65%] h-auto m-auto   rounded"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <h3 className="font-semibold line-clamp-1 mt-2">{p.name}</h3>
            <div className="flex justify-between"><p className="text-gray-700 line-through">${p.previousPrice}</p>
            <p>${p.offerPrice}</p>
            </div>
            <p className="text-sm text-gray-500">{p.category}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => startEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {editingProduct && (
        <div className="fixed overflow-y-scroll inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded shadow-lg w-full max-w-3xl flex flex-col gap-3"
          >
            <h3 className="text-xl font-semibold mb-2">Edit Product</h3>

            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Name"
              className="border p-2 rounded"
              required
            />

            <input
              type="number"
              name="previousPrice"
              value={editForm.previousPrice}
              onChange={handleEditChange}
              placeholder="Previous Price"
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="offerPrice"
              value={editForm.offerPrice}
              onChange={handleEditChange}
              placeholder="Offer Price"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
              placeholder="Category"
              className="border  p-2 rounded"
            />
            <input type="text" name="brand" value={editForm.brand} onChange={handleEditChange} placeholder="Brand" className="border p-2 rounded" />
            <ReactQuill
              name="description"
              value={editForm.description}
              onChange={handleDescriptionChange}
              placeholder="Description"
              className="border max-h-40   overflow-y-scroll overflow-x-scroll p-2 rounded"
            ></ReactQuill>

            <input
              type="number"
              name="stock"
              value={editForm.stock}
              onChange={handleEditChange}
              placeholder="Stock"
              className="border p-2 rounded"
            />

            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleEditChange}
              className="border p-2 rounded"
            />

            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
