"use client";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-[75vh] bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Large Styled Error Code */}
        <h1 className="text-7xl md:text-9xl font-serif font-bold text-[#2d2a26] tracking-wider animate-bounce">
          404
        </h1>

        {/* Content Section */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-black">
            Oops! Page Not Found
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to comfort.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block bg-[#2d2a26] text-white px-8 py-3 font-semibold text-sm tracking-wider uppercase hover:bg-[#c09578] transition-colors duration-300 rounded-md shadow-md"
          >
            Back To Home
          </Link>
        </div>

      </div>
    </div>
  );
}