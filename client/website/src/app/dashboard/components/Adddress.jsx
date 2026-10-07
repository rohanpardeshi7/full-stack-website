import React from 'react'

export default function Adddress() {
  return (
    <div>
  <div className="space-y-6">
    {/* Top Subtitle Info */}
    <p className="text-xs text-gray-500 font-medium">
      The following addresses will be used on the checkout page by default.
    </p>

    {/* 2-Column Responsive Layout for Billing and Shipping */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      
      {/* ─── LEFT: BILLING ADDRESS FORM ─── */}
      <div className="border border-gray-200 p-6 rounded-sm bg-white shadow-sm space-y-4">
        <h2 className="text-xl font-serif font-bold text-gray-900 tracking-wide mb-2">
          Billing Address
        </h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Billing Name*</label>
            <input type="text" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Billing Email*</label>
            <input type="email" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Billing Mobile Number*</label>
            <input type="tel" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Billing Address*</label>
            <input type="text" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Country*</label>
            <select className="w-full text-sm p-2.5 border border-gray-300 rounded-sm bg-white text-gray-500 focus:outline-none focus:border-gray-500 cursor-pointer">
              <option>Select Country</option>
              <option>India</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">State*</label>
            <input type="text" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">City*</label>
            <input type="text" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="bg-[#c09578] hover:bg-[#b08467] text-white text-[11px] font-bold uppercase tracking-wider py-2 px-6 rounded-sm transition-colors shadow-sm">
              Update
            </button>
          </div>
        </form>
      </div>

      {/* ─── RIGHT: SHIPPING ADDRESS FORM ─── */}
      <div className="border border-gray-200 p-6 rounded-sm bg-white shadow-sm space-y-4">
        <h2 className="text-xl font-serif font-bold text-gray-900 tracking-wide mb-2">
          Shipping Address
        </h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Shipping Name*</label>
            <input type="text" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Shipping Email*</label>
            <input type="email" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Shipping Mobile Number*</label>
            <input type="tel" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Shipping Address*</label>
            <input type="text" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">Country*</label>
            <select className="w-full text-sm p-2.5 border border-gray-300 rounded-sm bg-white text-gray-500 focus:outline-none focus:border-gray-500 cursor-pointer">
              <option>Select Country</option>
              <option>India</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">State*</label>
            <input type="text" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">City*</label>
            <input type="text" required className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" />
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="bg-[#c09578] hover:bg-[#b08467] text-white text-[11px] font-bold uppercase tracking-wider py-2 px-6 rounded-sm transition-colors shadow-sm">
              Update
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</div>
  )
}
