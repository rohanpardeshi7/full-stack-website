import React from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { ImProfile } from "react-icons/im";
import { FaUser, FaBuilding, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      {/* Menu and Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-gray-600"
        >
          <HiOutlineBars3 />
        </button>
        <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
      </div>

      {/* Profile Dropdown */}
      <div className="relative group">
        <ImProfile className="text-2xl text-gray-600 cursor-pointer" />

        {/* Dropdown */}
        <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md p-4 text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition">
            <FaUser className="text-blue-600" />
            <Link to={"/profile"}> <span>Profile</span></Link>
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition">
            <FaBuilding className="text-green-600" />
           <Link to={"/company-profile"}> <span>Company Profile</span></Link>
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition">
            <FaSignOutAlt className="text-red-600" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
