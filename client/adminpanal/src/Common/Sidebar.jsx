import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icons } from "./SidebarIcons";

export default function Sidebar() {
  const [rotatedItem, setRotatedItem] = useState(null);

  const handleClick = (id) => {
    setRotatedItem(rotatedItem === id ? null : id);
  };

  return (
    <div className="sidebar bg-gray-800 text-white p-4 h-screen overflow-y-auto">
      <div className="mb-[30px]">
        
        <img
          src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg"
          alt="Logo"
        />
      </div>

      {Icons.map((icon) => (
        <div key={icon.id}>
          {/* If it has dropdown, handle toggle; otherwise, use Link */}
          {icon.dropdown ? (
            <div
              className="flex items-center justify-between mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
              onClick={() => handleClick(icon.id)}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{icon.icon}</span>
                <span>{icon.label}</span>
              </div>
              {icon.arrow && (
                <div
                  className={`transition-transform duration-300 ${
                    rotatedItem === icon.id ? "rotate-180" : ""
                  }`}
                >
                  {icon.arrow}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={icon.path} // 👈 Dashboard and others with no dropdown
              className="flex items-center gap-2 mb-2 p-2 rounded hover:bg-gray-700"
            >
              <span className="text-xl">{icon.icon}</span>
              <span>{icon.label}</span>
            </Link>
          )}

          {/* Dropdown menu items */}
          {rotatedItem === icon.id && icon.dropdown && (
            <div className="ml-8 mb-2">
              {icon.dropdown.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className="block py-1 px-2 rounded hover:bg-gray-700"
                >
                  <div className="flex gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
