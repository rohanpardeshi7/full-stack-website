"use client";
import React, { useEffect, useState } from "react";
import { Pencil, Search, SlidersHorizontal, Trash2, ToggleLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewColor = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [data, setData] = useState([]);
  const [ids, setIds] = useState([])

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let getColors = () => {
    axios.get(`${apibaseurl}color/view`,{
      params:{
        name,
        code
      }
    })
      .then((res) => res.data)
      .then((finaRes) => {
        if (finaRes.status) {
          setData(finaRes.data);
        }
      })
      .catch((err) => console.error("Error fetching colors:", err));
  };

  let getCheckValue = (e) => {
    let checkValue = e.target.value
    if (e.target.checked) {
      setIds([...ids, checkValue])
    } else {
      setIds(ids.filter((v) => v != checkValue))
    }
  }

  let allSelect = (e) => {
    if (e.target.checked) {
      setIds(data.map((obj) => obj._id))
    } else {
      setIds([])
    }
  }

  let mulDelete = () => {
    if (ids.length) {
      let obj = {
        ids
      }
      axios.post(`${apibaseurl}color/multidelete`, obj)
        .then((res) => res.data)
        .then((finalres) => {
          if (finalres.status) {
            alert("Are sure want to delete")
            getColors()
          }
        })
    } else {
      alert("Please select color")
    }
  }

  let statusUpdated = () => {
    if (ids.length) {
      let obj = {
        ids
      }
      axios.post(`${apibaseurl}color/changestatus`, obj)
        .then((res) => res.data)
        .then((finalres) => {
          if (finalres.status) {
            getColors()
          }
        })
    } else {
      alert("Please select color")
    }
  }



  useEffect(() => {
    getColors();
  }, []);



  // Filter colors based on dynamic data state
  const filteredColors = data.filter((color) => {
    const matchesName = color.name.toLowerCase().includes(name.toLowerCase());
    const matchesCode = color.code.toLowerCase().includes(code.toLowerCase());
    return matchesName && matchesCode;
  });

  return (
    <div className="max-w-9xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl mt-6 overflow-hidden select-none">

      {/* Dynamic Search / Filter Bar */}
      {showSearch && (
        <div className="bg-slate-50 p-4 border-b border-slate-100 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-3xl mx-auto">

            {/* Inputs Container */}
            <div className="flex flex-col sm:flex-row flex-grow items-center border border-slate-300 bg-white rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all gap-2 sm:gap-0">

              {/* Name Input */}
              <div className="flex items-center w-full sm:w-1/2 sm:border-r border-slate-200 pr-2">
                <Search className="text-slate-400 mr-2 flex-shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Search color name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-1 outline-none text-sm text-slate-700 bg-transparent"
                />
              </div>

              {/* Code Input */}
              <div className="flex items-center w-full sm:w-1/2 pl-0 sm:pl-3">
                <input
                  type="text"
                  placeholder="Search hex code..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full py-1 outline-none text-sm text-slate-700 bg-transparent"
                />
              </div>

            </div>

            {/*   Search Button */}
            <button
              type="button"
              onClick={getColors}
              // 💡 Agar tum backend API par direct query fire karna chaho toh onClick par apna custom handler ya getColors function chala sakte ho
              className="flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex-shrink-0"
            >
              <Search size={16} />
              Search
            </button>

          </div>
        </div>
      )}

      {/* Modern Header Control Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-900 text-white px-6 py-4 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">View Colors List 🎨</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage your application dynamic color schemes</p>
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            Filter
          </button>

          <button
            type="button"
            form="colorForm"
            onClick={statusUpdated}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <ToggleLeft size={14} />
            Change Status
          </button>

          <button
            type="button"
            form="colorForm"
            onClick={mulDelete}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Trash2 size={14} />
            Delete Selected
          </button>
        </div>
      </div>

      {/* Data Table */}
      <form id="colorForm" onSubmit={(e) => e.preventDefault()}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="w-12 px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={allSelect}
                    checked={data.length == ids.length}
                    className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Color Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Hex Code
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
              {filteredColors.length > 0 ? (
                filteredColors.map((color, index) => (
                  <tr
                    key={color._id || index}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        name="selectedColors[]"
                        value={color._id}
                        onChange={getCheckValue}
                        checked={ids.includes(color._id)}
                        className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800 text-sm">
                      {color.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {/* Live Tiny Round Color Visualizer */}
                        <div
                          className="w-5 h-5 rounded-full border border-slate-300 shadow-inner"
                          style={{ backgroundColor: color.code }}
                        />
                        <span className="font-mono font-bold text-slate-600">{color.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">
                      {color.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {/* 💡 FIX: Added exact visual text conditional validation logic here */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide transition-all ${color.status === true
                          ? "bg-emerald-100 text-emerald-800"  // Active ke liye light green background aur dark green text
                          : "bg-rose-100 text-rose-800"        // Deactive ke liye light red background aur dark red text
                          }`}
                      >
                        {/* 🟢/🔴 Dynamic Glowing Dot */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${color.status === true ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                            }`}
                        />

                        {/* Text Layer */}
                        {color.status === true ? "Active" : "Deactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <Link to={`/edit-color/${color._id}`}>

                        <button

                          type="button"

                          className="inline-flex items-center justify-center p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-all shadow-sm active:scale-90 cursor-pointer"

                          title="Edit Row"

                        >

                          <Pencil size={15} />

                        </button>

                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No matching colors found in database setup.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ViewColor;