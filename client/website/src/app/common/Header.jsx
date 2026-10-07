'use client';
import React, { useEffect, useState } from "react";
import {
  IoSearch,
  IoHeartOutline,
  IoCartOutline,
  IoChevronDown,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import CartDrawer from "../components/home-components/CartDrawer";
import { useSelector, useDispatch } from "react-redux"; // 👈 useDispatch add kiya
import { logout } from "../redux/userslice"; // 👈 logout action import kiya (path check kar lena)
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // Redux store se token liya
  let token = useSelector((mystore) => mystore.userStore.token);

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <header className="w-full bg-white relative">
        <div className="border-b border-gray-300 text-sm bg-white">
          <div className="max-w-[1120px] mx-auto flex justify-between items-center p-3 text-black">
            
            {/* Left Side: Contact Info */}
            <div className="flex items-center gap-1">
              <h1>Contact us 24/7: +91-9781234560</h1>
              <span className="text-gray-400">/</span>
              <h1>furniture@gmail.com</h1>
            </div>
            
            {/* Right Side: Hydration-safe condition */}
            <div className="flex items-center gap-4">
              {/* 💡 3. Pehle ensure karein component client par mount ho chuka hai */}
              {isMounted && token && token.trim() !== "" ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="cursor-pointer font-medium hover:text-[#c09578]"
                  >
                    Dashboard
                  </Link>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer font-medium text-red-600 hover:text-red-700 focus:outline-none"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="cursor-pointer hover:text-[#c09578]"
                  >
                    Login
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link 
                    href="/register" 
                    className="cursor-pointer hover:text-[#c09578]"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>

        {/* 2. MAIN HEADER (Logo, Search, Cart Icons) */}
        <div className="shadow-sm">
          <div className="max-w-[1120px] mx-auto py-4 px-6 flex items-center justify-between">
            {/* Logo */}
            <div className="w-[150px] flex-shrink-0">
              <Link href="/">
                <img
                  src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
                  alt="Company Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </Link>
            </div>

            {/* Hamburger for mobile */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <IoClose className="text-2xl text-gray-700" />
                ) : (
                  <IoMenu className="text-2xl text-gray-700" />
                )}
              </button>
            </div>

            {/* Desktop Icons & Search Bar */}
            <div className="hidden md:flex items-center space-x-6 flex-grow justify-end">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search product..."
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <IoHeartOutline className="text-2xl text-gray-700" />
                </button>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                >
                  <IoCartOutline className="text-2xl text-gray-700" />
                </button>

                <div className="relative group">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none"
                  >
                    <span className="text-gray-700 font-semibold">Rs. 0.00</span>
                    <IoChevronDown className="text-gray-500 text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. NAVIGATION BAR */}
      <nav className="bg-white border-b border-gray-300 shadow-sm flex sticky top-0 z-50">
        <div className="max-w-[1120px] mx-auto px-6 w-full">
          <ul
            className={`flex flex-col md:flex-row md:justify-center md:items-center md:space-x-8 text-[15px] font-medium text-black py-4 ${
              mobileMenuOpen ? "block" : "hidden md:flex"
            }`}
          >
            <Link href="/">
              <li className="cursor-pointer text-[#c09578] font-bold py-2 md:py-0">
                Home
              </li>
            </Link>
            <Link href="/products">
              <li className="cursor-pointer text-[#c09578] font-bold py-2 md:py-0">
                Products
              </li>
            </Link>

            {/* Living Dropdown */}
            <li className="relative group text-[#72685e] font-bold cursor-pointer hover:text-[#c09578] py-2 md:py-0">
              <div className="flex items-center gap-1">
                Living <IoIosArrowDown />
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-full mt-0 w-[600px] p-6 bg-white shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 grid grid-cols-3 gap-6 border border-gray-100">
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">TABLES</h3>
                  <ul className="text-sm text-gray-600 space-y-1 font-normal">
                    <li className="hover:text-[#c09578]">Side And End Tables</li>
                    <li className="hover:text-[#c09578]">Nest Of Tables</li>
                    <li className="hover:text-[#c09578]">Console Table</li>
                    <li className="hover:text-[#c09578]">Coffee Table Sets</li>
                    <li className="hover:text-[#c09578]">Coffee Tables</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">LIVING STORAGE</h3>
                  <ul className="text-sm text-gray-600 space-y-1 font-normal">
                    <li className="hover:text-[#c09578]">Prayer Units</li>
                    <li className="hover:text-[#c09578]">Display Unit</li>
                    <li className="hover:text-[#c09578]">Shoe Racks</li>
                    <li className="hover:text-[#c09578]">Chest Of Drawers</li>
                    <li className="hover:text-[#c09578]">Cabinets And Sideboard</li>
                    <li className="hover:text-[#c09578]">Bookshelves</li>
                    <li className="hover:text-[#c09578]">Tv Units</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">MIRRORS</h3>
                  <ul className="text-sm text-gray-600 space-y-1 font-normal">
                    <li className="hover:text-[#c09578]">Wooden Mirrors</li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Sofa Dropdown */}
            <li className="relative group text-[#72685e] font-bold cursor-pointer hover:text-[#c09578] py-2 md:py-0">
              <div className="flex items-center gap-1">
                Sofa <IoIosArrowDown />
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-full mt-0 w-[600px] p-6 bg-white shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 grid grid-cols-3 gap-6 border border-gray-100">
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">SOFA CUM BED</h3>
                  <ul className="text-sm text-gray-600 space-y-1 font-normal">
                    <li className="hover:text-[#c09578]">Wooden Sofa Cum Bed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">SOFA SETS</h3>
                  <ul className="text-sm text-gray-600 space-y-1 font-normal">
                    <li className="hover:text-[#c09578]">L Shape Sofa</li>
                    <li className="hover:text-[#c09578]">1 Seater Sofa</li>
                    <li className="hover:text-[#c09578]">2 Seater Sofa</li>
                    <li className="hover:text-[#c09578]">3 Seater Sofa</li>
                    <li className="hover:text-[#c09578]">Wooden Sofa Sets</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">SWING JHULA</h3>
                  <ul className="text-sm text-gray-600 space-y-1 font-normal">
                    <li className="hover:text-[#c09578]">Wooden Jhula</li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Pages Dropdown */}
            <li className="relative group font-bold cursor-pointer hover:text-[#c09578] py-2 md:py-0">
              <div className="flex items-center text-[#72685e] gap-1">
                Pages <IoIosArrowDown />
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-full mt-0 w-[300px] p-6 bg-white shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 border border-gray-100">
                <ul className="text-sm text-gray-600 space-y-2 font-normal">
                  <li><Link href="/about-us" className="hover:text-[#c09578] block">About Us</Link></li>
                  <li><Link href="/cart" className="hover:text-[#c09578] block">Cart</Link></li>
                  <li><Link href="/checkout" className="hover:text-[#c09578] block">Checkout</Link></li>
                  <li><Link href="/faq" className="hover:text-[#c09578] block">Frequently Questions</Link></li>
                </ul>
              </div>
            </li>

            {/* Contact Us */}
            <Link href="/contect-us">
              <li className="cursor-pointer text-[#72685e] hover:text-[#c09578] font-bold py-2 md:py-0">
                Contact Us
              </li>
            </Link>
          </ul>
        </div>
      </nav>

      {/* 4. SIDE CART OVERLAY DRAWER */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}