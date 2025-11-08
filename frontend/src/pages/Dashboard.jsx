// pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import HotDealManager from "../components/HotDealManager";
import SpecialOfferManager from "../components/SpecialOfferManager";
import { API_BASE_URL } from "../api/API";
import AdminOrders from "../components/AdminOrders";
export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // admin JWT
 
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/products`, {
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
 

   

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex border-b border-gray-300 pb-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button className="bg-orange-600 py-2 rounded-xl text-white cursor-pointer hover:bg-red-500 px-6" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>LogOut</button>
      </div>
      {/* side nav start from here */}
      <nav className="fixed left-0 p-4 w-80 border-gray-300 border-r top-0 h-full bg-white">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </nav>
      <div className="flex">
        <div className="w-[25%]"></div>
        <div className="w-[70%]">
          <AdminOrders/>
      <ProductForm />

      <h3 className="text-xl font-semibold mb-2">Your Products</h3>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ProductList/>
      )}
       <HotDealManager/>
       <SpecialOfferManager/>
       </div>
       </div>
    </div>
  );
}
