"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/app/redux/userslice";

export default function ChangePassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL || "http://localhost:8000/web/";
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const token = useSelector((allStore) => allStore.userStore.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match!");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error("New Password cannot be the same as Current Password!");
      return;
    }

    setLoading(true);

    const obj = {
      oldPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    axios
      .post(`${apibaseurl}auth/change-Password`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.status === 1) {
          toast.success("Password changed! Logging out...");

          // 1. Redux store aur cookie se token clear ho jayega
          dispatch(logout());

          // 2. 1.5 second baad direct login page par bhej do
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          toast.error(res.data.message || "Failed to change password");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data?.message || "Something went wrong!");
      });
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="space-y-6">
        <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">
          Change Password
        </h2>

        <div className="border border-gray-200 p-6 rounded-sm bg-white shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                required
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                required
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#c09578] hover:bg-[#b08467] disabled:bg-gray-400 text-white text-xs font-bold uppercase tracking-wider py-3 px-8 rounded-full transition-colors shadow-sm"
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}