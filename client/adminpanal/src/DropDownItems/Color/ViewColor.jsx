"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";

const ViewColor = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample color data
  const colors = [
    { name: "Red", code: "#FF0000", order: 1, status: "Active" },
    { name: "Blue", code: "#0000FF", order: 2, status: "Deactive" },
  ];

  // Filter colors based on search
  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 border rounded-lg shadow-md">
      {/* Search bar */}
      {showSearch && (
        <div className="bg-white p-3 border-b">
          <div className="flex items-center border  w-[500px] rounded-md px-2 py-1">
            <input
              type="text"
              placeholder="Search Color"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-2   py-1 outline-none"
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
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-t">
        <h2 className="text-lg font-bold">View Color</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded"
          >
            Filter
          </button>
          <button
            type="submit"
            form="colorForm"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-1 rounded"
          >
            Change Status
          </button>
          <button
            type="submit"
            form="colorForm"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Table inside form */}
      <form id="colorForm" method="POST" action="/api/colors">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Color Name
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredColors.map((color, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      name="selectedColors[]"
                      value={color.name}
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {color.name}
                  </td>
                  <td className="px-4 py-2 text-blue-600">{color.code}</td>
                  <td className="px-4 py-2">{color.order}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        color.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {color.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ViewColor;
