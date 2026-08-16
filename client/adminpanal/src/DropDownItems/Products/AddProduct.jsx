import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

function AddProductForm() {
  // State for image uploads
  const [productImage, setProductImage] = useState(null);
  const [backimage, setbackimage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const productImageRef = useRef(null);
  const backimageRef = useRef(null);
  const galleryImagesRef = useRef(null);

  // Form Field Input States (Selected String Values)
  const [productName, setProductName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');
  const [material, setMaterial] = useState(''); // 💡 Selected Material ID
  const [color, setColor] = useState('');       // 💡 Selected Color ID
  const [productType, setProductType] = useState('');
  const [isBestSelling, setIsBestSelling] = useState('');
  const [isUpSell, setIsUpSell] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [totalInStocks, setTotalInStocks] = useState('');
  const [order, setOrder] = useState('');
  const [description, setDescription] = useState('');

  // Dropdown Lists Data States (Always Arrays)
  const [parant, setParant] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subSubcategoryList, setSubSubcategoryList] = useState([]);
  const [colorList, setColorList] = useState([]);       // 💡 Array for Color Options
  const [materialList, setMaterialList] = useState([]); // 💡 Array for Material Options

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  // --- API Handlers ---
  let getColor = () => {
    axios.get(`${apibaseurl}product/color`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status && Array.isArray(finalRes.data)) {
          setColorList(finalRes.data);
        } else {
          setColorList([]);
        }
      })
      .catch((err) => {
        console.error("Color fetch error:", err);
        setColorList([]);
      });
  };

  let getMaterial = () => {
    axios.get(`${apibaseurl}product/material`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status && Array.isArray(finalRes.data)) {
          setMaterialList(finalRes.data);
        } else {
          setMaterialList([]);
        }
      })
      .catch((err) => {
        console.error("Material fetch error:", err);
        setMaterialList([]);
      });
  };

  let getParantCateory = () => {
    axios.get(`${apibaseurl}product/parant`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status && Array.isArray(finalRes.data)) {
          setParant(finalRes.data);
        }
      })
      .catch((err) => console.error("Parent category fetch error:", err));
  };

  let getSubCategory = (parantID) => {
    if (!parantID) {
      setSubCategoryList([]);
      setSubSubcategoryList([]);
      return;
    }
    axios.get(`${apibaseurl}product/subCategory/${parantID}`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status && Array.isArray(finalRes.data)) {
          setSubCategoryList(finalRes.data);
        } else {
          setSubCategoryList([]);
        }
      })
      .catch((err) => {
        console.error("SubCategory fetch error:", err);
        setSubCategoryList([]);
      });
  };

  let getSubSubCategory = (subCategoryID) => {
    if (!subCategoryID) {
      setSubSubcategoryList([]);
      return;
    }
    axios.get(`${apibaseurl}product/subSubCategory/${subCategoryID}`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status && Array.isArray(finalRes.data)) {
          setSubSubcategoryList(finalRes.data);
        } else {
          setSubSubcategoryList([]);
        }
      })
      .catch((err) => {
        console.error("SubSubCategory fetch error:", err);
        setSubSubcategoryList([]);
      });
  };

  let saveProduct = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    if (productImage) formData.set('image', productImage);
    if (backimage) formData.set('backImage', backimage);

    axios.post(`${apibaseurl}product/create`, formData)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          alert(finalRes.message || 'Product Created Successfully');
          setProductName('');
          setParentCategory('');
          setSubCategory('');
          setSubSubCategory('');
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
          setProductImage(null);
          setbackimage(null);
          setGalleryImages([]);
        } else {
          alert(finalRes.message || 'Failed to create product');
        }
      })
      .catch((err) => {
        console.error('Submit error:', err);
        alert(err.response?.data?.message || 'Server error occurred');
      });
  };

  useEffect(() => {
    getParantCateory();
    getColor();
    getMaterial();
  }, []);

  // --- Drag and Drop Handlers ---
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
        const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
        setter((prev) => [...prev, ...imageFiles]);
      } else {
        if (files[0].type.startsWith('image/')) {
          setter(files[0]);
        } else {
          alert('Please upload an image file.');
        }
      }
    }
  };

  const handleFileChange = (event, setter, isMultiple = false) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (isMultiple) {
        const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
        setter((prev) => [...prev, ...imageFiles]);
      } else {
        if (files[0].type.startsWith('image/')) {
          setter(files[0]);
        } else {
          alert('Please upload an image file.');
        }
      }
    }
  };

  const getPreviewUrl = (file) => (file ? URL.createObjectURL(file) : null);

  const DragDropArea = ({ label, file, setter, inputRef, isMultiple = false, files = [], name }) => (
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
          name={name}
          className="hidden"
          accept="image/*"
          multiple={isMultiple}
          onChange={(e) => handleFileChange(e, setter, isMultiple)}
        />
        {isMultiple && files.length > 0 ? (
          <div className="flex flex-wrap justify-center p-2">
            {files.map((f, index) => (
              <img key={index} src={getPreviewUrl(f)} alt={`Preview ${index}`} className="h-16 w-16 object-contain m-1 rounded" />
            ))}
            <p className="mt-2 text-sm text-gray-500 w-full text-center">+{files.length} images</p>
          </div>
        ) : file && !isMultiple ? (
          <img src={getPreviewUrl(file)} alt="Preview" className="max-h-full max-w-full object-contain p-2" />
        ) : (
          <>
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Add Product</h2>
      </div>

      <form onSubmit={saveProduct}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Image Uploads */}
          <div className="col-span-1 flex flex-col space-y-6 bg-gray-50 p-5 rounded-xl border border-gray-200">
  
  {/* 1. Main Product Image (Front) */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-semibold text-gray-700">
      Product Image (Front) <span className="text-red-500">*</span>
    </label>
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 hover:border-blue-400 transition-all">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <p className="text-xs text-gray-500 font-medium">Click to upload Front Image</p>
      </div>
      <input 
        type="file" 
        name="image" 
        accept="image/*" 
        className="hidden" 
        onChange={(e) => setProductImage(e.target.files[0])} 
        required 
      />
    </label>
    {productImage && (
      <div className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-gray-200">
        <img 
          src={URL.createObjectURL(productImage)} 
          alt="Front Preview" 
          className="h-12 w-12 rounded object-cover border"
        />
        <span className="text-xs text-gray-600 truncate flex-1 font-medium">{productImage.name}</span>
      </div>
    )}
  </div>

  {/* 2. Back Image */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-semibold text-gray-700">
      Back Image
    </label>
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 hover:border-blue-400 transition-all">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <p className="text-xs text-gray-500 font-medium">Click to upload Back Image</p>
      </div>
      <input 
        type="file" 
        name="backImage" 
        accept="image/*" 
        className="hidden" 
        onChange={(e) => setbackimage(e.target.files[0])} 
      />
    </label>
    {backimage && (
      <div className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-gray-200">
        <img 
          src={URL.createObjectURL(backimage)} 
          alt="Back Preview" 
          className="h-12 w-12 rounded object-cover border"
        />
        <span className="text-xs text-gray-600 truncate flex-1 font-medium">{backimage.name}</span>
      </div>
    )}
  </div>

  {/* 3. Gallery Images (Multiple) */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-semibold text-gray-700">
      Gallery Images (Multiple)
    </label>
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 hover:border-blue-400 transition-all">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <p className="text-xs text-gray-500 font-medium">Select multiple images</p>
      </div>
      <input 
        type="file" 
        name="gallery" 
        accept="image/*" 
        multiple 
        className="hidden" 
        onChange={(e) => setGalleryImages(Array.from(e.target.files))} 
      />
    </label>
    
    {galleryImages.length > 0 && (
      <div className="grid grid-cols-4 gap-2 pt-2">
        {galleryImages.map((file, index) => (
          <div key={index} className="relative h-14 w-full rounded-md overflow-hidden border border-gray-200 bg-white">
            <img 
              src={URL.createObjectURL(file)} 
              alt={`Gallery ${index}`} 
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    )}
  </div>

</div>

          {/* Right Columns: Form Fields */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="text-gray-700 font-medium block mb-1">Product Name</label>
              <input
                type="text"
                id="productName"
                name="name"
                placeholder="Product Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            {/* Select Parent Category */}
            <div>
              <label htmlFor="parentCategory" className="text-gray-700 font-medium block mb-1">Select Parent Category</label>
              <select
                id="parentCategory"
                name="parant"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={parentCategory}
                onChange={(e) => {
                  const pId = e.target.value;
                  setParentCategory(pId);
                  setSubCategory('');
                  setSubSubCategory('');
                  setSubSubcategoryList([]);
                  getSubCategory(pId);
                }}
                required
              >
                <option value="">Nothing Selected</option>
                {parant.map((obj) => (
                  <option value={obj._id} key={obj._id}>{obj.name}</option>
                ))}
              </select>
            </div>

            {/* Select Sub Category */}
            <div>
              <label htmlFor="subCategory" className="text-gray-700 font-medium block mb-1">Select Sub Category</label>
              <select
                id="subCategory"
                name="subCategory"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subCategory}
                onChange={(e) => {
                  const subId = e.target.value;
                  setSubCategory(subId);
                  setSubSubCategory('');
                  getSubSubCategory(subId);
                }}
                required
              >
                <option value="">Select Sub Category</option>
                {subCategoryList.map((obj) => (
                  <option value={obj._id} key={obj._id}>{obj.name}</option>
                ))}
              </select>
            </div>

            {/* Select Sub Sub Category */}
            <div>
              <label htmlFor="subSubCategory" className="text-gray-700 font-medium block mb-1">Select Sub Sub Category</label>
              <select
                id="subSubCategory"
                name="subSubCategory"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subSubCategory}
                onChange={(e) => setSubSubCategory(e.target.value)}
              >
                <option value="">Select Sub Sub Category</option>
                {subSubcategoryList.map((obj) => (
                  <option value={obj._id} key={obj._id}>{obj.name}</option>
                ))}
              </select>
            </div>

            {/* Select Material */}
            <div>
              <label htmlFor="material" className="text-gray-700 font-medium block mb-1">Select Material</label>
              <select
                id="material"
                name="materials"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                {materialList.map((obj) => (
                  <option value={obj._id} key={obj._id}>{obj.name}</option>
                ))}
              </select>
            </div>

            {/* Select Color */}
            <div>
              <label htmlFor="color" className="text-gray-700 font-medium block mb-1">Select Color</label>
              <select
                id="color"
                name="colors"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                {colorList.map((obj) => (
                  <option value={obj._id} key={obj._id}>{obj.name}</option>
                ))}
              </select>
            </div>

            {/* Select Product Type */}
            <div>
              <label htmlFor="productType" className="text-gray-700 font-medium block mb-1">Select Product Type</label>
              <select
                id="productType"
                name="productType"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                <option value="Features">Features</option>
                <option value="New Arrivals">New Arrivals</option>
                <option value="On Sale">On Sale</option>
              </select>
            </div>

            {/* Is Best Selling */}
            <div>
              <label htmlFor="isBestSelling" className="text-gray-700 font-medium block mb-1">Is Best Selling</label>
              <select
                id="isBestSelling"
                name="bestSelling"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={isBestSelling}
                onChange={(e) => setIsBestSelling(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Is UpSell */}
            <div>
              <label htmlFor="isUpSell" className="text-gray-700 font-medium block mb-1">Is UpSell</label>
              <select
                id="isUpSell"
                name="upSale"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={isUpSell}
                onChange={(e) => setIsUpSell(e.target.value)}
              >
                <option value="">Nothing Selected</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={actualPrice}
                onChange={(e) => setActualPrice(e.target.value)}
                required
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                name="stock"
                placeholder="Total In Stocks"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={totalInStocks}
                onChange={(e) => setTotalInStocks(e.target.value)}
                required
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <label htmlFor="description" className="text-gray-700 font-medium block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Product Description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-200 cursor-pointer"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;