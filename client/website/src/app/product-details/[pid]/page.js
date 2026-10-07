"use client";
import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { IoHeartOutline } from "react-icons/io5";
import { getProductDetail } from "@/app/APi-Services/home-api";
import { addToCartApi } from "@/app/APi-Services/cart-api";

// Cookie se token extract karne ka function
function getTokenFromCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  if (match && match[1]) {
    return decodeURIComponent(match[1].trim());
  }
  return null;
}

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const pid = resolvedParams?.pid;

  const [product, setProduct] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  // User Selections
  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!pid) return;

    setLoading(true);
    getProductDetail(pid)
      .then((res) => {
        if (res?.status) {
          const item = res.data;
          setProduct(item);
          setImagePath(res.path || "");
          setActiveImage(item.image || "");

          if (item.colors && item.colors.length > 0) {
            setSelectedColor(item.colors[0]);
          }
          if (item.materials && item.materials.length > 0) {
            setSelectedMaterial(item.materials[0]);
          }
        }
      })
      .catch((err) => {
        console.error("Product detail error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pid]);

  if (loading) {
    return (
      <div className="min-h-[450px] flex items-center justify-center font-medium text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[450px] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">Product Not Found</h2>
        <Link href="/" className="text-sm text-[#c09578] underline">
          Back to Home
        </Link>
      </div>
    );
  }

  // Gallery list compile
  const allImages = [
    product.image,
    product.backImage,
    ...(product.gallery || []),
  ].filter(Boolean);

  const availableStock = product.stock || 0;

  // Add To Cart Function
  const handleAddToCart = async () => {
    const token = getTokenFromCookie() || localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      return;
    }

    const payload = {
      productName: product.name,
      productPrice: product.salePrice || product.actualPrice,
      productimage: activeImage || product.image,
      qty: quantity,
      productCategory:
        product.subCategory?.name || product.parant?.name || "Furniture",
    };

    try {
      setCartLoading(true);
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
      setCartLoading(false);
    }
  };

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#c09578]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">
            {product.subCategory?.name || product.parant?.name}
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Images */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[420px] bg-[#f8f9fa] border border-gray-200 rounded-sm flex items-center justify-center p-6 overflow-hidden">
              <img
                src={
                  activeImage
                    ? `${imagePath}${activeImage}`
                    : "/placeholder.png"
                }
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
            </div>

            {/* Thumbnail Row */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allImages.map((imgName, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(imgName)}
                    className={`w-20 h-20 flex-shrink-0 bg-[#f8f9fa] border rounded-sm p-2 flex items-center justify-center cursor-pointer transition-all ${
                      activeImage === imgName
                        ? "border-[#c09578] ring-1 ring-[#c09578]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={`${imagePath}${imgName}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Actions */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
              {product.subCategory?.name || product.parant?.name}
            </p>

            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Prices */}
            <div className="flex items-center gap-3 mb-4">
              {product.actualPrice && (
                <span className="text-base line-through text-gray-400">
                  Rs. {product.actualPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-[#c09578]">
                Rs. {product.salePrice || product.actualPrice}
              </span>

              {product.actualPrice && product.salePrice && (
                <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-700 rounded-sm">
                  {Math.round(
                    ((product.actualPrice - product.salePrice) /
                      product.actualPrice) *
                      100
                  )}
                  % OFF
                </span>
              )}
            </div>

            {/* Stock Indicator */}
            <div className="mb-4">
              {availableStock > 0 ? (
                <span className="text-xs font-medium text-emerald-600">
                  In Stock ({availableStock} available)
                </span>
              ) : (
                <span className="text-xs font-medium text-red-500">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-b border-gray-100 py-4 mb-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Colors Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                  Select Color:
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs font-semibold border rounded-sm transition-all ${
                        selectedColor === color
                          ? "border-[#c09578] bg-[#c09578] text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {color.name || color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Materials Selection */}
            {product.materials && product.materials.length > 0 && (
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                  Material:
                </label>
                <div className="flex items-center gap-2">
                  {product.materials.map((mat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedMaterial(mat)}
                      className={`px-3 py-1.5 text-xs font-semibold border rounded-sm transition-all ${
                        selectedMaterial === mat
                          ? "border-[#2d2a26] bg-[#2d2a26] text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {mat.name || mat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center border border-gray-300 rounded-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={availableStock === 0}
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => Math.min(availableStock, prev + 1))
                  }
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={quantity >= availableStock}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={availableStock === 0 || cartLoading}
                className={`h-10 px-8 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors ${
                  availableStock > 0
                    ? "bg-[#2d2a26] text-white hover:bg-[#c09578] cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {cartLoading ? "Adding..." : "Add To Cart"}
              </button>

              <button
                type="button"
                className="w-10 h-10 border border-gray-300 flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-500 rounded-sm transition-colors"
                aria-label="Wishlist"
              >
                <IoHeartOutline size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}