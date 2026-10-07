"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoAddOutline, IoRemoveOutline, IoTrashOutline, IoArrowBackOutline } from "react-icons/io5";

export default function CartPage() {
  // Static state for dynamic quantities management in design view
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Caroline Study Tables",
      category: "Nest Of Tables",
      price: 2500,
      image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/thumbnail/9daaf34e-4e44-4632-9b2f-a9cb7be7da48-1670308064.jpg",
      quantity: 1,
    },
    {
      id: 2,
      title: "Dorian Shoe Rack",
      category: "Display Unit",
      price: 2800,
      image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/thumbnail/9daaf34e-4e44-4632-9b2f-a9cb7be7da48-1670308064.jpg",
      quantity: 2,
    },
  ]);

  // Handler to update quantity inside state
  const updateQuantity = (id, type) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  // Handler to delete product from list
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculations matrix
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 500 : 0; // Flat Rs. 500 shipping fee
  const totalAmount = subtotal + shipping;

  return (
    <div className="w-full bg-white py-12 px-4 min-h-[70vh]">
      <div className="max-w-[1120px] mx-auto">
        
        {/* Page Main Breadcrumb / Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-wide mb-2">
            Shopping Cart
          </h1>
          <div className="text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#c09578] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Your Cart</span>
          </div>
        </div>

        {cartItems.length > 0 ? (
          /* Main Master-Detail 2 Column Grid Setup */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* COLUMN 1: Items Table Wrapper List (70% width on Desktop) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Desktop Table Headers */}
              <div className="hidden md:grid grid-cols-5 bg-[#f8f9fa] border border-gray-200 rounded-sm p-4 text-xs font-bold tracking-widest text-gray-400 uppercase text-center">
                <div className="col-span-2 text-left pl-4">Product Details</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
              </div>

              {/* Items Card List Grid Loop */}
              <div className="border border-gray-200 rounded-sm divide-y divide-gray-200 shadow-sm bg-white">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 p-5 items-center text-center"
                  >
                    {/* Product Meta Section */}
                    <div className="col-span-1 md:col-span-2 flex items-center space-x-4 text-left">
                      <div className="w-20 h-20 bg-[#f8f9fa] border border-gray-100 p-1 flex items-center justify-center flex-shrink-0 rounded-sm">
                        <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{item.category}</span>
                        <h3 className="text-sm font-bold text-gray-800 font-serif leading-snug line-clamp-2">{item.title}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="mt-2 text-gray-400 hover:text-red-500 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <IoTrashOutline size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Unit Price Info */}
                    <div className="text-sm font-semibold text-gray-700 md:block flex justify-between px-2">
                      <span className="md:hidden text-gray-400 text-xs font-bold">Price:</span>
                      Rs. {item.price.toLocaleString()}
                    </div>

                    {/* Counter Buttons Blocks */}
                    <div className="md:block flex justify-between items-center px-2">
                      <span className="md:hidden text-gray-400 text-xs font-bold">Quantity:</span>
                      <div className="inline-flex items-center border border-gray-200 bg-gray-50 rounded-sm overflow-hidden h-9">
                        <button 
                          onClick={() => updateQuantity(item.id, "dec")}
                          className="px-2.5 h-full hover:bg-gray-200 text-gray-500 transition-colors focus:outline-none"
                        >
                          <IoRemoveOutline size={14} />
                        </button>
                        <span className="px-4 text-sm font-bold text-gray-800 select-none">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, "inc")}
                          className="px-2.5 h-full hover:bg-gray-200 text-gray-500 transition-colors focus:outline-none"
                        >
                          <IoAddOutline size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Calculated Line Subtotals */}
                    <div className="text-sm font-bold text-[#c09578] md:block flex justify-between px-2">
                      <span className="md:hidden text-gray-400 text-xs font-bold">Total:</span>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>

                  </div>
                ))}
              </div>

              {/* Continue Shopping Retractor */}
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[#c09578] transition-colors group pt-2"
              >
                <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" /> 
                Continue Shopping
              </Link>
            </div>

            {/* COLUMN 2: Order Totals Summary Panel (30% width on Desktop) */}
            <div className="bg-[#fbfbfb] border border-gray-200 rounded-sm p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 border-b border-gray-200 pb-3 tracking-wide">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm text-gray-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span>Shipping Fee</span>
                  <span className="text-gray-900 font-bold">Rs. {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2">
                  <span>Total Amount</span>
                  <span className="text-xl text-[#c09578]">Rs. {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Coupon Module */}
              <div className="pt-2">
                <div className="flex border border-gray-200 rounded-sm overflow-hidden bg-white h-10">
                  <input 
                    type="text" 
                    placeholder="Coupon code" 
                    className="flex-grow px-3 text-xs focus:outline-none placeholder-gray-400 bg-transparent"
                  />
                  <button className="bg-gray-800 hover:bg-[#c09578] text-white font-bold text-[10px] tracking-widest uppercase px-4 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Direct Checkout Link Trigger */}
              <Link 
                href="/checkout"
                className="block w-full bg-[#c09578] hover:bg-[#2d2a26] text-white text-center font-bold text-xs tracking-widest uppercase py-4 rounded-sm transition-all shadow-sm"
              >
                Proceed To Checkout
              </Link>
            </div>

          </div>
        ) : (
          /* Clean Empty State Vibe Module */
          <div className="w-full text-center border border-dashed border-gray-200 bg-gray-50 rounded-sm py-16 px-6 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
            <p className="text-sm text-gray-400 max-w-sm mb-6">Looks like you haven't added any premium furniture to your cart yet.</p>
            <Link href="/shop" className="bg-gray-900 hover:bg-[#c09578] text-white font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-sm transition-colors">
              Return To Shop
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}