import React, { useState, useRef } from 'react';

function AddSubCategoryForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null); // Ref for the hidden file input

  // State for form fields
  const [parentCategory, setParentCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [order, setOrder] = useState('');

  // --- Drag and Drop Handlers ---
  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default to allow drop
    event.stopPropagation();
    event.currentTarget.classList.add('border-blue-500', 'bg-blue-50'); // Visual feedback on drag over
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50'); // Remove visual feedback
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50'); // Remove visual feedback

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // --- File Input Change Handler ---
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // --- Common file processing logic ---
  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a URL for image preview
    } else {
      alert('Please upload an image file (e.g., .jpg, .png, .gif).');
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  // --- Trigger hidden file input click ---
  const handleClickDragDropArea = () => {
    fileInputRef.current.click();
  };

  // --- Form Submission Handler ---
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send your form data to a backend
    const formData = new FormData();
    if (selectedFile) {
      formData.append('categoryImage', selectedFile);
    }
    formData.append('parentCategory', parentCategory);
    formData.append('categoryName', categoryName);
    formData.append('order', order);

    console.log('Submitting form data:', {
      selectedFile: selectedFile ? selectedFile.name : 'No file',
      parentCategory,
      categoryName,
      order,
    });
    // Example: fetch('/api/add-subcategory', { method: 'POST', body: formData });

    alert('Sub Category Added (Check console for data)');
    // Optionally reset form
    setSelectedFile(null);
    setPreviewUrl(null);
    setParentCategory('');
    setCategoryName('');
    setOrder('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Add Sub Category</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Category Image (Drag and Drop) */}
          <div className="flex flex-col space-y-4">
            <label htmlFor="categoryImage" className="text-gray-700 font-medium">Category Image</label>
            <div
              className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClickDragDropArea}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*" // Only accept image files
                onChange={handleFileChange}
              />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain p-2" />
              ) : (
                <>
                  {/* Simple cloud icon SVG */}
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Drag and drop</p>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="flex flex-col space-y-4">
            {/* Parent Category Name */}
            <div>
              <label htmlFor="parentCategory" className="text-gray-700 font-medium block mb-1">Parent Category Name</label>
              <select
                id="parentCategory"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={parentCategory}
                onChange={(e) => setParentCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {/* Dummy options - replace with dynamic data */}
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="homegoods">Home Goods</option>
              </select>
            </div>

            {/* Category Name */}
            <div>
              <label htmlFor="categoryName" className="text-gray-700 font-medium block mb-1">Category Name</label>
              <input
                type="text"
                id="categoryName"
                placeholder="Category Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            {/* Order */}
            <div>
              <label htmlFor="order" className="text-gray-700 font-medium block mb-1">Order</label>
              <input
                type="number"
                id="order"
                placeholder="Category Order"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Add Sub Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSubCategoryForm;