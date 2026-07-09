import React, { useState } from "react";
import { FaFilter, FaEdit } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const users = [
  {
    id: 1,
    name: "Neil Sims",
    email: "xyz@gmail.com",
    mobile: "9876543210",
    status: "Active",
  },
  {
    id: 2,
    name: "Neil Sims",
    email: "xyz@gmail.com",
    mobile: "9876543210",
    status: "Deactivate",
  },
];

export default function ViewUser() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSearch = () => setShowSearch((prev) => !prev);

  return (
    <>
      {/* Search Field */}
      {showSearch && (
        <div className="p-4 flex items-center gap-3 border w-[500px] border-gray-300 rounded-md bg-white mb-4">
          <input
            className="p-2 border border-gray-300 rounded w-full"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch className="text-2xl text-gray-600" />
        </div>
      )}

      {/* User Card */}
      <div className="border rounded-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-100 px-4 py-3 border-b">
          <h2 className="text-xl font-semibold">View User</h2>
          <div className="flex items-center gap-3">
            <button
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={toggleSearch}
            >
              <FaFilter />
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Change Status
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email ID</th>
                <th className="px-4 py-3">Mobile Number</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {users
                .filter((user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{user.email}</td>
                    <td className="px-4 py-3 text-gray-700">{user.mobile}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
