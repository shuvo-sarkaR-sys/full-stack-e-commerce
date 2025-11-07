import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/API";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("usertoken");
console.log('userid', userId)
  useEffect(() => {
    if (userId && token) {
      fetchOrders();
    }
  }, [userId, token]);

  // ✅ Fetch all orders for logged-in user
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/orders/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel order (only if pending or processing)
  const cancelOrder = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      await axios.put(`${API_BASE_URL}/orders/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Order cancelled successfully!");
      fetchOrders();
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel the order.");
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading orders...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Order #{order._id.slice(-6)}
              </h3>
              <span
                className={`text-sm font-semibold capitalize ${
                  order.status === "cancelled"
                    ? "text-red-500"
                    : order.status === "delivered"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-700 mt-1">Total: ৳{order.totalAmount}</p>
            <p className="text-gray-700">Payment: {order.paymentMethod?.toUpperCase()}</p>
            <p className="text-gray-700">Address: {order.deliveryAddress}</p>
            <p className="text-gray-700">Phone: {order.phone}</p>

            {/* Show items */}
            <div className="mt-3">
              <h4 className="font-semibold mb-1">Items:</h4>
              <ul className="list-disc ml-6 text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.product?.name || "Product"} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {order.status !== "cancelled" && (
              <button
                onClick={() => cancelOrder(order._id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
