import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/API";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  if (!email) {
    navigate("/forgot-password");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("OTP verified ✅");
        setTimeout(() => navigate("/reset-password"), 1000);
      } else {
        setMsg(data.message || "Invalid OTP");
      }
    } catch (err) {
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="border p-2 rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      {msg && <p className="mt-4 text-center">{msg}</p>}
    </div>
    <Footer />
    </div>
  );
}

