import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
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
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword, newEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Email & Password updated successfully ✅");
        localStorage.removeItem("resetEmail");
        setTimeout(() => navigate("/login"), 1500);
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Reset Email & Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter new email (optional)"
          className="border p-2 rounded"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Email & Password"}
        </button>
      </form>
      {msg && <p className="mt-4 text-center">{msg}</p>}
    </div>
  );
}
