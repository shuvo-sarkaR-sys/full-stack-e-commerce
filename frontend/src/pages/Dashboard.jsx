// pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import HotDealManager from "../components/HotDealManager";
import SpecialOfferManager from "../components/SpecialOfferManager";
import { API_BASE_URL } from "../api/API";
import AdminOrders from "../components/AdminOrders";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
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
 
const handleClick = ()=>{
  
}
   

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex w-full border-b border-gray-300 pb-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button className="bg-orange-600 py-2 xl:block hidden rounded-xl text-white cursor-pointer hover:bg-red-500 px-6" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>LogOut</button>
        <button onClick={handleClick} className="block xl:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
</svg>
</button>
      </div>
      {/* side nav start from here */} 
      
      <nav className="fixed left-0 xl:block hidden p-4 w-80 border-gray-300 border-r top-0 h-full bg-white">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <br /> 
       
        <Link   to='/admin'><div className="text-md text-gray-600 flex px-4 bg-gray-200 p-3 gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg><p>Orders</p></div></Link>
<Link to='/admin/product-list'><div className="text-md text-gray-600 mt-4 flex px-4 bg-gray-200 p-3 gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg><p>Products</p>
</div></Link>
<Link to='/admin/add-product'><div className="text-md text-gray-600 mt-4 flex px-4 bg-gray-200 p-3 gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg> <p>Add Product</p>
</div></Link>
<Link to='/admin/hot-deal'><div className="text-md text-gray-600 mt-4 flex px-4 bg-gray-200 p-3 gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg> <p>Add Hot deal</p>
</div></Link>
<Link to='/admin/special-offer'><div className="text-md text-gray-600 mt-4 flex px-4 bg-gray-200 p-3 gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
</svg>
<p>Special Offer Slider</p>
</div></Link>
      </nav>
      <div className="flex">
        <div className="xl:w-[25%] xl:block hidden"></div>
        <div className="xl:w-[70%] w-full">
         <Routes>
         <Route path="/"  element={<AdminOrders/>}/>
      <Route path="add-product" element={<ProductForm />}/>
      

       
     <Route path="product-list" element={products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ProductList/>
      )}/>
      <Route path="hot-deal" element={<HotDealManager/>}/>
       <Route path="special-offer" element={<SpecialOfferManager/>} />
              </Routes>
       </div>
       </div> 
       

    </div>
  );
}
 