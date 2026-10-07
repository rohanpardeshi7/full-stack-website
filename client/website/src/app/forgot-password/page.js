"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL || "http://localhost:8000/api/";

  const handleSendLink = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${apibaseurl}auth/forgot-password`, { email })
      .then((res) => res.data)
      .then((finalRes) => {
        setLoading(false);
        if (finalRes.status === 1) {
          toast.success(finalRes.message || "Reset link sent!");
          setMailSent(true);
        } else {
          toast.error(finalRes.message || "Email not found!");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data?.message || "Something went wrong!");
      });
  };

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded shadow-sm space-y-6">
        <ToastContainer position="top-center" autoClose={3000} />

        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Forgot Password</h2>
          <p className="text-xs text-gray-400 mt-2">
            {mailSent
              ? "Check your email for the reset link."
              : "Enter your registered email to receive a password reset link."}
          </p>
        </div>

        {mailSent ? (
          <div className="space-y-4 text-center">
            <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded">
              A password reset link has been sent to <strong>{email}</strong>.
              Please check your inbox or spam folder.
            </div>

            <button
              type="button"
              onClick={() => setMailSent(false)}
              className="text-xs text-[#c09578] font-semibold hover:underline"
            >
              Didn't receive email? Try again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendLink} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-[#c09578] disabled:bg-gray-400 text-white font-bold text-xs uppercase py-3 rounded transition-colors tracking-wide"
            >
              {loading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="text-center text-xs text-gray-500 border-t pt-4">
          Remember your password?{" "}
          <Link href="/login" className="text-[#c09578] font-bold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}