import React, { useState } from "react";
import { Pencil, Search } from "lucide-react";

const ViewMaterial = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const materials = [
    { id: 1, name: "Neil Sims", order: 1, status: "Active" },
    { id: 2, name: "John Doe", order: 2, status: "Inactive" },
    { id: 3, name: "Jane Smith", order: 3, status: "Active" },
  ];

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      {/* Search Field at Top */}
      {showSearch && (
        <div className="mb-4 relative w-[500px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Header */}
      <div className="bg-gray-100 px-4 py-2 rounded-t flex items-center justify-between">
        <h2 className="text-lg font-bold">View Material</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Filter
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
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3 text-xs font-semibold">MATERIAL NAME</th>
              <th className="p-3 text-xs font-semibold">ORDER</th>
              <th className="p-3 text-xs font-semibold">STATUS</th>
              <th className="p-3 text-xs font-semibold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((material) => (
              <tr key={material.id} className="border-t even:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3">{material.name}</td>
                <td className="p-3">{material.order}</td>
                <td className="p-3">
                  <span
                    className={`${
                      material.status === "Active"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    } text-white text-xs px-3 py-1 rounded`}
                  >
                    {material.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700">
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMaterial;
