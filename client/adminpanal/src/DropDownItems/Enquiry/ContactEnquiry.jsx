"use client";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const ContactEnquiryManagement = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Example static data
  const users = [
    {
      id: 1,
      name: "Neil Sims",
      email: "xyz@gmail.com",
      phone: "9876543210",
      subject: "Website Inquiry",
      message: "Need help with checkout process",
      status: "Active",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      phone: "9123456789",
      subject: "Account Issue",
      message: "Can't log into my account",
      status: "Deactive",
    },
  ];

  // Filter logic
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <div className="p-4">
      <div className="border rounded-lg shadow overflow-hidden">
        
        {/* Search Bar (toggle) */}
        {showSearch && (
          <div className="bg-white p-3 border-b flex items-center gap-3">
            <div className="flex items-center border border-gray-300 w-[500px] rounded-md px-2 py-1">
              <input
                type="text"
                placeholder="Search by name, email, or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-2 py-1 outline-none"
              />
              <CiSearch className="text-2xl text-gray-600" />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-bold">Contact Enquiry Management</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <FaFilter /> Filter
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
              Change Status
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
        </div>

        {/* Form + Table */}
        <form method="POST" action="/api/contact-enquiry">
          <table className="min-w-full text-sm text-left border-t">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">USER INFO</th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">SUBJECT</th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">MESSAGE</th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">STATUS</th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-700">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2">
                    <input type="checkbox" name="selectedUsers[]" value={user.id} />
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {user.name} <br />
                    <span className="text-xs text-gray-500">{user.email}</span> <br />
                    <span className="text-xs text-gray-500">{user.phone}</span>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{user.subject}</td>
                  <td className="px-4 py-2 text-gray-600">{user.message}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded text-white text-xs font-semibold ${
                        user.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.status}
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

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ContactEnquiryManagement;
