import React, { useState } from 'react';
import { IoFilter, IoPencil, IoSearch } from 'react-icons/io5';

function SubCategoryTable() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const subCategories = [
    { id: 1, parentCategoryName: 'Shoe', subCategoryName: 'Men', imageUrl: 'https://via.placeholder.com/40x40/FFD700/FFFFFF?text=IMG', order: 1, status: 'Active' },
    { id: 2, parentCategoryName: 'Electronics', subCategoryName: 'Laptops', imageUrl: 'https://via.placeholder.com/40x40/ADD8E6/000000?text=LAP', order: 2, status: 'Deactive' },
    { id: 3, parentCategoryName: 'Apparel', subCategoryName: 'Women', imageUrl: 'https://via.placeholder.com/40x40/FF6347/FFFFFF?text=APP', order: 3, status: 'Active' },
  ];

  // Filter data based on search term
  const filteredSubCategories = subCategories.filter((subCategory) =>
    `${subCategory.parentCategoryName} ${subCategory.subCategoryName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Search Bar */}
      {showSearch && ( 
        <div className="flex items-center mb-4 w-[500px] border rounded-md px-3 py-2 bg-gray-50">
          <IoSearch className="text-gray-500 text-lg mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          View Sub Category
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
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parent Category Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sub Category Name
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
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubCategories.map((subCategory) => (
              <tr key={subCategory.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {subCategory.parentCategoryName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {subCategory.subCategoryName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={subCategory.imageUrl}
                    alt={`${subCategory.subCategoryName} image`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subCategory.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subCategory.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {subCategory.status}
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

export default SubCategoryTable;
