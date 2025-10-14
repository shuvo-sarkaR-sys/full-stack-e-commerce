import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const unique = [...new Set(res.data.map((p) => p.category))].filter(Boolean);
        setCategories(unique);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <>   
    <Navbar/>
      <h2 className="text-xl font-semibold text-center m-4">Categories</h2>
   
    <div className="flex gap-4 flex-wrap p-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          {cat}
        </button>
      ))}
    </div>
     </> 
  );
}
