import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AddCategory = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null)
  let navigate = useNavigate()

  let apibaseurl = import.meta.env.VITE_APIBASEURL

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formData = new FormData(e.target)
    axios.post(`${apibaseurl}category/create`, formData)
        .then((res) => res.data)
        .then((finalres) => {
          if (finalres.status) {
            //color add
            setError(null)
            toast.success("Category Added")
            setTimeout(() => {
              navigate("/view-parent-category")
            }, 2000);

          } else {
            setError(finalres.error)
          }
        })
  };

  return (
    <div className="border rounded p-4 bg-white">
      <div className="bg-gray-100 px-4 py-2 rounded-t border-b">
        <h2 className="text-lg font-semibold">Add Category</h2>
      </div>

      {/* Form Start */}
      <form onSubmit={handleSubmit}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Image */}
          <div>
            <label className="block font-semibold mb-1">Category Image</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border border-dashed border-gray-400 rounded w-full h-60 flex items-center justify-center text-gray-400 text-sm cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()}
            >
              {file ? file.name : (
                <div className="text-center">
                  <svg
                    className="mx-auto mb-2 h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-5 4h.01"
                    />
                  </svg>
                  Drag and drop
                </div>
              )}
            </div>
            <input
              type="file"
              id="fileInput"
              name="image"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Category Name & Order */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Category Name</label>
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Order</label>
              <input
                type="number"
                name="order"
                placeholder="Order"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-4 pb-4">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Add Category
          </button>
        </div>
      </form>
      {/* Form End */}
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
