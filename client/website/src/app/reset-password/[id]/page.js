  "use client";
  import React, { useState, useEffect, use } from "react";
  import { useRouter } from "next/navigation";
  import Link from "next/link";
  import axios from "axios";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

  export default function ResetPasswordPage({ params }) {
    const resolvedParams = typeof params.then === "function" ? use(params) : params;
    const token = resolvedParams?.id;

    const router = useRouter();
    const [isValid, setIsValid] = useState(null); // null = checking, true = valid, false = expired/used
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL || "http://localhost:8000/api/";

    // Check token on mount
    useEffect(() => {
      if (!token) {
        setIsValid(false);
        return;
      }

      axios
        .get(`${apibaseurl}auth/verify-reset-token/${token}`)
        .then((res) => {
          if (res.data.status === 1) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        })
        .catch(() => setIsValid(false));
    }, [token, apibaseurl]);

    const handleResetPassword = (e) => {
      e.preventDefault();

      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      setLoading(true);

      axios
        .post(`${apibaseurl}auth/reset-password/${token}`, {
          password: newPassword,
        })
        .then((res) => {
          setLoading(false);
          if (res.data.status === 1) {
            toast.success(res.data.message);
            setIsValid(false); // Invalidate view immediately
            setTimeout(() => router.push("/login"), 1500);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error("Something went wrong!");
        });
    };

    // State 1: Verification in progress
    if (isValid === null) {
      return (
        <div className="w-full min-h-[75vh] flex items-center justify-center">
          <p className="text-gray-600 text-sm font-semibold">Verifying link validity...</p>
        </div>
      );
    }

    // State 2: Link is expired or already used
    if (isValid === false) {
      return (
        <div className="w-full min-h-[75vh] flex items-center justify-center bg-gray-50 py-12 px-4">
          <div className="max-w-md w-full bg-white p-8 border border-red-200 rounded shadow-sm text-center space-y-4">
            <h2 className="text-xl font-bold text-red-600">Link Expired or Already Used</h2>
            <p className="text-xs text-gray-500">
              This reset link is either invalid, expired, or has already been used.
            </p>
            <div className="pt-2">
              <Link
                href="/forgot-password"
                className="inline-block bg-gray-900 text-white text-xs uppercase px-4 py-2.5 rounded font-bold hover:bg-[#c09578] transition-colors"
              >
                Request New Link
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // State 3: Token is valid, show form
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded shadow-sm space-y-6">
          <ToastContainer position="top-center" autoClose={2000} />

          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold text-gray-900">Set New Password</h2>
            <p className="text-xs text-gray-400 mt-2">Enter your new password below.</p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full text-sm px-4 py-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-sm px-4 py-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-[#c09578] disabled:bg-gray-400 text-white font-bold text-xs uppercase py-3 rounded transition-colors"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    );
  }