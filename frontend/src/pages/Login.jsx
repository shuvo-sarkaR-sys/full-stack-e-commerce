import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api/API";
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("token", data.token);
     
      window.location.href = "/admin";  // redirect to admin dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="max-w-md border p-5 border-gray-300 my-20 rounded-xl mx-auto p-4">
      <h2 className="text-2xl mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}  >
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-200 p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-200 p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
        <Link to='/forgot-password'><button className="mt-2 cursor-pointer underline text-gray-600">Reset Password</button></Link>
      </form>
    </div>
    <Footer/>
    </div>
  );
}
