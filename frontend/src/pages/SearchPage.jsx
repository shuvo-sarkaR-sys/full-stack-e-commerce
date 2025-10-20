import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const SearchPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
          setProducts(res.data);
        } catch (error) {
          console.error("Search error:", error);
        }
      };
      fetchData();
    }
  }, [query]);

  return (
    <div>
        <Navbar />
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Search Results for: <span className="text-blue-600">{query}</span>
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-2 rounded shadow hover:shadow-lg">
              <img src={p.images?.[0]?.url || "/placeholder.jpg"} alt={p.name} className="w-full h-40 object-cover" />
              <h2 className="mt-2 font-semibold">{p.name}</h2>
              <p>${p.offerPrice}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div></div>
  );
};

export default SearchPage;
