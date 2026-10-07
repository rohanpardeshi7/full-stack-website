"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoHeartOutline } from "react-icons/io5";
import { addToCartApi } from "@/app/APi-Services/cart-api";

// Cookie se exact 'token' nikalne ka function
function getTokenFromCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  if (match && match[1]) {
    return decodeURIComponent(match[1].trim());
  }
  return null;
}

export default function ProductCard({ product, imagePath }) {
  const [loading, setLoading] = useState(false);

  // Slug ya _id for dynamic product detail page routing
  const targetParam = product?.slug || product?._id;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = getTokenFromCookie() || localStorage.getItem("token");

    if (!token) {
      alert("Please login first to add items to cart!");
      return;
    }

    const payload = {
      productName: product?.name,
      productPrice: product?.salePrice || product?.actualPrice,
      productimage: product?.image,
      qty: 1,
      productCategory:
        product?.subCategory?.name || product?.parant?.name || "Furniture",
    };

    try {
      setLoading(true);
      const data = await addToCartApi(payload, token);

      if (data?.status === 1) {
        alert("Product added to cart successfully!");
      } else {
        alert(data?.message || "Could not add to cart");
      }
    } catch (error) {
      console.error("Cart error:", error);
      alert(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col shadow-sm group">
      {/* 1. Image Clickable Link */}
      <Link href={`/product-details/${targetParam}`}>
        <div className="w-full h-[180px] bg-[#f8f9fa] flex items-center justify-center relative p-3 overflow-hidden cursor-pointer">
          <img
            src={
              product?.image
                ? `${imagePath}${product.image}`
                : "/placeholder.png"
            }
            alt={product?.name || "Product"}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* 2. Details */}
      <div className="p-4 flex flex-col items-center text-center flex-grow">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
          {product?.subCategory?.name || product?.parant?.name || "Furniture"}
        </p>

        {/* Title Link */}
        <Link href={`/product-details/${targetParam}`}>
          <h3 className="text-sm font-serif font-bold text-gray-800 mb-2 line-clamp-1 h-5 group-hover:text-[#c09578] transition-colors cursor-pointer">
            {product?.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {product?.actualPrice && (
            <span className="text-xs line-through text-gray-400 font-medium">
              Rs. {product.actualPrice}
            </span>
          )}
          <span className="text-sm font-bold text-[#c09578]">
            Rs. {product?.salePrice || product?.actualPrice}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex items-center gap-1.5 mt-auto">
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-[4px] bg-white text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors flex-shrink-0"
            aria-label="Add to Wishlist"
          >
            <IoHeartOutline size={16} />
          </button>

          <button
            type="button"
            disabled={loading}
            onMouseDown={(e) => e.stopPropagation()} // Swiper/Slider drag se bachata hai
            onClick={handleAddToCart}
            className="relative z-20 flex-grow h-9 bg-[#2d2a26] text-white text-[10px] font-bold tracking-widest uppercase rounded-[4px] hover:bg-[#c09578] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Adding..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}