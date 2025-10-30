// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// export default function CheckoutPage() {
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState('');
//   const [form, setForm] = useState({ email: "", phone: "", address: "" });
   

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem("usertoken");
//       const res = await axios.get("http://localhost:5000/api/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart(res.data.items);
//     //   const total = res.data.items.reduce(
//     //     (sum, i) => sum + i.product.price * i.quantity,
//     //     0
//     //   );

//        const totalPrice = (res.data.items ?? []).reduce((sum, item) => {
//         const price = item.product.offerPrice || item.product.price;

//       const discountedPrice = item.product.discount
//     ? price - (price * item.product.discount) / 100
//     : price;
//      return sum + discountedPrice * item.quantity;
//   }, 0);



//       setTotal(totalPrice);
//     } catch (err) {
//       console.error("Error loading cart:", err);
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");
//       const res = await axios.post(
//         "http://localhost:5000/api/checkout/create",
//         { userId, ...form },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.url) {
//         window.location.href = res.data.url; // redirect to SSLCommerz gateway
//       }
//     } catch (err) {
//       console.error("Checkout error:", err);
//     }
//   };

//   return (
//     <div>
//         <Navbar />
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//       {/* Cart Details */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         {cart.map((item, i) => {
//              const price = item.product.offerPrice || item.product.price;
//             const discountedPrice = item.product.discount
//     ? price - (price * item.product.discount) / 100
//     : price;
//             return(
//           <div key={i} className="flex justify-between border-b py-2">
//             <span>{item.product.name} × {item.quantity}</span>
//             <span>৳{discountedPrice * item.quantity}</span>
//           </div>
//         )})}
//         <div className="flex justify-between mt-4 font-bold text-lg">
//           <span>Total:</span>
//           <span>৳{total}</span>
//         </div>
//       </div>

//       {/* Customer Info */}
//       <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-3">
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 w-full"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input type="text" placeholder="Name" className="border p-2 w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//         <input
//           type="text"
//           placeholder="Phone"
//           className="border p-2 w-full"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//         />
//         <textarea
//           placeholder="Address"
//           className="border p-2 w-full"
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//         />
//         <div>
//         <button
//           onClick={handleCheckout}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//         >
//           Proceed to Payment
//         </button>
//         <button>Cash On Delivery</button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({ email: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("Online");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items);
      const total = res.data.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      );
      setTotal(total);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const res = await axios.post(
        "http://localhost:5000/api/checkout/create",
        { userId, ...form, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (paymentMethod === "Online" && res.data.url) {
        window.location.href = res.data.url; // Redirect to SSLCommerz
      } else {
        alert("✅ Order placed successfully with Cash on Delivery!");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Cart Items */}
      <div className="bg-white p-4 rounded-lg shadow">
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{item.product.name} × {item.quantity}</span>
            <span>৳{item.product.price * item.quantity}</span>
          </div>
        ))}
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

        {/* Payment Option */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Pay Online (SSLCommerz)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {paymentMethod === "COD"
            ? "Place Order (Cash on Delivery)"
            : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
