import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/API";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("OTP sent to your email.");
        // Save email temporarily in localStorage for next steps
        localStorage.setItem("resetEmail", email);
        setTimeout(() => navigate("/verify-otp"), 1000);
      } else {
        setMsg(data.message || "Something went wrong");
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
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
      {msg && <p className="mt-4 text-center">{msg}</p>}
    </div>
    <Footer/>
    </div>
  );
}
