import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api/API";
import Footer from '../components/Footer'
const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false); // ✅ for loading spinner

  const token = localStorage.getItem("usertoken");
  const headers = { Authorization: `Bearer ${token}` };

  // ✅ Reusable fetchCart function
  const fetchCart = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/cart`, { headers })
      .then(res => setCart(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (productId, quantity) => {
    setLoading(true);
    axios
      .put(`${API_BASE_URL}/cart/update`, { productId, quantity }, { headers })
      .then(() => fetchCart()) // ✅ refresh cart after update
      .catch(err => console.error(err));
  };

  const removeItem = (productId) => {
    setLoading(true);
    axios
      .delete(`${API_BASE_URL}/cart/remove/${productId}`, { headers })
      .then(() => fetchCart()) // ✅ refresh after removal
      .catch(err => console.error(err));
  };

  const totalPrice = (cart.items ?? []).reduce((sum, item) => {
        const price = item.product.offerPrice || item.product.price;

      const discountedPrice = item.product.discount
    ? price - (price * item.product.discount) / 100
    : price;
     return sum + discountedPrice * item.quantity;
  }, 0);

  return (
    <div>
      <Navbar />
    <div className="max-w-4xl mx-auto relative p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {loading && (
        <div role="status" className="absolute w-full h-20" >
    <svg aria-hidden="true" className="w-8 h-8 m-auto mt-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
     
</div>
      )}

      {cart.items.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <div>
          {cart.items.map(item => {
            const price = item.product.offerPrice || item.product.price;
            const discountedPrice = item.product.discount
    ? price - (price * item.product.discount) / 100
    : price;
             
            return (
               
              <div
                key={item.product._id}
                className="flex items-center justify-between border-b py-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.product.name}</h2>
                    <p>${discountedPrice}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={loading}
                    onClick={() =>
                      updateQuantity(item.product._id, Math.max(1, item.quantity - 1))
                    }
                    className={`px-2 py-1 border rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => {
                      const q = Math.max(1, Number(e.target.value) || 1);
                      updateQuantity(item.product._id, q);
                    }}
                    disabled={loading}
                    className="w-14 border p-1 text-center rounded"
                  />
                  <button
                    disabled={loading}
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity + 1)
                    }
                    className={`px-2 py-1 border rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    +
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => removeItem(item.product._id)}
                    className={`text-red-500 font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="mt-4 text-right flex gap-5 justify-end items-center font-bold text-lg">
            <p>Total: ${totalPrice.toFixed(2)}</p>
           <Link to="/checkout"><button className="bg-blue-500 text-white px-4 py-2 rounded">Checkout</button></Link>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default Cart;
