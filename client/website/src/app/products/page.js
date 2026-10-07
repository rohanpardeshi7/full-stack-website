"use client";
import React, { useState, useEffect } from "react";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import Breadcrumb from "../common/BreadCrumb";
import { getProducts } from "@/app/APi-Services/home-api";
import ProductCard from "../common/ProductCard"; // 👈 Apne global ProductCard ka exact path yahan check kar lena

export default function ProductListing() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

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
        console.error("Product listing API error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.salePrice || a.actualPrice || 0;
    const priceB = b.salePrice || b.actualPrice || 0;
    if (sortBy === "low-to-high") return priceA - priceB;
    if (sortBy === "high-to-low") return priceB - priceA;
    if (sortBy === "a-z") return (a.name || "").localeCompare(b.name || "");
    if (sortBy === "z-a") return (b.name || "").localeCompare(a.name || "");
    return 0;
  });

  return (
    <div className="w-full bg-white py-12 px-4 md:px-6">
      <div className="max-w-[1320px] mx-auto">
        <div className="text-center mb-8">
          <Breadcrumb title="Products" links={[{ label: "Products" }]} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:hidden mb-2">
            <button 
              type="button"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="w-full flex items-center justify-between border border-gray-300 p-3 rounded-sm text-sm font-bold text-gray-800 bg-gray-50 focus:outline-none"
            >
              <span>SHOW ALL FILTERS & CATEGORIES</span>
              {isMobileFiltersOpen ? <IoChevronUpOutline size={18} /> : <IoChevronDownOutline size={18} />}
            </button>
          </div>

          <aside className={`w-full lg:w-[25%] border-r border-gray-200 pr-6 space-y-8 flex-shrink-0 custom-scrollbar lg:h-[500px] lg:overflow-y-auto lg:block ${
            isMobileFiltersOpen ? "block h-auto overflow-visible" : "hidden"
          }`}>
            <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
              <h2 className="text-lg font-serif font-bold text-gray-900 border-l-2 border-[#c09578] pl-2 mb-4 uppercase tracking-wider">
                Categories
              </h2>
            </div>
          </aside>

          <main className="w-full lg:w-[75%]">
            <div className="flex items-center justify-between border border-gray-200 p-3 mb-6 bg-white rounded-sm text-xs text-gray-500 font-medium">
              <span>Showing {sortedProducts.length} results</span>
              <div className="flex items-center gap-2">
                <span>Sort By :</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-sm px-2 py-1 bg-white text-gray-700 outline-none cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="low-to-high">Sort by price: low to high</option>
                  <option value="high-to-low">Sort by price: high to low</option>
                  <option value="a-z">Product Name: A to Z</option>
                  <option value="z-a">Product Name: Z to A</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="py-20 text-center text-gray-400 font-medium">Loading products...</div>
            ) : sortedProducts.length === 0 ? (
              <div className="py-20 text-center text-gray-400 font-medium">No products found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    imagePath={imagePath}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}