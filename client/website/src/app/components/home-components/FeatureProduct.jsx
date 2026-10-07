"use client";
import React, { useState, useEffect } from "react";
import { getProducts } from "@/app/APi-Services/home-api";
// 👇 Yahan apna ProductCard ka sahi path de do (jaise '@/app/components/common/ProductCard')
import ProductCard from "@/app/common/ProductCard";

export default function FeatureProduct() {
  const [activeTab, setActiveTab] = useState("Featured");
  const tabs = ["Featured", "New Arrivals", "Onsale"];

  const [products, setProducts] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => {
        if (res?.status) {
          setProducts(res.data || []);
          setImagePath(res.path || "");
        }
      })
      .catch((err) => {
        console.error("Feature products API error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Tabs filtering
  const filteredProducts = products.filter((item) => {
    if (activeTab === "Featured") {
      return item.productType === "Features" || item.productType === "Featured" || true;
    }
    if (activeTab === "Onsale") {
      return item.upSale || (item.salePrice && item.salePrice < item.actualPrice);
    }
    return true;
  });

  return (
    <div className="w-full bg-white py-12">
      {/* 1. Header & Tabs Section */}
      <div className="w-full bg-white py-2 px-4 mb-10">
        <div className="relative max-w-[1120px] mx-auto flex justify-center items-center">
          <div className="absolute inset-y-1/2 left-0 w-full h-[1px] bg-gray-200 -z-10"></div>
          
          <div className="flex bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3.5 text-sm md:text-base font-serif font-bold tracking-wide transition-all duration-300 border-r border-gray-100 last:border-0 focus:outline-none ${
                    isActive
                      ? "text-[#c09578] border-t-2 border-t-[#c09578]"
                      : "text-gray-800 hover:text-[#c09578]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Responsive Product Grid */}
      <div className="max-w-[1320px] mx-auto px-6">
        {loading ? (
          <div className="py-16 text-center text-gray-400 font-medium">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-gray-400 font-medium">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                imagePath={imagePath}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}