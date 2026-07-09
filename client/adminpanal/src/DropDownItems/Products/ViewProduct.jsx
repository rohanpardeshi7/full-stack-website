import React from 'react';
import { IoTrash, IoPencil } from 'react-icons/io5'; // Using Io5 for trash and pencil icons

function ProductItemsTable() {
  // Dummy data for demonstration, matching the structure in the screenshot
  const products = [
    {
      id: 1,
      sNo: 1,
      productName: "Men's",
      description: "Lorem ipsum dolor sit...",
      shortDescription: "Lorem ipsum dolor sit...",
      thumbnailUrl: "https://via.placeholder.com/60x60/a0b4d4/ffffff?text=Product", // Dummy image
      status: "Active",
    },
    {
      id: 2,
      sNo: 2,
      productName: "Men's",
      description: "Lorem ipsum dolor sit...",
      shortDescription: "Lorem ipsum dolor sit...",
      thumbnailUrl: "https://via.placeholder.com/60x60/a0b4d4/ffffff?text=Product", // Dummy image
      status: "Active",
    },
    {
      id: 3,
      sNo: 3,
      productName: "Men's",
      description: "Lorem ipsum dolor sit...",
      shortDescription: "Lorem ipsum dolor sit...",
      thumbnailUrl: "https://via.placeholder.com/60x60/a0b4d4/ffffff?text=Product", // Dummy image
      status: "Active",
    },
    {
      id: 4,
      sNo: 4,
      productName: "Men's",
      description: "Lorem ipsum dolor sit...",
      shortDescription: "Lorem ipsum dolor sit...",
      thumbnailUrl: "https://via.placeholder.com/60x60/a0b4d4/ffffff?text=Product", // Dummy image
      status: "Active",
    },
    // Add more dummy product data as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          Product Items
        </h2>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                Delete {/* The screenshot shows 'Delete' above a checkbox */}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S. No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thumbnails
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                Status
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.sNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.productName}
                </td>
                <td className="px-6 py-4 max-w-xs text-sm text-gray-500">
                  <p className="line-clamp-2">{product.description}</p> {/* Truncate text */}
                  <a href="#" className="text-blue-600 hover:underline">Read More</a>
                </td>
                <td className="px-6 py-4 max-w-xs text-sm text-gray-500">
                  <p className="line-clamp-2">{product.shortDescription}</p> {/* Truncate text */}
                  <a href="#" className="text-blue-600 hover:underline">Read More</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.thumbnailUrl}
                    alt={`${product.productName} thumbnail`}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                      <IoTrash className="text-lg" />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200">
                      <IoPencil className="text-lg" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductItemsTable;