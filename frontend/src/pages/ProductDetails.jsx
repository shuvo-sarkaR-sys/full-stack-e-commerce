import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../api/API";
import Footer from "../components/Footer";
const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [login, setIsLogin] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // 👈 For changing main image
  const [selectedColor, setSelectedColor] = useState(""); // 👈 For color variety

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    setIsLogin(!!token);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products/${slug}`);
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0]?.url || ""); // Default main image
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("usertoken");
      await axios.post(
        `${API_BASE_URL}/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
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

  // Example color options — can come from backend
  const colorOptions = product.colors || ["white", "goldenrod", "green", "black"];

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8">
        {/* === LEFT: IMAGE SECTION === */}
        <div>
          {/* Main Image */}
          <img
            src={selectedImage || "/placeholder.jpg"}
            alt={product.name}
            className="w-auto h-96 object-cover"
          />

          {/* Thumbnails */}
          <div className="flex mt-4 gap-3 overflow-x-auto">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`thumb-${i}`}
                onClick={() => setSelectedImage(img.url)} // 👈 Change main image
                className={`w-20 h-20 object-cover border-2 rounded cursor-pointer transition
                ${selectedImage === img.url ? "border-blue-500" : "border-gray-200"}`}
              />
            ))}
          </div>
        </div>

        {/* === RIGHT: PRODUCT INFO === */}
        <div>
          <h1 className="text-5xl text-[#425A8B] font-bold">{product.name}</h1>

          
          <p className="text-lg mt-5 font-bold text-green-600">
            Offer Price: ${discountedPrice.toFixed(2)}
          </p>
<p className="text-gray-500  line-through">
            Regular Price: ${price}
          </p>
          {/* === COLOR VARIETIES === */}
          <div className="mt-5">
            <p className="font-semibold mb-2">Available Colors:</p>
            <div className="flex gap-3">
              {colorOptions.map((color, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 
                    ${selectedColor === color ? "border-black scale-110" : "border-gray-300"} 
                  `}
                  style={{ backgroundColor: color }}
                  title={color}
                ></div>
              ))}
            </div>
            {selectedColor && (
              <p className="mt-2 text-sm text-gray-600">
                Selected color: <span className="font-semibold">{selectedColor}</span>
              </p>
            )}
          </div>

          {/* === BUTTONS === */}
          {login ? (
            <button
              onClick={() => handleAddToCart(product._id)}
              className="bg-orange-500 text-white py-2 px-6 rounded mt-6 hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          ) : (
            <button
              onClick={() => navigate("/userlogin")}
              className="bg-orange-500 text-white py-2 px-6 rounded mt-6 hover:bg-blue-600 transition"
            >
              Login to Add to Cart
            </button>
          )}

         
        </div>
      </div>
       {/* === DESCRIPTION === */}
{product && product.description ? (
  <div
    dangerouslySetInnerHTML={{ __html: product.description }}
    className="mt-6 max-w-5xl mx-auto prose prose-lg    text-gray-700"
  />
) : (
  <p className="text-center text-gray-500">Loading description...</p>
)}   
<Footer/>
 </div>
  );
};

export default ProductDetails;
