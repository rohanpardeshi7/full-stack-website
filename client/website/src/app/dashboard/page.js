"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userslice";

import Breadcrumb from "../common/BreadCrumb";
import Order from "./components/Order";
import Adddress from "./components/Adddress";
import Myprofile from "./components/Myprofile";
import ChangePassword from "./components/ChangePassword";
import CartPage from "../cart/page";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "My Dashboard" },
    { id: "orders", label: "Orders" },
    { id: "addresses", label: "Addresses" },
    { id: "profile", label: "My Profile" },
    { id: "cart", label: "My Cart" },
    { id: "password", label: "Change Password" },
    { id: "logout", label: "Logout" },
  ];

  return (
    <div className="w-full bg-white py-12 px-4 md:px-8">
      {/* Width ko max-w-[1120px] se badha kar max-w-[1360px] kar diya hai */}
      <div className="max-w-[1360px] mx-auto w-full">

        {/* Breadcrumb Section */}
        <div className="text-center mb-10">
          <Breadcrumb
            title="My Dashboard"
            links={[{ label: "My Dashboard" }]}
          />
        </div>

        {/* Main Dashboard Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">

          {/* LEFT SIDEBAR: Width 22% ki hai taaki Right side ko aur space mile */}
          <aside className="w-full lg:w-[22%] flex flex-col gap-2 flex-shrink-0">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left font-bold text-xs uppercase tracking-wider py-3.5 px-4 transition-colors rounded-sm focus:outline-none cursor-pointer ${
                  activeTab === item.id
                    ? "bg-[#c09578] text-white"
                    : "bg-[#1c1c1c] text-white hover:bg-[#c09578]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </aside>

          {/* RIGHT CONTENT AREA: Width badha kar 78% ki hai */}
          <main className="w-full lg:w-[78%] bg-white p-4 lg:p-8 rounded-sm min-h-[350px] border border-gray-100 shadow-sm">

            {/* 1. MY DASHBOARD */}
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

            {/* 2. ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <Order />
              </div>
            )}

            {/* 3. MY CART */}
            {activeTab === "cart" && (
              <div className="space-y-4">
                <CartPage />
              </div>
            )}

            {/* 4. ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="space-y-4">
                <Adddress />
              </div>
            )}

            {/* 5. MY PROFILE */}
            {activeTab === "profile" && (
              <div className="space-y-4">
                <Myprofile />
              </div>
            )}

            {/* 6. CHANGE PASSWORD */}
            {activeTab === "password" && (
              <div className="space-y-4">
                <ChangePassword />
              </div>
            )}

            {/* 7. LOGOUT */}
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