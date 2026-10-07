"use client";
import React from "react";
import { FiTruck, FiShield, FiAward, FiHeadphones } from "react-icons/fi";
import Breadcrumb from "../common/BreadCrumb";

export default function AboutUs() {
  const features = [
    {
      id: 1,
      icon: <FiTruck className="text-3xl text-[#c09578]" />,
      title: "Free Shipping",
      description: "Free shipping on all orders over Rs. 5,000 across India.",
    },
    {
      id: 2,
      icon: <FiAward className="text-3xl text-[#c09578]" />,
      title: "Premium Quality",
      description: "Crafted with 100% genuine teakwood and premium fabrics.",
    },
    {
      id: 3,
      icon: <FiShield className="text-3xl text-[#c09578]" />,
      title: "Secure Payment",
      description: "We offer completely safe and encrypted payment gateways.",
    },
    {
      id: 4,
      icon: <FiHeadphones className="text-3xl text-[#c09578]" />,
      title: "24/7 Support",
      description: "Dedicated customer service team available anytime you need.",
    },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-16">
      {/* 1. Reusable Breadcrumb */}
      <Breadcrumb title="About Us" links={[{ label: "About Us" }]} />

      <div className="max-w-[1120px] mx-auto px-6 mt-16 space-y-20">
        
        {/* 2. Our Story Section (Responsive 2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Block */}
          <div className="w-full h-[350px] md:h-[450px] relative rounded-md overflow-hidden shadow-md">
            <img
              src="/about-us-img.jpg"
              alt="Our Story Modern Furniture"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content Block */}
          <div className="space-y-6">
            <h5 className="text-sm font-bold text-[#c09578] tracking-widest uppercase">
              Our Story
            </h5>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black leading-tight">
              We Design Furniture To Match Your Lifestyle
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Our team of expert craftsmen works tirelessly to create luxury, durable, and hand-crafted furniture solutions that perfectly blend comfort with modern styles.
            </p>

            {/* Experience Stats Mini Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#c09578]">15+</h3>
                <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">
                  Years of Experience
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#c09578]">10K+</h3>
                <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Why Choose Us Section (Responsive 4-Column Grid) */}
        <div className="space-y-10">
          <div className="text-center max-w-[600px] mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-black">
              Why Choose Us
            </h2>
            <p className="text-sm text-gray-500">
              We provide the best shopping experience with unmatched product perks.
            </p>
          </div>

          {/* Grid Layout: 1 col on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-md border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 group-hover:bg-[#c09578]/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}