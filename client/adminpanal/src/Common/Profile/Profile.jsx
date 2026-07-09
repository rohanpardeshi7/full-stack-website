import React, { useState } from 'react';

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export default function UpdateCompanyProfileForm() {
  // 💡 States for tracking form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    mapUrl: ''
  });
  
  const [imagePreview, setImagePreview] = useState("https://via.placeholder.com/150");

  // Input fields change handle karne ke liye single custom function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 💡 Live Image Preview Generator Logic
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Nayi chunri hui photo instant preview box me set ho jayegi
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault(); // 💡 FIX 2: Page ko refresh hone se rokega
    console.log("Submitting Company Profile Data:", formData);
    alert("Profile Updated Successfully! 🎉");
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-2xl shadow-xl select-none mt-10">
      <h2 className="text-xl font-bold text-gray-700 mb-6">Update Company Profile</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit}>
          
          {/* Category Image - Row */}
          <div className="flex items-center mb-6">
            <label className="w-1/3 text-sm font-medium text-gray-600 pr-4">Category Image</label>
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                
                {/* Image Preview Box */}
                <div className="h-20 w-20 rounded-md border border-gray-300 overflow-hidden relative flex-shrink-0">
                  <img src={imagePreview} alt="Company Profile" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Edit</span>
                  </div>
                </div>

                {/* Upload button area */}
                {/* 💡 FIX 1: Parent div me 'relative overflow-hidden' lagaya taaki input box iske andar stretch ho */}
                <div className="relative overflow-hidden border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors w-36 h-20">
                  <UploadIcon />
                  <span className="mt-1 text-xs text-gray-500 font-medium">Choose File</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                  />
                </div>

              </div>
            </div>
          </div>
          
          {/* Name & Email - Row */}
          <div className="flex items-center mb-6">
            <label className="w-1/3 text-sm font-medium text-gray-600 pr-4">Name & Email</label>
            <div className="flex-1 flex gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Official Email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                required
              />
            </div>
          </div>
          
          {/* Mobile Number - Row */}
          <div className="flex items-center mb-6">
            <label className="w-1/3 text-sm font-medium text-gray-600 pr-4">Mobile Number</label>
            <div className="flex-1">
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          
          {/* Address - Row */}
          <div className="flex items-start mb-6">
            <label className="w-1/3 text-sm font-medium text-gray-600 pr-4 mt-2">Address</label>
            <div className="flex-1">
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              ></textarea>
            </div>
          </div>
          
          {/* Google Map URL - Row */}
          <div className="flex items-center mb-6">
            <label className="w-1/3 text-sm font-medium text-gray-600 pr-4">Google Map URL</label>
            <div className="flex-1">
              <input
                type="url"
                name="mapUrl"
                value={formData.mapUrl}
                onChange={handleInputChange}
                placeholder="Google Map URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          
          {/* Google Map Preview - Row */}
          <div className="flex mb-8">
            <div className="w-1/3"></div>
            <div className="flex-1 border border-gray-300 rounded-md overflow-hidden">
              <div className="flex items-center justify-between bg-gray-50 border-b border-gray-300 px-4 py-2">
                <span className="text-xs font-semibold text-gray-600">Google Map URL Preview</span>
                <a href={formData.mapUrl || "#"} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">View larger map</a>
              </div>
              <div className="relative h-48 w-full bg-gray-200">
                <img
                  src="https://i.stack.imgur.com/wV2eD.png"
                  alt="Google Map Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Button - Row */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            >
              Update Company Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}