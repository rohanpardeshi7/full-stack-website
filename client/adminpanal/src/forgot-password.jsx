import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccessMsg("");
  setLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:8000/admin/forgot-password",
      { email }
    );

    if (res.data.status === 1) {
      setSuccessMsg(res.data.message || "OTP sent successfully!");

      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    } else {
      setError(res.data.message);
    }
  } catch (err) {
    // Backend se aaya hua exact message extract karo
    const backendMessage =
      err.response?.data?.message || "Server connection failed!";
    setError(backendMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
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
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your registered email and we'll send you an OTP to reset your
          password.
        </p>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* Success Notification */}
        {successMsg && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 p-2.5 rounded-lg text-center font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:bg-blue-400 cursor-pointer"
          >
            {loading ? "Sending..." : "Send OTP"}
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