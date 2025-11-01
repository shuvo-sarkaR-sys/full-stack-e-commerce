// pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Category from "../components/Category";
import SpecialOfferSlider from "../components/SpecialOfferSlider";
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
     
      <SpecialOfferSlider/>
     
      <h1 className="text-3xl font-bold mx-18 my-10">All Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid mx-4 md:mx-18 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
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
                   className=" w-[65%] m-auto  mt-4  "
                 />
               </Link>
              )}
              <div className="p-4">
                
               <Link to={`/product/${p.slug}`}>
                 <h3 className="text-lg line-clamp-1 font-semibold">{p.name}</h3>
               </Link>
               <div className="flex  text-sm mb-3 justify-between">
                <p className="text-gray-700 line-through">Regular Price: ${p.previousPrice}</p>
                <p className="text-black-500 font-bold">Offer Price: ${discountedPrice.toFixed(2)}</p>
                </div>
                <Link to={`/product/${p.slug}`}>
                  <button className="bg-orange-500 hover:bg-[#425A8B] cursor-pointer text-white py-2 w-full rounded">Buy Now</button>
                </Link>
              </div>
            </div>
          )})}
        </div>
        
      )}
      </div>
    
  );
}
