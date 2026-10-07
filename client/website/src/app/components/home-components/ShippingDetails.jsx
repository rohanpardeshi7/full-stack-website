"use client";
import React from "react";
import { FiGlobe, FiClock } from "react-icons/fi";
import { BiCheckShield } from "react-icons/bi";

/**
 * FeatureHighlights Component - Minimal 3-column feature section
 * Designed exactly to match the circular outline layout of the screenshot
 */
export default function ShippingDetails() {
  const features = [
    {
      id: 1,
      icon: <FiGlobe size={24} className="text-gray-700" />,
      title: "Free Shipping",
      description: "Free shipping on all order",
    },
    {
      id: 2,
      icon: <BiCheckShield size={26} className="text-gray-700" />,
      title: "Money Return",
      description: "Back guarantee under 7 days",
    },
    {
      id: 3,
      icon: <FiClock size={24} className="text-gray-700" />,
      title: "Online Support",
      description: "Support online 24 hours a day",
    },
  ];

  return (
    <section className="w-full bg-[#fbfbfb] py-16 border-t border-b border-gray-100">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Responsive Grid Layout: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {features.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col items-center text-center space-y-4 group"
            >
              {/* Circular Outline Icon Container */}
              <div className="w-20 h-20 rounded-full border border-gray-400 flex items-center justify-center bg-white shadow-sm transition-colors duration-300 group-hover:border-[#c09578] group-hover:text-[#c09578]">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
              </div>
              
              {/* Text Information Block */}
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-gray-900 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium max-w-[250px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}