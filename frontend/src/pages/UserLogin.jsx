import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/API";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/UserAuth/login`, { email, password });
      localStorage.setItem("usertoken", res.data.token);
  
      navigate("/profile");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
    <form onSubmit={handleSubmit} className="max-w-md border border-gray-300 my-32 mx-auto p-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 w-full p-2 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border w-full border-gray-300 p-2 mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white w-full p-2">Login</button>
      <Link to='/userregister'><p className="mt-2 underline text-gray-600">Sign Up</p></Link>
    </form>

    <Footer />
  </div>
  )
};

export default UserLogin;
