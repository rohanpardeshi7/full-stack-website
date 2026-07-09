import React, { useState, useRef } from 'react';

function AddProductForm() {
  // State for image uploads
  const [productImage, setProductImage] = useState(null);
  const [bulkImage, setBulkImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]); // Array for multiple gallery images

  const productImageRef = useRef(null);
  const bulkImageRef = useRef(null);
  const galleryImagesRef = useRef(null);

  // State for form fields
  const [productName, setProductName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [productType, setProductType] = useState('');
  const [isBestSelling, setIsBestSelling] = useState('');
  const [isUpSell, setIsUpSell] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [totalInStocks, setTotalInStocks] = useState('');
  const [order, setOrder] = useState('');
  const [description, setDescription] = useState('');

  // --- Generic Drag and Drop / File Input Handlers ---
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

  const handleDrop = (event, setter, isMultiple = false) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      if (isMultiple) {
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        setter(prev => [...prev, ...imageFiles]);
      } else {
        if (files[0].type.startsWith('image/')) {
          setter(files[0]);
        } else {
          alert('Please upload an image file (e.g., .jpg, .png, .gif).');
        }
      }
    }
  };

  const handleFileChange = (event, setter, isMultiple = false) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (isMultiple) {
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        setter(prev => [...prev, ...imageFiles]);
      } else {
        if (files[0].type.startsWith('image/')) {
          setter(files[0]);
        } else {
          alert('Please upload an image file (e.g., .jpg, .png, .gif).');
        }
      }
    }
  };

  const getPreviewUrl = (file) => (file ? URL.createObjectURL(file) : null);

  // --- Form Submission ---
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Build FormData
    const formData = new FormData();
    if (productImage) formData.append('productImage', productImage);
    if (bulkImage) formData.append('bulkImage', bulkImage);
    // Append gallery images as array-like keys
    galleryImages.forEach((file, index) => {
      formData.append('galleryImages[]', file);
    });

    formData.append('productName', productName);
    formData.append('parentCategory', parentCategory);
    formData.append('subCategory', subCategory);
    formData.append('material', material);
    formData.append('color', color);
    formData.append('productType', productType);
    formData.append('isBestSelling', isBestSelling);
    formData.append('isUpSell', isUpSell);
    formData.append('actualPrice', actualPrice);
    formData.append('salePrice', salePrice);
    formData.append('totalInStocks', totalInStocks);
    formData.append('order', order);
    formData.append('description', description);

    console.log('Submitting Product Data:', {
      productImage: productImage ? productImage.name : 'N/A',
      bulkImage: bulkImage ? bulkImage.name : 'N/A',
      galleryImages: galleryImages.map(f => f.name),
      productName, parentCategory, subCategory, material, color, productType,
      isBestSelling, isUpSell, actualPrice, salePrice, totalInStocks, order, description
    });

    try {
      // Use the form's action as endpoint (fallback to /api/products)
      const endpoint = event.target.action || '/api/products';

      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData, // Do NOT set Content-Type; browser will add proper boundary
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Server error:', res.status, text);
        alert(`Error: ${res.status} - ${text}`);
        return;
      }

      const data = await res.json().catch(() => null);
      alert('Product Created Successfully');
      console.log('Server response:', data);

      // Optionally reset form fields after success
      setProductImage(null);
      setBulkImage(null);
      setGalleryImages([]);
      setProductName('');
      setParentCategory('');
      setSubCategory('');
      setMaterial('');
      setColor('');
      setProductType('');
      setIsBestSelling('');
      setIsUpSell('');
      setActualPrice('');
      setSalePrice('');
      setTotalInStocks('');
      setOrder('');
      setDescription('');
    } catch (err) {
      console.error('Submit error:', err);
      alert('An error occurred while submitting the form.');
    }
  };

  // Helper for generic drag-drop section
  const DragDropArea = ({ label, file, setter, inputRef, isMultiple = false, files = [] }) => (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 font-medium">{label}</label>
      <div
        className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, setter, isMultiple)}
        onClick={() => inputRef.current.click()}
      >
        <input
          type="file"
          ref={inputRef}
          name={label === 'Product Image' ? 'productImage' : label === 'Bulk Image' ? 'bulkImage' : 'galleryImages[]'}
          className="hidden"
          accept="image/*"
          multiple={isMultiple}
          onChange={(e) => handleFileChange(e, setter, isMultiple)}
        />
        {(isMultiple && files.length > 0) ? (
          <div className="flex flex-wrap justify-center p-2">
            {files.map((f, index) => (
              <img key={index} src={getPreviewUrl(f)} alt={`Preview ${index}`} className="h-16 w-16 object-contain m-1 rounded" />
            ))}
            <p className="mt-2 text-sm text-gray-500">+{files.length} images</p>
          </div>
        ) : (file && !isMultiple) ? (
          <img src={getPreviewUrl(file)} alt="Preview" className="max-h-full max-w-full object-contain p-2" />
        ) : (
          <>
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-500">Drag and drop</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto my-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Add Product</h2>
      </div>

      {/* IMPORTANT: action, method and encType provided for backend/native submit support.
          If you rely on JavaScript fetch, fetch will use the same endpoint (event.target.action). */}
      <form
        onSubmit={handleSubmit}
        action="/api/products"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Image Uploads */}
          <div className="col-span-1 flex flex-col space-y-6">
            <DragDropArea
              label="Product Image"
              file={productImage}
              setter={setProductImage}
              inputRef={productImageRef}
            />
            <DragDropArea
              label="Bulk Image"
              file={bulkImage}
              setter={setBulkImage}
              inputRef={bulkImageRef}
            />
            <DragDropArea
              label="Gallery Image"
              files={galleryImages}
              setter={setGalleryImages}
              inputRef={galleryImagesRef}
              isMultiple={true}
            />
          </div>

          {/* Right Columns: Form Fields */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="text-gray-700 font-medium block mb-1">Product Name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="Product Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            {/* Select Parent Category */}
            <div>
              <label htmlFor="parentCategory" className="text-gray-700 font-medium block mb-1">Select Parent Category</label>
              <select
                id="parentCategory"
                name="parentCategory"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={parentCategory}
                onChange={(e) => setParentCategory(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                <option value="cat1">Category 1</option>
                <option value="cat2">Category 2</option>
              </select>
            </div>

            {/* Select Sub Category */}
            <div>
              <label htmlFor="subCategory" className="text-gray-700 font-medium block mb-1">Select Sub Category</label>
              <select
                id="subCategory"
                name="subCategory"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">Select Sub Category</option>
                <option value="subcat1">Sub Category A</option>
                <option value="subcat2">Sub Category B</option>
              </select>
            </div>

            {/* Select Material */}
            <div>
              <label htmlFor="material" className="text-gray-700 font-medium block mb-1">Select Material</label>
              <select
                id="material"
                name="material"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                <option value="cotton">Cotton</option>
                <option value="leather">Leather</option>
              </select>
            </div>

            {/* Select Color */}
            <div>
              <label htmlFor="color" className="text-gray-700 font-medium block mb-1">Select Color</label>
              <select
                id="color"
                name="color"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
            </div>

            {/* Select Product Type */}
            <div>
              <label htmlFor="productType" className="text-gray-700 font-medium block mb-1">Select Product Type</label>
              <select
                id="productType"
                name="productType"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                <option value="electronic">Electronic</option>
                <option value="apparel">Apparel</option>
              </select>
            </div>

            {/* Is Best Selling */}
            <div>
              <label htmlFor="isBestSelling" className="text-gray-700 font-medium block mb-1">Is Best Selling</label>
              <select
                id="isBestSelling"
                name="isBestSelling"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={isBestSelling}
                onChange={(e) => setIsBestSelling(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Is UpSell */}
            <div>
              <label htmlFor="isUpSell" className="text-gray-700 font-medium block mb-1">Is UpSell</label>
              <select
                id="isUpSell"
                name="isUpSell"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={isUpSell}
                onChange={(e) => setIsUpSell(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Actual Price */}
            <div>
              <label htmlFor="actualPrice" className="text-gray-700 font-medium block mb-1">Actual Price</label>
              <input
                type="number"
                id="actualPrice"
                name="actualPrice"
                placeholder="Actual Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={actualPrice}
                onChange={(e) => setActualPrice(e.target.value)}
              />
            </div>

            {/* Sale Price */}
            <div>
              <label htmlFor="salePrice" className="text-gray-700 font-medium block mb-1">Sale Price</label>
              <input
                type="number"
                id="salePrice"
                name="salePrice"
                placeholder="Sale Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>

            {/* Total In Stocks */}
            <div>
              <label htmlFor="totalInStocks" className="text-gray-700 font-medium block mb-1">Total In Stocks</label>
              <input
                type="number"
                id="totalInStocks"
                name="totalInStocks"
                placeholder="Total In Stocks"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={totalInStocks}
                onChange={(e) => setTotalInStocks(e.target.value)}
              />
            </div>

            {/* Order */}
            <div>
              <label htmlFor="order" className="text-gray-700 font-medium block mb-1">Order</label>
              <input
                type="number"
                id="order"
                name="order"
                placeholder="Order"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <label htmlFor="description" className="text-gray-700 font-medium block mb-1">Description</label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            {/* Rich Text Editor Toolbar (Simulated) */}
            <div className="bg-gray-100 flex items-center p-2 space-x-2 border-b border-gray-300">
              <span className="text-sm font-semibold text-gray-700">Normal</span>
              <button type="button" className="p-1 rounded hover:bg-gray-200 text-gray-700 font-bold">B</button>
              <button type="button" className="p-1 rounded hover:bg-gray-200 text-gray-700 italic">I</button>
              <button type="button" className="p-1 rounded hover:bg-gray-200 text-gray-700 underline">U</button>
              <button type="button" className="p-1 rounded hover:bg-gray-200 text-gray-700">%</button>
            </div>
            {/* Textarea for Description */}
            <textarea
              id="description"
              name="description"
              rows="8"
              placeholder="Product Description"
              className="w-full p-3 resize-y focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Create Product Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
