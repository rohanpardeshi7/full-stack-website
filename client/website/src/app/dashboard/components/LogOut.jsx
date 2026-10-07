import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Clear stored auth data
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    // agar sessionStorage me rakha ho toh:
    // sessionStorage.clear();

    // 2. Redirect to Login page
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-600 font-medium">Logging out...</p>
    </div>
  );
}