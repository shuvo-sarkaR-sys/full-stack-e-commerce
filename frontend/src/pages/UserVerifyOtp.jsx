import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/API";
import { useNavigate } from "react-router-dom";
export default function UserVerifyOtp() {
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/UserAuth/verify-otp`, { email, otp });
      alert(res.data.message);
      localStorage.removeItem("email");
      navigate('/userlogin')
    } catch (err) {
      alert(err.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div className="form-container">
      <h2>Verify Email</h2>
      <p>OTP sent to: {email}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
