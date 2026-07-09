import React, { useState, useRef } from 'react';

function AddWhyChooseUsForm() {
  // State for image upload
  const [chosenImage, setChosenImage] = useState(null);
  const imageInputRef = useRef(null);

  // State for form fields
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState('');
  const [description, setDescription] = useState('');

  // --- Drag and Drop / File Input Handlers ---
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = (event, setter) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      if (files[0].type.startsWith('image/')) {
        setter(files[0]);
      } else {
        alert('Please upload an image file (e.g., .jpg, .png, .gif).');
      }
    }
  };

  const handleFileChange = (event, setter) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files[0].type.startsWith('image/')) {
        setter(files[0]);
      } else {
        alert('Please upload an image file (e.g., .jpg, .png, .gif).');
      }
    }
  };

  const getPreviewUrl = (file) => (file ? URL.createObjectURL(file) : null);

  // --- Form Submission ---
  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real application, you'd collect all this data and send it to your API
    const formData = new FormData();
    if (chosenImage) formData.append('image', chosenImage);
    formData.append('title', title);
    formData.append('order', order);
    formData.append('description', description);

    console.log('Submitting Why Choose Us Data:', {
      image: chosenImage ? chosenImage.name : 'N/A',
      title,
      order,
      description,
    });

    alert('Why Choose Us Category Added (Check console for data)');
    // Optionally, reset form fields here
    setChosenImage(null);
    setTitle('');
    setOrder('');
    setDescription('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Add Why Choose Us</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Image Upload */}
          <div className="flex flex-col space-y-4">
            <label htmlFor="chooseImage" className="text-gray-700 font-medium">Choose Image</label>
            <div
              className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, setChosenImage)}
              onClick={() => imageInputRef.current.click()}
            >
              <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                accept="image/*" // Only accept image files
                onChange={(e) => handleFileChange(e, setChosenImage)}
              />
              {chosenImage ? (
                <img src={getPreviewUrl(chosenImage)} alt="Preview" className="max-h-full max-w-full object-contain p-2" />
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
            {/* Title */}
            <div>
              <label htmlFor="title" className="text-gray-700 font-medium block mb-1">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Order */}
            <div>
              <label htmlFor="order" className="text-gray-700 font-medium block mb-1">Order</label>
              <input
                type="number"
                id="order"
                placeholder="Order"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="text-gray-700 font-medium block mb-1">Description</label>
              <textarea
                id="description"
                rows="5" // Adjust height as needed
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-y"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWhyChooseUsForm;