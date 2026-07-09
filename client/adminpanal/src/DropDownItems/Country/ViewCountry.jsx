import React, { useState } from "react";
import { IoFilter, IoPencil } from "react-icons/io5";

function ViewCountryTable() {
  const [showSearch, setShowSearch] = useState(false);

  const countries = [
    { id: 1, countryName: "Neil Sims", order: 1, status: "Active" },
    { id: 2, countryName: "Neil Sims", order: 1, status: "Deactive" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Search Field on Top */}
      {showSearch && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
          />
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">View Country</h2>
        <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <IoFilter className="text-lg" /> Filter
          </button>
          <button className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition">
            Change Status
          </button>
          <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">
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
                
                </th>
                <th className="px-6 py-3 text-left">Country Name</th>
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {countries.map((country) => (
              <tr key={country.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-colors duration-150"
                  />
                </td>
                <td className="px-6 py-4">{country.countryName}</td>
                <td className="px-6 py-4">{country.order}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      country.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {country.status}
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

export default ViewCountryTable;
