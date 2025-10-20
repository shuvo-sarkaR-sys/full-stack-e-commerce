import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    console.log("User token frontend:", token);
    if (!token) {
      navigate("/userlogin");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("usertoken");
        navigate("/userlogin");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div>
      <Navbar/>
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">👤 User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button
        onClick={() => {
          localStorage.removeItem("usertoken");
          navigate("/userlogin");
        }}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
    </div>
  );
};

export default UserProfile;
