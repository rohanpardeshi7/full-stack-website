"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userslice"; // Path match kar lena apne redux slice se

import Breadcrumb from "../common/BreadCrumb";
import Order from "./components/Order";
import Adddress from "./components/Adddress";
import Myprofile from "./components/Myprofile";
import ChangePassword from "./components/ChangePassword";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 1. Redux store clear karein (jisse Header instantly update ho jaye)
    dispatch(logout());

    // 2. Storage clear karein
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 3. Login page par navigate karein
    router.push("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "My Dashboard" },
    { id: "orders", label: "Orders" },
    { id: "addresses", label: "Addresses" },
    { id: "profile", label: "My Profile" },
    { id: "password", label: "Change Password" },
    { id: "logout", label: "Logout" },
  ];

  return (
    <div className="w-full bg-white py-12 px-4 md:px-6">
      <div className="max-w-[1120px] mx-auto">

        {/* Breadcrumb Section */}
        <div className="text-center mb-10">
          <Breadcrumb
            title="My Dashboard"
            links={[{ label: "My Dashboard" }]}
          />
        </div>

        {/* Main Dashboard Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT SIDEBAR: 25% Width Navigation Buttons */}
          <aside className="w-full lg:w-[25%] flex flex-col gap-2 flex-shrink-0">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left font-bold text-xs uppercase tracking-wider py-3.5 px-4 transition-colors rounded-sm focus:outline-none ${
                  activeTab === item.id
                    ? "bg-[#c09578] text-white"
                    : "bg-[#1c1c1c] text-white hover:bg-[#c09578]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </aside>

          {/* RIGHT CONTENT AREA: 75% Width Dynamic Component Container */}
          <main className="w-full lg:w-[75%] bg-white p-2 lg:p-6 rounded-sm min-h-[300px]">

            {/* 1. MY DASHBOARD CONTENT */}
            {activeTab === "dashboard" && (
              <div className="space-y-4">
                <h2 className="text-xl font-serif font-bold text-gray-900">My Dashboard</h2>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  From your account dashboard, you can easily check & view your{" "}
                  <span className="font-bold text-gray-900">recent orders</span>, manage your{" "}
                  <span className="font-bold text-gray-900">shipping and billing addresses</span> and{" "}
                  <span className="font-bold text-gray-900">Edit your password and account details</span>.
                </p>
              </div>
            )}

            {/* 2. ORDERS CONTENT */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <Order />
              </div>
            )}

            {/* 3. ADDRESSES CONTENT */}
            {activeTab === "addresses" && (
              <div className="space-y-4">
                <Adddress />
              </div>
            )}

            {/* 4. MY PROFILE CONTENT */}
            {activeTab === "profile" && (
              <div className="space-y-4">
                <Myprofile />
              </div>
            )}

            {/* 5. CHANGE PASSWORD CONTENT */}
            {activeTab === "password" && (
              <div className="space-y-4">
                <ChangePassword />
              </div>
            )}

            {/* 6. LOGOUT CONTENT */}
            {activeTab === "logout" && (
              <div className="space-y-4">
                <h2 className="text-xl font-serif font-bold text-gray-900">Logout</h2>
                <p className="text-sm text-gray-500">
                  Are you sure you want to log out of your account?
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-red-600 text-white font-bold text-xs uppercase px-6 py-2.5 rounded-sm hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    Confirm Logout
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className="bg-gray-100 text-gray-700 font-bold text-xs uppercase px-6 py-2.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}