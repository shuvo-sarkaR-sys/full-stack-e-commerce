import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/API";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [openDetails, setOpenDetails] = useState(null);

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
   const handleDetails = (id) => {
    setOpenDetails(openDetails === id ? null : id);
  };
  return (
    <div  className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 ">
            <th className="py-2">Name</th>
            <th>Email</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b  border-gray-300 text-center">
              <td>{order.name}</td>
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
             <td className="relative">
                <button
                  className="cursor-pointer"
                  onClick={() => handleDetails(order._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                  </svg>
                </button>

                {/* 🟩 Details popup */}
                {openDetails === order._id && (
                  <div className="absolute top-8 right-0 bg-white shadow-lg border border-gray-300 rounded p-3 w-60 z-20">
                    <h4 className="font-semibold mb-2">Product Details:</h4>
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="text-sm mb-1">
                        <button onClick={()=>{handleDetails(order._id)}}></button>
                        <p>
                          <strong>{item.product?.name || "Product"}</strong> × {item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
