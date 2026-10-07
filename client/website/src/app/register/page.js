"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [otp, setOtp] = useState("");

  let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL || "http://localhost:8000/api/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    axios.post(`${apibaseurl}auth/register`, formData)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status === 1 || finalRes.status === true) {
          toast.success(finalRes.message || "Registration Successful!");
          setStep(2); // Step 2 (OTP) par move karein
        } else {
          toast.error(finalRes.message || "Something went wrong!");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Server error occurred");
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    toast.success("OTP Verified Successfully!");
    // Yahan redirect ya further action le sakte hain
  };

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* 💡 Toast container notification display karne ke liye */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-sm shadow-sm space-y-6">
        {step === 1 ? (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">Registration</h2>
              <p className="text-xs text-gray-400 mt-2">Create your account to start shopping.</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Password</label>
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

              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-[#c09578] text-white font-bold text-xs uppercase py-3 rounded-sm transition-colors tracking-wide mt-2 cursor-pointer"
              >
                Register
              </button>
            </form>

            <div className="text-center text-xs text-gray-500 font-medium border-t border-gray-100 pt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-[#c09578] font-bold hover:underline">
                Login here
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">Verify OTP</h2>
              <p className="text-xs text-gray-400 mt-2">
                We've sent a 6-digit code to <span className="text-gray-900 font-semibold">{formData.email}</span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 text-center">
                  Enter OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="XXXXXX"
                  className="w-full text-center tracking-[1em] text-lg font-bold px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3 rounded-sm transition-colors tracking-wide mt-2 cursor-pointer"
              >
                Verify & Register
              </button>
            </form>

            <div className="flex justify-between items-center text-xs font-semibold pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-500 hover:underline cursor-pointer"
              >
                ← Edit Details
              </button>
              <button
                type="button"
                onClick={handleRegisterSubmit}
                className="text-[#c09578] hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}