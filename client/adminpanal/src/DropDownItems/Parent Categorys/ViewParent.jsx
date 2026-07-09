import React, { useState } from 'react';
import { IoFilter, IoPencil } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';

function CategoryTable() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: 1, name: 'Neil Sims', imageUrl: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=IMG', order: 1, status: 'Active' },
    { id: 2, name: 'Neil Sims', imageUrl: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=IMG', order: 1, status: 'Deactive' },
    { id: 3, name: 'Electronics', imageUrl: 'https://via.placeholder.com/40x40/ADD8E6/000000?text=ELEC', order: 2, status: 'Active' },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      
      {/* Search Field */}
      {showSearch && (
        <div className="flex items-center border rounded px-3 py-2 mb-4 bg-gray-50 w-full max-w-sm">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          View Category
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center justify-center p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            <IoFilter className="text-lg" /> <span className='mx-2'>Filter</span>
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
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                </td>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">
                  <img
                    src={category.imageUrl}
                    alt={`${category.name} image`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">{category.order}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      category.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">
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

export default CategoryTable;
