import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/API";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(`${API_BASE_URL}/orders`);
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API_BASE_URL}/orders/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>User</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b text-center">
              <td>{order.email}</td>
              <td>৳{order.totalAmount}</td>
              <td>{order.paymentMethod.toUpperCase()}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option>pending</option>
                  <option>processing</option>
                  <option>shipped</option>
                  <option>delivered</option>
                  <option>cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
