// pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Category from "../components/Category";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/products");
        // Defensive: if backend returns { products: [...] } or array directly
        const productsArray = Array.isArray(data) ? data : data.products || [];
        setProducts(productsArray);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto ">
      <Navbar />
      <Hero />
      <Category />
      <h1 className="text-3xl font-bold m-10">All Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid mx-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((p) => { 
            const price = p.offerPrice || p.previousPrice || 0;
            const discountedPrice = p.discount
              ? price - (price * p.discount) / 100
              : price;

            return (
              <div key={p._id} className=" rounded-lg overflow-hidden border border-gray-200 hover:shadow-md  ">
                {p.images?.[0]?.url && (
                  <Link to={`/product/${p.slug}`}>
                    <img
                      src={p.images[0].url}
                   alt={p.name}
                   className="w-full h-72 object-cover"
                 />
               </Link>
              )}
              <div className="p-4">
                
               <Link to={`/product/${p.slug}`}>
                 <h3 className="text-lg font-semibold">{p.name}</h3>
               </Link>
               <div className="flex  text-sm mb-3 justify-between">
                <p className="text-gray-700 line-through">Regular Price: ${price}</p>
                <p className="text-black-500 font-bold">Offer Price: ${discountedPrice.toFixed(2)}</p>
                </div>
                <Link to={`/product/${p.slug}`}>
                  <button className="bg-blue-500 cursor-pointer text-white py-2 w-full rounded">Buy Now</button>
                </Link>
              </div>
            </div>
          )})}
        </div>
      )}
      
    </div>
  );
}
