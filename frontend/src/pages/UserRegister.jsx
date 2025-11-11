import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/API";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const UserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/UserAuth/register`, form);
      localStorage.setItem("usertoken", res.data.token);
      localStorage.setItem('email', form.email);
      navigate("/user-otp");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <Navbar />
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border  border-gray-300"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border  border-gray-300"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2   hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p
          className="mt-3 text-sm text-center text-blue-600 cursor-pointer"
          onClick={() => navigate("/userlogin")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
    <Footer />
    </div>
  );
};

export default UserRegister;
