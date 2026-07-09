import React, { useState } from 'react';
import { IoFilter, IoPencil, IoSearch } from 'react-icons/io5';

function SubCategoryTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false); // Toggle state

  const subCategories = [
    { id: 1, parentCategoryName: 'Men', subCategoryName: 'Men', categoryName: 'Shoe', imageUrl: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=IMG', order: 1, status: 'Active' },
    { id: 2, parentCategoryName: 'Women', subCategoryName: 'Casual', categoryName: 'Dress', imageUrl: 'https://via.placeholder.com/40x40/ADD8E6/000000?text=IMG', order: 2, status: 'Deactive' },
    { id: 3, parentCategoryName: 'Kids', subCategoryName: 'Toys', categoryName: 'Games', imageUrl: 'https://via.placeholder.com/40x40/FF6347/FFFFFF?text=IMG', order: 3, status: 'Active' },
  ];

  // Filtered data
  const filteredData = subCategories.filter((item) =>
    item.parentCategoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subCategoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Search Field (toggle on Filter click) */}
      {showSearch && (
        <div className="flex items-center mb-4">
          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <IoSearch />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">View Sub Category</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center justify-center p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            <IoFilter className="text-lg" /> <span className="mx-2">Filter</span>
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
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sub Category Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((subCategory) => (
              <tr key={subCategory.id}>
                <td className="px-6 py-4">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                </td>
                <td className="px-6 py-4">{subCategory.parentCategoryName}</td>
                <td className="px-6 py-4">{subCategory.subCategoryName}</td>
                <td className="px-6 py-4">{subCategory.categoryName}</td>
                <td className="px-6 py-4">
                  <img src={subCategory.imageUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4">{subCategory.order}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      subCategory.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {subCategory.status}
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

export default SubCategoryTable;
