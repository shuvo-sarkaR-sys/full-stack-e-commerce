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
    <div  className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 ">
            <th className="py-2">User</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b  border-gray-300 text-center">
              <td className="py-3">{order.email}</td>
              <td>৳{order.totalAmount}</td>
              <td>{order.paymentMethod.toUpperCase()}</td>
             <td 
            
 
>
 <p className={` w-fit px-3 py-1 font-semibold m-auto text-white text-sm  rounded 
    ${
      order.status === "pending"
        ? "bg-yellow-500"
        : order.status === "processing"
        ? "bg-blue-500"
        : order.status === "shipped"
        ? "bg-purple-500"
        : order.status === "delivered"
        ? "bg-green-600"
        : order.status === "cancelled"
        ? "bg-red-600"
        : "bg-gray-400"
    }
  `}> {order.status}</p>
</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border border-gray-300 p-1 rounded"
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
