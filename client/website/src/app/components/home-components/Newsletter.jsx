"use client";
import React from "react";

/**
 * Newsletter Component - Centered email subscription section
 * Tailored exactly to match the border radius and input layout of the screenshot
 */
export default function Newsletter() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Static design placeholder for future API Integration
  };

  return (
    <section className="w-full bg-[#fbfbfb] py-20 text-center">
      <div className="max-w-[1120px] mx-auto px-6 flex flex-col items-center">
        
        {/* Main Serif Heading */}
        <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-wide mb-3">
          Our Newsletter
        </h2>

        {/* Subtitle Description */}
        <p className="text-sm text-gray-500 font-medium mb-8 max-w-md">
          Get E-mail updates about our latest shop and special offers.
        </p>

        {/* Subscription Form Bar */}
        <form 
          onSubmit={handleSubscribe}
          className="w-full max-w-[650px] flex items-center bg-white border border-gray-200 rounded-[4px] overflow-hidden shadow-sm"
        >
          {/* Email Input Field */}
          <input
            type="email"
            placeholder="Email address..."
            required
            className="flex-grow px-5 py-3.5 text-sm text-gray-700 bg-[#fbfbfb] placeholder-gray-400 focus:outline-none"
          />
          
          {/* Subscribe Action Button */}
          <button
            type="submit"
            className="bg-[#c09578] hover:bg-[#2d2a26] text-white text-sm font-bold px-8 py-3.5 transition-colors duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
}