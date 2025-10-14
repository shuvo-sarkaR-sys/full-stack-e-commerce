import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${slug}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [slug]);
const handleAddToCart = (productId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login to add products to cart.");
    navigate("/login");
    return;
  }

  // proceed to add cart API call
};

  if (!product) return <p className="p-4">Loading product...</p>;

  return (
    <div>
      <Navbar/>
    <div className="max-w-4xl mx-auto p-4">
      <img
        src={product.images[0]?.url}
        alt={product.name}
        className="w-full h-80 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">Regular price: ${product.previousPrice}</p>
      <p className="text-red-500 font-bold">Offer price: ${product.offerPrice}</p>
      <p className="mt-4">{product.description}</p>
      <button onClick={() => handleAddToCart(product._id)} className="bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
    </div>
    </div>
  );
};

export default ProductDetails;
