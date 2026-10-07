"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center space-y-4">
        {/* Modern Animated Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#c09578] rounded-full animate-spin"></div>
        
        {/* Elegant Pulsing Text for Furniture Theme */}
        <div className="text-center">
          <h2 className="text-lg font-serif font-medium text-gray-800 tracking-wide animate-pulse">
            Loading Premium Furniture...
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Please wait while we set up your space.
          </p>
        </div>
      </div>
    </div>
  );
}