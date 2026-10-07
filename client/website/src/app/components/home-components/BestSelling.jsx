"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoHeartOutline } from "react-icons/io5";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import { getProducts } from "@/app/APi-Services/home-api";
import { addToCartApi } from "@/app/APi-Services/cart-api";

// Direct Cookie Parser
function getTokenFromCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  if (match && match[1]) {
    return decodeURIComponent(match[1].trim());
  }
  return null;
}

export default function BestsellingSlider() {
  const [products, setProducts] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (res.status) {
          setProducts(res.data || []);
          setImagePath(res.path || "");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const token = getTokenFromCookie() || localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      return;
    }

    const payload = {
      productName: product?.name,
      productPrice: Number(
        product?.salePrice || product?.price || product?.actualPrice || 0
      ),
      productimage: product?.image || "",
      qty: 1,
      productCategory:
        product?.subCategory?.name || product?.parant?.name || "Furniture",
    };

    try {
      setLoadingId(product._id);
      const data = await addToCartApi(payload, token);

      if (data?.status === 1) {
        alert("Product cart me add ho gaya!");
      } else {
        alert(data?.message || "Cart me add nahi ho paya");
      }
    } catch (error) {
      console.error("Cart error:", error);
      alert(error.response?.data?.message || "Cart me add nahi ho paya");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Header Row */}
        <div className="relative w-full flex items-center justify-between mb-8">
          <div className="flex-shrink-0 bg-white pr-4 z-10">
            <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-wide">
              Bestselling Products
            </h2>
          </div>

          <div className="absolute inset-y-1/2 left-0 w-full h-[1px] bg-gray-200 -z-10"></div>

          <div className="flex items-center space-x-1 bg-white pl-4 z-10">
            <button
              id="best-prev"
              className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-600 hover:text-[#c09578] hover:border-[#c09578] transition-colors rounded-sm focus:outline-none cursor-pointer"
              aria-label="Previous Slide"
            >
              <HiOutlineChevronLeft size={16} />
            </button>
            <button
              id="best-next"
              className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-600 hover:text-[#c09578] hover:border-[#c09578] transition-colors rounded-sm focus:outline-none cursor-pointer"
              aria-label="Next Slide"
            >
              <HiOutlineChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        {products.length > 0 && (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: "#best-prev",
              nextEl: "#best-next",
            }}
            loop={products.length > 5}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="w-full !py-2"
          >
            {products.map((product) => {
              const productParam = product.slug || product._id;
              const isAdding = loadingId === product._id;

              return (
                <SwiperSlide key={product._id}>
                  <div className="w-full bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col shadow-sm group">
                    {/* Image */}
                    <Link href={`/product-details/${productParam}`}>
                      <div className="w-full h-[180px] bg-[#f8f9fa] flex items-center justify-center relative p-3 overflow-hidden cursor-pointer">
                        <img
                          src={
                            product.image
                              ? `${imagePath}${product.image}`
                              : "/placeholder.png"
                          }
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="p-4 flex flex-col items-center text-center flex-grow">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                        {product.subCategory?.name ||
                          product.parant?.name ||
                          "Furniture"}
                      </p>

                      <Link href={`/product-details/${productParam}`}>
                        <h3 className="text-sm font-serif font-bold text-gray-800 mb-2 line-clamp-1 h-5 group-hover:text-[#c09578] transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-center space-x-2 mb-4">
                        {(product.actualPrice || product.price) && (
                          <span className="text-xs line-through text-gray-400 font-medium">
                            Rs. {product.actualPrice || product.price}
                          </span>
                        )}
                        <span className="text-sm font-bold text-[#c09578]">
                          Rs.{" "}
                          {product.salePrice ||
                            product.actualPrice ||
                            product.price}
                        </span>
                      </div>

                      {/* Actions */}
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
                          disabled={isAdding}
                          onClick={(e) => handleAddToCart(e, product)}
                          className="flex-grow h-9 bg-[#2d2a26] text-white text-[10px] font-bold tracking-widest uppercase rounded-[4px] hover:bg-[#c09578] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                        >
                          {isAdding ? "Adding..." : "Add To Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}