import React from 'react';
import { IoPencil } from 'react-icons/io5'; // Using Io5 for the pencil icon

function ViewSliderTable() {
  // Dummy data for demonstration, matching the structure in the screenshot
  const sliders = [
    {
      id: 1,
      name: 'Neil Sims', // Based on screenshot
      imageUrl: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=IMG', // Dummy image (gold color)
      order: 1, // Based on screenshot
      status: 'Active', // Based on screenshot
    },
    {
      id: 2,
      name: 'Neil Sims', // Based on screenshot
      imageUrl: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=IMG', // Dummy image (gold color)
      order: 1, // Based on screenshot
      status: 'Deactive', // Based on screenshot
    },
    // Add more dummy slider data as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          View Slider
        </h2>
        <div className="flex items-center space-x-3">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                Action
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {sliders.map((slider) => (
              <tr key={slider.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {slider.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={slider.imageUrl}
                    alt={`${slider.name} image`}
                    className="h-10 w-10 rounded-full object-cover" // Circular image
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {slider.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      slider.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {slider.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                    <IoPencil className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewSliderTable;