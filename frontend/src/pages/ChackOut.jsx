import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../api/API";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState('');
  const [form, setForm] = useState({ email: "", name: "", phone: "", address: "" });
   

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("usertoken");
      const res = await axios.get(`${API_BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items);
    //   const total = res.data.items.reduce(
    //     (sum, i) => sum + i.product.price * i.quantity,
    //     0
    //   );

       const totalPrice = (res.data.items ?? []).reduce((sum, item) => {
        const price = item.product.offerPrice || item.product.price;

      const discountedPrice = item.product.discount
    ? price - (price * item.product.discount) / 100
    : price;
     return sum + discountedPrice * item.quantity;
  }, 0);



      setTotal(totalPrice);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("usertoken");
      const userId = localStorage.getItem("userId");
      const res = await axios.post(
        `${API_BASE_URL}/checkout/create`,
        { userId, ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.url) {
        window.location.href = res.data.url; // redirect to SSLCommerz gateway
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

const handleCOD = async () => {
  try {
    const token = localStorage.getItem("usertoken");
    const userId = localStorage.getItem("userId")
    
    const payload = {
      token,
      userId,
      items: cart.map((i) => ({
        product: i.product._id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.offerPrice || i.product.price,
      })),
      totalAmount: total,
      address: form.address,
      phone: form.phone,
      email: form.email,
      name: form.name,
    };

    await axios.post(`${API_BASE_URL}/orders/create-cod`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Your order has been placed with Cash on Delivery!");
     navigate("/profile");
  } catch (err) {
    
    alert("Failed to place COD order");
  }
};


  return (
    <div>
        <Navbar />
    <div className="max-w-3xl my-20 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Cart Details */}
      <div className="bg-white p-4 rounded-lg shadow">
        {cart.map((item, i) => {
             const price = item.product.offerPrice || item.product.price;
            const discountedPrice = item.product.discount
    ? price - (price * item.product.discount) / 100
    : price;
            return(
          <div key={i} className="flex justify-between border-b py-2">
            <span>{item.product.name} × {item.quantity}</span>
            <span>৳{discountedPrice * item.quantity}</span>
          </div>
        )})}
        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total:</span>
          <span>৳{total}</span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input type="text" placeholder="Name" className="border p-2 w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <textarea
          placeholder="Address"
          className="border p-2 w-full"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <div>
       <div className="flex flex-col md:flex-row gap-3 mt-4">
  <button
    onClick={handleCheckout}
    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
  >
    Pay Online
  </button>

  <button
    onClick={handleCOD}
    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
  >
    Cash on Delivery
  </button>
</div>

        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
 
