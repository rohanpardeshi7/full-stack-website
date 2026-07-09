"use client";
import React, { useState } from "react";

const NewslettersManagement = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-4">
      <div className="border rounded-lg shadow overflow-hidden">

        {/* Search Bar */}
        {showSearch && (
          <div className="bg-white p-3 border-b">
            <div className="flex items-center border  w-[500px] rounded-md px-2 py-1">
              <input
                type="text"
                placeholder="Search Newsletter"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-2 py-1 outline-none"
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                🔍
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-bold">Newsletters Management</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Filter
            </button>
            <button
              type="submit"
              form="newsletterForm"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
              Change Status
            </button>
            <button
              type="submit"
              form="newsletterForm"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Form with table */}
        <form id="newsletterForm" method="POST" action="/api/newsletters">
          <table className="min-w-full text-sm text-left border-t">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">
                  NAME
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">
                  EMAIL ID
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">
                  MOBILE NUMBER
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">
                  STATUS
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {["Active", "Deactive"].map((status, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      name="selectedUsers[]"
                      value={index}
                    />
                  </td>
                  <td className="px-4 py-2 font-medium">Neil Sims</td>
                  <td className="px-4 py-2 text-gray-600">xyz@gmail.com</td>
                  <td className="px-4 py-2 text-gray-600">9876543210</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded text-white text-xs font-semibold ${
                        status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default NewslettersManagement;
