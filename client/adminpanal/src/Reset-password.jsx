import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  // Forgot Password page se aaya hua email (agar direct khola ho toh empty string)
  const initialEmail = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: initialEmail,
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // 1. Password Match Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New Password aur Confirm Password match nahi kar rahe!");
      return;
    }

    setLoading(true);

    try {
      // 2. Backend Reset API call
      const res = await axios.post(
        "http://localhost:8000/admin/reset-password",
        {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }
      );

      if (res.data.status === 1) {
        setSuccessMsg(res.data.message || "Password successfully reset ho gaya!");
        
        // 2 second baad Login page par redirect
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Server error! Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg"
            alt="WsCube Tech Logo"
            className="img"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Email par mila OTP aur naya password enter karein.
        </p>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 p-2.5 rounded-lg text-center font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email (Agar Forgot Password se aaya hai toh pre-filled rahega) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter Registered Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              required
              maxLength="6"
              placeholder="Enter 4 or 6 digit OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest text-center font-semibold"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              required
              placeholder="••••••••"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:bg-blue-400 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}