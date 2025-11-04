import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/API";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("usertoken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(`${API_BASE_URL}/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const cancelOrder = async (id) => {
    if (window.confirm("Cancel this order?")) {
      await axios.put(`${API_BASE_URL}/orders/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Order #{order._id.slice(-6)}</h3>
            <span className={`text-sm font-semibold capitalize ${order.status === 'cancelled' ? 'text-red-500' : 'text-blue-600'}`}>
              {order.status}
            </span>
          </div>
          <p className="text-gray-600">Total: ৳{order.totalAmount}</p>
          <p className="text-gray-600">Payment: {order.paymentMethod.toUpperCase()}</p>
          <p className="text-gray-600">Address: {order.deliveryAddress}</p>

          {order.status !== "cancelled" && (
            <button
              onClick={() => cancelOrder(order._id)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
