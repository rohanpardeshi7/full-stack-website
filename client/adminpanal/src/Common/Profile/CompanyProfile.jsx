import React from "react";

export default function UpdateCompanyProfileForm() {
  return (
    <div className="w-[1120px]l mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Update Company Profile
      </h2>

      {/* Category Image */}
      <div className="mb-4">
        <label
          htmlFor="categoryImage"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category Image
        </label>
        <div className="relative border border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span className="text-sm text-gray-600">Drag and drop</span>
          <input
            type="file"
            id="categoryImage"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={() => console.log("Image selected")} // Dummy handler
          />
        </div>
      </div>

      {/* Name */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Name"
          />
        </div>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Email"
          />
        </div>
      </div>

      {/* Mobile Number */}
      <div className="mb-4">
        <label
          htmlFor="mobileNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Mobile Number
        </label>
        <input
          type="tel"
          id="mobileNumber"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Mobile Number"
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Address
        </label>
        <textarea
          id="address"
          rows="3"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-[100px] sm:text-sm border border-gray-300 rounded-md"
          placeholder="Address"
        ></textarea>
      </div>

      {/* Google Map URL */}
      <div className="mb-4">
        <label
          htmlFor="googleMapUrl"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Google Map URL
        </label>
        <input
          type="url"
          id="googleMapUrl"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-[100px] sm:text-sm border-gray-300 rounded-md"
          placeholder="Google Map URL"
        />
      </div>

      {/* Google Map Preview */}
      <div className="mb-6 border border-gray-300 rounded-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-100 py-2 px-3 text-sm text-gray-600">
          <span>Google Map URL Preview</span>
          <div>
            <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none mr-2">
              View larger map
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29476.910799341666!2d75.77185109999999!3d22.55613355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1754823236382!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Update Company Profile Button */}
      <div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => console.log("Update button clicked")} // Dummy handler
        >
          Update Company Profile
        </button>
      </div>
    </div>
  );
}
