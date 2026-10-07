"use client";
import React from "react";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaTelegramPlane 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-600 border-t border-gray-200 pt-16 pb-8">
      {/* 1. Main 4-Column Grid */}
      <div className="max-w-[1120px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Column 1: Contact Us */}
        <div>
          <h3 className="text-xl font-bold font-serif text-black mb-6">Contact Us</h3>
          <ul className="space-y-3 text-[15px]">
            <li className="leading-relaxed">
              <span className="font-semibold text-gray-800">Address:</span> Claritas est etiam processus dynamicus
            </li>
            <li>
              <span className="font-semibold text-gray-800">Phone:</span> 98745612330
            </li>
            <li>
              <span className="font-semibold text-gray-800">Email:</span> furniture@gmail.com
            </li>
          </ul>
          
          {/* Social Icons */}
          <div className="flex items-center space-x-3 mt-6">
            <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-[#c09578] hover:border-[#c09578] transition-colors duration-300">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-[#c09578] hover:border-[#c09578] transition-colors duration-300">
              <FaInstagram size={14} />
            </a>
            <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-[#c09578] hover:border-[#c09578] transition-colors duration-300">
              <FaTwitter size={14} />
            </a>
            <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-[#c09578] hover:border-[#c09578] transition-colors duration-300">
              <FaYoutube size={14} />
            </a>
            <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-[#c09578] hover:border-[#c09578] transition-colors duration-300">
              <FaTelegramPlane size={14} />
            </a>
          </div>
        </div>

        {/* Column 2: Information */}
        <div>
          <h3 className="text-xl font-bold font-serif text-black mb-6">Information</h3>
          <ul className="space-y-3 text-[15px]">
            <li><Link href="/about-us" className="hover:text-[#c09578] transition-colors">About Us</Link></li>
            <li><Link href="/contact-us" className="hover:text-[#c09578] transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-[#c09578] transition-colors">Frequently Questions</Link></li>
          </ul>
        </div>

        {/* Column 3: My Account */}
        <div>
          <h3 className="text-xl font-bold font-serif text-black mb-6">My Account</h3>
          <ul className="space-y-3 text-[15px]">
            <li><Link href="/dashboard" className="hover:text-[#c09578] transition-colors">My Dashboard</Link></li>
            <li><Link href="/wishlist" className="hover:text-[#c09578] transition-colors">Wishlist</Link></li>
            <li><Link href="/cart" className="hover:text-[#c09578] transition-colors">Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-[#c09578] transition-colors">Checkout</Link></li>
          </ul>
        </div>

        {/* Column 4: Top Rated Products */}
        <div>
          <h3 className="text-xl font-bold font-serif text-black mb-6">Top Rated Products</h3>
          <div className="space-y-4">
            
            {/* Product 1 */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-16 bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/thumbnail/9daaf34e-4e44-4632-9b2f-a9cb7be7da48-1670308064.jpg" 
                  alt="Display Unit" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-tight">Display Unit</p>
                <h4 className="text-sm font-medium text-sky-800 hover:text-[#c09578] cursor-pointer">Dorian Shoe Rack</h4>
                <p className="text-xs mt-1">
                  <span className="line-through text-gray-400 mr-2">Rs. 3,500</span>
                  <span className="text-amber-700 font-bold">Rs. 2,800</span>
                </p>
              </div>
            </div>

            {/* Product 2 */}
            <div className="flex items-center space-x-4 pt-2 border-t border-gray-100">
              <div className="w-20 h-16 bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/thumbnail/65bf92bc-70e6-42f3-8fef-93f4da7e2e88-1670311283.jpg" 
                  alt="Side and End Tables" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-tight">Side and End Tables</p>
                <h4 className="text-sm font-medium text-sky-800 hover:text-[#c09578] cursor-pointer">Hrithvik Stool</h4>
                <p className="text-xs mt-1">
                  <span className="line-through text-gray-400 mr-2">Rs. 7,000</span>
                  <span className="text-amber-700 font-bold">Rs. 6,000</span>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 2. Middle Navigation Bar */}
      <div className="w-full border-t border-gray-200 py-6">
        <div className="max-w-[1120px] mx-auto px-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[15px] font-medium text-gray-700">
          <Link href="/" className="hover:text-[#c09578] transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-[#c09578] transition-colors">Online Store</Link>
          <Link href="/privacy-policy" className="hover:text-[#c09578] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#c09578] transition-colors">Terms Of Use</Link>
        </div>
      </div>

      {/* 3. Bottom Copyright & Payment Section */}
      <div className="w-full border-t border-gray-200 pt-6">
        <div className="max-w-[1120px] mx-auto px-6 flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-gray-500">
            All Rights Reserved By Furniture | © 2026
          </p>
          
          {/* Payment Gateways */}
          <div className="flex items-center space-x-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 object-contain bg-gray-50 px-2 py-0.5 border border-gray-200 rounded" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-5 object-contain bg-gray-50 px-2 py-0.5 border border-gray-200 rounded" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 object-contain bg-gray-50 px-2 py-0.5 border border-gray-200 rounded" />
            <span className="text-xs font-bold bg-gray-50 px-2 py-0.5 border border-gray-200 rounded tracking-wider text-purple-900">Skrill</span>
          </div>
        </div>
      </div>
    </footer>
  );
}