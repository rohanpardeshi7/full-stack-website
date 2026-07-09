import React, { useState } from "react";
import { IoFilter, IoPencil } from "react-icons/io5";

function ViewTestimonialUpdatedTable() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data
  const testimonials = [
    {
      id: 1,
      name: "Neil Sims",
      imageUrl:
        "https://via.placeholder.com/40x40/FFD700/FFFFFF?text=IMG",
      designation: "CEO Of SunPark",
      rating: 5,
      order: 1,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Doe",
      imageUrl:
        "https://via.placeholder.com/40x40/FFD700/FFFFFF?text=IMG",
      designation: "CTO Of MoonCorp",
      rating: 4,
      order: 2,
      status: "Deactive",
    },
  ];

  // Filter data by search query
  const filteredTestimonials = testimonials.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Search Field */}
      {showSearch && (
        <div className="mb-4 w-[500px] flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Search testimonials..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          View Testimonial
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="flex items-center justify-center p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            <IoFilter className="text-lg" />
            <span className="mx-2">Filter</span>
          </button>
          <button className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-200">
            Change Status
          </button>
          <button className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200">
            Delete
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Designation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTestimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                </td>
                <td className="px-6 py-4">{testimonial.name}</td>
                <td className="px-6 py-4">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {testimonial.designation}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {testimonial.rating}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {testimonial.order}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      testimonial.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {testimonial.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">
                    <IoPencil className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredTestimonials.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewTestimonialUpdatedTable;
