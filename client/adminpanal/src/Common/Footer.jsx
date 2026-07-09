import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-2 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold mb-1">© 2025 WsCube Tech™ All Rights Reserved</h3>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              Design By <span className="text-blue-400 font-semibold">Rohan Pardeshi</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
