import React from 'react'

export default function Myprofile() {
  return (
    <div>
  <div className="space-y-6">
    {/* Main Title */}
    <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">
      My Profile
    </h2>

    {/* Form Container */}
    <div className="border border-gray-200 p-6 rounded-sm bg-white shadow-sm">
      <form className="space-y-5">
        
        {/* Radio Buttons for Title */}
        <div className="flex items-center gap-6 text-sm font-bold text-gray-900 pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="title" 
              defaultChecked 
              className="w-4 h-4 accent-blue-600 cursor-pointer" 
            />
            <span>Mr.</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="title" 
              className="w-4 h-4 accent-blue-600 cursor-pointer" 
            />
            <span>Mrs.</span>
          </label>
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Name*</label>
          <input 
            type="text" 
            required 
            className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" 
          />
        </div>

        {/* Email Input (Disabled / Read-Only style like screenshot) */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Email*</label>
          <input 
            type="email" 
            className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" 
          />
        </div>

        {/* Mobile Number Input */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Mobile Number*</label>
          <input 
            type="tel" 
            required 
            className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" 
          />
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Address*</label>
          <input 
            type="text" 
            required 
            className="w-full text-sm p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500" 
          />
        </div>

        {/* Submit Button aligned to the right */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            className="bg-[#c09578] hover:bg-[#b08467] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-8 rounded-full transition-colors shadow-sm"
          >
            Update
          </button>
        </div>

      </form>
    </div>
  </div>
</div>
  )
}
