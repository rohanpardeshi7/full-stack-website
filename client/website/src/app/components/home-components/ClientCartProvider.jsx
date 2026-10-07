'use client';
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";

export default function ClientCartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {/* हेडर को क्लिक फंक्शन पास किया */}
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* तुम्हारा सारा पेज का कंटेंट (Home, Shop, etc.) */}
      {children}
      
      <Footer />

      {/* हमारा 30% राइट साइड वाला कार्ट ड्रॉअर */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}