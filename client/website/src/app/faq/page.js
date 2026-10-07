"use client";
import React, { useState } from "react";
import Breadcrumb from "../common/BreadCrumb";
import { IoChevronDown } from "react-icons/io5";

export default function FAQ() {
  // State to track which accordion item is currently open
  const [openId, setOpenId] = useState(null);

  // FAQ Data array containing standard e-commerce questions
  const faqData = [
    {
      id: 1,
      question: "What materials are used in your furniture?",
      answer: "Our furniture is crafted using 100% high-quality solid wood, premium teakwood, and seasoned engineered wood. We use top-grade fabrics and stainless steel hardware to ensure maximum durability and a premium finish.",
    },
    {
      id: 2,
      question: "Do you provide free delivery and installation?",
      answer: "Yes, we offer free shipping and professional installation on all orders above Rs. 5,000 across India. For orders below this amount, a standard shipping fee applies depending on your location.",
    },
    {
      id: 3,
      question: "Can I customize the size or color of a sofa?",
      answer: "Absolutely! We provide custom solutions for selected furniture pieces, including sofas and dining tables. You can select your preferred fabric, color, and size options by contacting our support team.",
    },
    {
      id: 4,
      question: "What is your return and cancellation policy?",
      answer: "You can cancel your order within 24 hours of placing it for a full refund. We also offer a 7-day replacement policy if the product arrives damaged or has any manufacturing defects.",
    },
    {
      id: 5,
      question: "Does your furniture come with a warranty?",
      answer: "Yes, all our premium wooden furniture products come with a comprehensive 1-Year to 3-Year warranty covering manufacturing defects, termite infestation, and structural flaws.",
    },
  ];

  // Function to toggle accordion item
  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-16">
      {/* 1. Breadcrumb Component */}
      <Breadcrumb title="Frequently Asked Questions" links={[{ label: "FAQ" }]} />

      {/* 2. Main Layout Container */}
      <div className="max-w-[800px] mx-auto px-6 mt-16">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-black">
            Have Questions? Look Here
          </h2>
          <p className="text-sm text-gray-500">
            Find answers to the most frequently asked questions about our products and services.
          </p>
        </div>

        {/* 3. Accordion List Wrapper */}
        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm transition-all duration-300"
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className={`text-sm md:text-base font-semibold ${isOpen ? "text-[#c09578]" : "text-gray-800"}`}>
                    {faq.question}
                  </span>
                  <IoChevronDown
                    className={`text-gray-500 text-lg transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? "rotate-180 text-[#c09578]" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content Panel (Smooth height animation using Tailwind wrapper) */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px] border-t border-gray-100" : "max-h-0"
                  }`}
                >
                  <div className="px-5 py-4 text-xs md:text-sm text-gray-600 leading-relaxed bg-gray-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}