import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function BrandList() {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                const unique = [...new Set(res.data.map((p) => p.brand))].filter(Boolean);
                setBrands(unique);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBrands();
    }, []);

    const handleBrandClick = (brand) => {
        navigate(`/brand/${encodeURIComponent(brand)}`);
    };

    return (
        <>
            <Navbar />
            <h2 className="text-xl font-semibold text-center m-4">Brands</h2>

            <div className="flex gap-4 flex-wrap p-4">
                {brands.map((b) => (
                    <button
                        key={b}
                        onClick={() => handleBrandClick(b)}
                        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        {b}
                    </button>
                ))}
            </div>
        </>
    );
}
