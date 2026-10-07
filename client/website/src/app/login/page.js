"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userslice";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter()
  let dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL || "http://localhost:8000/api/"; 
  const handleSubmit = (e) => {
  e.preventDefault();
  let obj = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  axios
    .post(`${apibaseurl}auth/login`, obj)
    .then((res) => res.data)
    .then((finalRes) => {
      if (finalRes.status == 1) {
        toast.success(finalRes.message);
        dispatch(setToken({token:finalRes.token}))
            router.push('/dashboard');
      } else {
        toast.error(finalRes.message);
      }
    })
    .catch((err) => {
      toast.error("Something went wrong!");
    });
};

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-sm shadow-sm space-y-6">
        <ToastContainer position="top-center" autoClose={2000} />

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">
            Login
          </h2>
          <p className="text-xs text-gray-400 mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs font-semibold">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="accent-[#c09578] w-3.5 h-3.5" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-[#c09578] hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-[#c09578] text-white font-bold text-xs uppercase py-3 rounded-sm transition-colors tracking-wide mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center text-xs text-gray-500 font-medium border-t border-gray-100 pt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#c09578] font-bold hover:underline">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}