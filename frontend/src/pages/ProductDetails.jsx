import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
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

  const handleAddToCart = async (productId) => {
     

    try {
      const token = localStorage.getItem("usertoken");
      console.log("Using token:", token);
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Something went wrong.");
    }
  };

  if (!product) return <p className="p-4">Loading product...</p>;

  const price = product.offerPrice || product.previousPrice || 0;
  const discountedPrice = product.discount
    ? price - (price * product.discount) / 100
    : price;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <img
          src={product.images?.[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-80 object-cover rounded"
        />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-gray-600 mt-2 line-through">
          Regular Price: ${price}
        </p>
        <p className="text-red-500 font-bold">
          Offer Price: ${discountedPrice.toFixed(2)}
        </p>
        <p className="mt-4">{product.description}</p>
        <button
          onClick={() => handleAddToCart(product._id)}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
