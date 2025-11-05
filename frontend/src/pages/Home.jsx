// pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LatestNews from "../components/LatestNews";
import Category from "../components/Category";
import SpecialOfferSlider from "../components/SpecialOfferSlider";
import { API_BASE_URL } from "../api/API";
import Footer from "../components/Footer";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/products`);
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
  if (loading) return <p className="h-[80vh]">Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto ">
      <Navbar />
      <Hero />
      <Category />
     <div className="flex flex-wrap gap-4  mx-3  md:mx-18 mb-10 mt-10 ">
      <div    className="box-1 sm:w-[47%]  w-full  md:w-[46%] xl:w-[370px] text-[#425A8B] h-64  bg-[#DBECE5]     p-6 ">
        <p className="text-sm">Starting from $899</p>
        <h1 className="md:text-3xl text-xl my-2 font-bold">Iphone 13 Pro <br /> 128GB</h1>
        <p>Special Sale</p>
      </div>
      <div   className=" box-2 w-full md:w-1/2 xl:w-[450px] text-[#425A8B] h-64 bg-pink-100    p-6   ">
        <p className="text-sm">New Arrivals</p>
        <h1 className="md:text-3xl text-xl my-2 font-bold">Samsung <br />2022 Led TV</h1>
        <p>Special Sale</p>
      </div>
      <div className=" box-3 w-full  md:w-[370px] xl:w-[500px]  h-64 text-[#425A8B] bg-[#E8FCFF]   p-6  ">
        <h1 className=" text-[#425A8B] mb-2 text-3xl font-bold">Drone Quadcopter <br /> UAV - DJI Air 2S</h1>
        <p>Gimbal Camera,</p>
      </div>
     </div>
      <SpecialOfferSlider/>
     
      <h1 className="text-3xl  text-[#425A8B] font-bold mx-18 my-10">All Products</h1>

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
                 <h3 className="text-lg text-[#425A8B] line-clamp-1 font-semibold">{p.name}</h3>
               </Link>
               <div className="flex flex-wrap-reverse text-sm mb-3 justify-between">
                <p className="text-gray-700 line-through">Regular Price: ${p.previousPrice}</p>
                <p className="text-[#425A8B] font-bold">Offer Price: ${discountedPrice.toFixed(2)}</p>
                </div>
                <Link to={`/product/${p.slug}`}>
                  <button className="bg-transparent hover:bg-[#425A8B] hover:text-white cursor-pointer text-[#425A8B] border border-[#425A8B] py-2 w-full rounded">Buy Now</button>
                </Link>
              </div>
            </div>
          )})}
        </div>
        
      )}
      <LatestNews />
      <Footer />
      </div>
    
  );
}
