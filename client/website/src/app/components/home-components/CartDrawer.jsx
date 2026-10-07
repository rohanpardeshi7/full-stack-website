"use client";
import React from "react";
import Link from "next/link";
import { IoCloseOutline, IoTrashOutline } from "react-icons/io5";

/**
 * Global Slide-out Cart Drawer Component
 * Takes 'isOpen' (boolean) and 'onClose' (function) as props to manage visibility
 */
export default function CartDrawer({ isOpen, onClose }) {
  // Static mock items for cart UI design
  const cartItems = [
    {
      id: 1,
      title: "Caroline Study Tables",
      price: "Rs. 2,500",
      image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/thumbnail/9daaf34e-4e44-4632-9b2f-a9cb7be7da48-1670308064.jpg",
      quantity: 1,
    },
    {
      id: 2,
      title: "Dorian Shoe Rack",
      price: "Rs. 2,800",
      image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/thumbnail/9daaf34e-4e44-4632-9b2f-a9cb7be7da48-1670308064.jpg",
      quantity: 2,
    },
  ];

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${isOpen ? "visible" : "invisible"}`}>
      
      {/* 1. Left 70% Overlay Shadow */}
      <div 
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* 2. Right 30% Solid Cart Window Container */}
      <div 
        className={`absolute top-0 right-0 h-full w-full sm:w-[400px] md:w-[30%] bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* Drawer Header Section */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-gray-900 tracking-wide">
            Shopping Cart (3)
          </h2>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <IoCloseOutline size={26} />
          </button>
        </div>

        {/* Drawer Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-3 border border-gray-100 rounded-sm">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border border-gray-100 rounded-sm p-1 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-grow space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-gray-400 font-medium">Qty: {item.quantity}</p>
                  <p className="text-sm font-bold text-[#c09578]">{item.price}</p>
                </div>
                <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <IoTrashOutline size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 pt-12">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 font-medium">Your cart is currently empty.</p>
            </div>
          )}
        </div>

        {/* Drawer Bottom Total Pricing & Call to Action Bar */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-4">
            <div className="flex items-center justify-between text-base font-bold text-gray-900">
              <span>Subtotal:</span>
              <span className="text-[#c09578]">Rs. 8,100</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              
              {/* 👇 फिक्स: यहाँ onClick={onClose} जोड़ दिया है ताकि लिंक पर जाने के साथ ड्रॉअर खुद बंद हो जाए */}
              <Link href="/cart" onClick={onClose} className="w-full">
                <button className="w-full h-11 border border-gray-200 hover:border-gray-900 text-gray-800 font-bold text-xs tracking-widest uppercase bg-white rounded-sm transition-all">
                  View Cart
                </button>
              </Link>

              <button className="w-full h-11 bg-[#c09578] hover:bg-[#2d2a26] text-white font-bold text-xs tracking-widest uppercase rounded-sm transition-all">
                Checkout
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}