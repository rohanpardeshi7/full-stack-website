"use client";
import React from "react";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

export default function Breadcrumb({ title, links = [] }) {
  return (
    <div className="w-full bg-[#2d2a26] text-white py-10 md:py-12 text-center relative overflow-hidden">
      {/* Background Decorative Pattern (Optional subtle styling) */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        {/* Dynamic Page Title */}
        <h1 className="text-2xl md:text-4xl font-serif font-bold tracking-wide capitalize mb-3 text-white">
          {title}
        </h1>

        {/* Breadcrumb Links */}
        <nav className="flex items-center justify-center space-x-2 text-xs md:text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-[#c09578] transition-colors duration-200">
            Home
          </Link>

          {links.map((link, index) => (
            <div key={index} className="flex items-center space-x-2">
              <IoChevronForward className="text-gray-500 text-xs flex-shrink-0" />
              {link.url ? (
                <Link 
                  href={link.url} 
                  className="hover:text-[#c09578] transition-colors duration-200 capitalize"
                >
                  {link.label}
                </Link>
              ) : (
                <span className="text-[#c09578] capitalize font-semibold">
                  {link.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}