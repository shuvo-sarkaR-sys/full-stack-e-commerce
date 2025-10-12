// pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [form, setForm] = useState({ name: "", price: 0, description: "", category: "", stock: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // admin JWT
console.log('token', token);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const productsArray = Array.isArray(data) ? data : data.products || [];
      setProducts(productsArray);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => setFileList(e.target.files);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);
    fd.append("category", form.category);
    fd.append("stock", form.stock);
    for (const file of fileList) fd.append("images", file);

    try {
      await axios.post("http://localhost:5000/api/products", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      setForm({ name: "", price: 0, description: "", category: "", stock: 0 });
      setFileList([]);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button className="bg-red-600 py-2 rounded-xl cursor-pointer hover:bg-red-500 px-6" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>LogOut</button>
      </div>

      <ProductForm />

      <h3 className="text-xl font-semibold mb-2">Your Products</h3>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ProductList/>
      )}
       
    </div>
  );
}
