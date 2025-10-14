// CategoryPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFiltered = async () => {
      const res = await axios.get(`http://localhost:5000/api/products?category=${category}`);
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-2 rounded">
              <img src={p.images[0]?.url} alt={p.name} className="w-full h-40 object-cover mb-2" />
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-gray-600 line-through">Regular price: ${p.previousPrice}</p>
              <p className="text-red-500 font-bold">Offer price: ${p.offerPrice}</p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
