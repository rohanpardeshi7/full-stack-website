import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar: fixed on the left */}
      <div className="w-64 bg-gray-800 text-white fixed top-0 left-0 h-screen z-20">
        <Sidebar />
      </div>

      {/* Right side: shifted by sidebar width */}
      <div className="ml-64 flex flex-col flex-1 h-screen">
        {/* Header: sticky at the top */}
        <div className="sticky top-0 z-10 bg-white shadow">
          <Header />
        </div>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
