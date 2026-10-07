"use client";
import React from "react";
import Link from "next/link";

/**
 * Hero2 Component - Full width promotional section with text zoom on hover
 * Tailored exactly to match "Screenshot 2026-06-16 at 22-11-51 Online Furniture in India.jpg"
 */
export default function Hero2() {
  return (
    <section 
      className="w-full h-[500px] bg-cover bg-center relative flex items-center overflow-hidden group"
      style={{ 
        backgroundImage: `url('/hero2.webp')` 
      }}
    >
      {/* Soft overlay for mobile readability, invisible on large desktop screens */}
      <div className="absolute inset-0 bg-white/40 md:bg-transparent z-10"></div>

      <div className="max-w-[1120px] mx-auto w-full px-6 relative z-20">
        {/* Text Container - Added transition and group-hover classes */}
        <div className="max-w-md md:max-w-xl space-y-4 md:space-y-6 transform transition-transform duration-500 ease-out group-hover:scale-105">
          
          <div className="space-y-2">
            {/* Main Catchy Heading */}
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2d2a26] leading-tight tracking-wide">
              New Trending Collection
            </h2>
            
            {/* Subtitle description */}
            <p className="text-sm md:text-base text-gray-600 font-medium">
              We Believe That Good Design is Always in Season
            </p>
          </div>

          {/* Accurate Styled Outline Button */}
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block border border-[#c09578] text-[#c09578] hover:bg-[#c09578] hover:text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase bg-white/80 md:bg-transparent transition-all duration-300 rounded-sm"
            >
              Shopping Now
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}