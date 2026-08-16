import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoFilter, IoPencil } from 'react-icons/io5';
import { FiSearch, FiTrash2, FiToggleLeft } from 'react-icons/fi';

function SubCategoryTable() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([]);
  const [path, setPath] = useState('');

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  // API Call to fetch Sub Categories
  const getSubCategory = () => {
    axios.get(`${apibaseurl}subcategory/view`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          setData(Array.isArray(finalRes.data) ? finalRes.data : []);
          setPath(finalRes.path || '');
        }
      })
      .catch((err) => console.error("Error fetching subcategories:", err));
  };

  useEffect(() => {
    getSubCategory();
  }, []);

  // Checkbox Select Handlers
  const getCheckValue = (e) => {
    let checkValue = e.target.value;
    if (e.target.checked) {
      setIds([...ids, checkValue]);
    } else {
      setIds(ids.filter((v) => v !== checkValue));
    }
  };

  const allSelect = (e) => {
    if (e.target.checked) {
      setIds(filteredSubCategories.map((obj) => obj._id));
    } else {
      setIds([]);
    }
  };

  // Dynamic search filtering over API data
  const filteredSubCategories = data.filter((subCat) => {
    const parentName = subCat.parant?.name || '';
    const subName = subCat.name || '';
    return `${parentName} ${subName}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="max-w-9xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl mt-6 overflow-hidden select-none">

      {/* Dynamic Search / Filter Bar */}
      {showSearch && (
        <div className="bg-slate-50 p-4 border-b border-slate-100 transition-all duration-300">
          <div className="flex items-center border border-slate-300 w-full max-w-lg bg-white rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all">
            <FiSearch className="text-slate-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search by Parent or Sub Category name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow py-1 outline-none text-sm text-slate-700 bg-transparent"
            />
          </div>
        </div>
      )}

      {/* Modern Header Control Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-900 text-white px-6 py-4 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">View Sub Category List 📂</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage your application nested subcategories</p>
        </div>

        {/* Action Buttons Header */}
        <div className="flex items-center flex-wrap gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <IoFilter size={14} />
            Filter
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <FiToggleLeft size={14} />
            Change Status ({ids.length})
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <FiTrash2 size={14} />
            Delete Selected ({ids.length})
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-12 px-6 py-4 text-left">
                <input
                  type="checkbox"
                  onChange={allSelect}
                  checked={filteredSubCategories.length > 0 && ids.length === filteredSubCategories.length}
                  className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Parent Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sub Category Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Order Sequence
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-slate-100">
            {filteredSubCategories.length > 0 ? (
              filteredSubCategories.map((subCategory, index) => (
                <tr
                  key={subCategory._id || index}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      value={subCategory._id}
                      onChange={getCheckValue}
                      checked={ids.includes(subCategory._id)}
                      className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-700">
                    <span className="bg-purple-50 border border-purple-200 px-3 py-1 rounded-lg">
                      {subCategory.parant?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800 text-sm">
                    {subCategory.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <img
                      src={subCategory.image ? `${path}${subCategory.image}` : 'https://via.placeholder.com/40'}
                      alt={subCategory.name}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                      className="h-10 w-10 rounded-xl object-cover border border-slate-200 shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">
                    {subCategory.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide transition-all ${
                        subCategory.status
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          subCategory.status ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                        }`}
                      />
                      {subCategory.status ? "Active" : "Deactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-all shadow-sm active:scale-90 cursor-pointer"
                      title="Edit Sub Category"
                    >
                      <IoPencil size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">
                  No matching sub categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubCategoryTable;