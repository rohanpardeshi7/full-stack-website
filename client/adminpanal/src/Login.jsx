import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // 1. Axios import kiya

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Form submit function ko async banaya
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // 2. Backend API ko data bheja
      const response = await axios.post("http://localhost:8000/admin/login", {
        email: email,
        password: password,
      });

      // 3. Backend ka response check kiya
      if (response.data.status === 1) {
        // Token aur data ko localStorage me save kiya
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));

        setError("");
        // Home ya Dashboard page par bhej diya
        navigate("/home");
      } else {
        // Agar backend bole ki password/email galat hai
        setError(response.data.message);
      }
    } catch (err) {
      // Agar backend server band ho ya network error aaye
      setError("Server connect nahi ho pa raha hai!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg"
            alt="WsCube Tech Logo"
            className="img"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error aane par laal rang me dikhega */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}