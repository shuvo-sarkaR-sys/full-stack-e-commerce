import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        // Group by category with image
        const unique = [];
        const map = new Map();

        res.data.forEach((p) => {
          if (p.category && !map.has(p.category)) {
            map.set(p.category, {
              name: p.category,
              image: p.categoryImage?.[0]?.url || "", // ✅ FIXED HERE
            });
          }
        });

        unique.push(...map.values());
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
    <div className="ml-16">
      <h2 className="text-2xl text-[#425A8B] font-bold m-4">Categories</h2>
      <p className="ml-4 text-[#425A8B] -mt-4">
        Choose your necessary products from this feature categories.
      </p>

      <div className="flex gap-4 mt-5 flex-wrap p-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className="flex flex-col items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
          >
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-24 h-24 object-cover rounded-lg mb-2"
              />
            )}
            <span className="text-gray-800 font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
