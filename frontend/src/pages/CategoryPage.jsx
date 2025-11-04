// CategoryPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api/API";
export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFiltered = async () => {
      const res = await axios.get(`${API_BASE_URL}/products?category=${category}`);
      setProducts(res.data);
    };
    fetchFiltered();
  }, [category]);

  return (
    <div >
    <Navbar />
    <div className="p-10">
      <h2 className="text-xl font-semibold mb-4">{category} Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {products.map((p) => (
            <div key={p._id} className="border border-gray-200 p-2 rounded">
              <img src={p.images[0]?.url} alt={p.name} className="w-full h-72   mb-2" />
              <h3 className="font-medium">{p.name}</h3>
              <div className="flex  text-sm justify-between">
              <p className="text-gray-600 line-through">Regular price: ${p.previousPrice}</p>
              <p className="text-[#425A8B] font-bold">Offer price: ${p.offerPrice}</p>
                  </div>

            <Link to={`/product/${p.slug}`}><button className="bg-orange-500 w-full hover:bg-[#425A8B] mt-2 cursor-pointer text-white py-2 px-2 rounded">Buy Now</button></Link>

            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
