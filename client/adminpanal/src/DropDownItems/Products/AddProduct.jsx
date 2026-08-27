import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AddProductForm() {
  const [productImage, setProductImage] = useState(null);
  const [backimage, setbackimage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const productImageRef = useRef(null);
  const backimageRef = useRef(null);
  const galleryImagesRef = useRef(null);

  const [data, setData] = useState([]);
  const [gallery, setGellery] = useState([]);
  const [path, setPath] = useState([]);

  const [parant, setParant] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subSubcategoryList, setSubSubcategoryList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

  let apibaseurl = import.meta.env.VITE_APIBASEURL;
  let navigate = useNavigate();

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

  // Sirf tab nayi file formData mein add karein jab user ne choose ki ho
  if (productImage) formData.set('image', productImage);
  if (backimage) formData.set('backImage', backimage);

  if (galleryImages.length > 0) {
    formData.delete('gallery');
    galleryImages.forEach((file) => {
      formData.append('gallery', file);
    });
  }

  // 💡 Agar ID hai toh UPDATE API (PUT), warna CREATE API (POST)
  let apiUrl = id ? `${apibaseurl}product/update/${id}` : `${apibaseurl}product/create`;
  let apiMethod = id ? axios.put : axios.post;

  apiMethod(apiUrl, formData)
    .then((res) => res.data)
    .then((finalRes) => {
      if (finalRes.status) {
        alert(finalRes.message || (id ? 'Product Updated Successfully' : 'Product Created Successfully'));
        navigate('/view-product'); // 👈 Table page par redirect (aapka jo table route ho wo path dein)
      } else {
        alert(finalRes.message || 'Operation failed');
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

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${apibaseurl}product/details/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status) {
            setData(finalRes.data);
            setGellery(finalRes.data.gallery || []);
            setPath(finalRes.path || '');
            if (finalRes.data.parant?._id) {
              getSubCategory(finalRes.data.parant._id);
            }
            if (finalRes.data.subCategory?._id) {
              getSubSubCategory(finalRes.data.subCategory._id);
            }
          }
        });
    } else {
      setData(null);
      setGellery([]);
      setPath('');
    }
  }, [id]);

  // const handleDragOver = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  // };

  // const handleDragLeave = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  // };

  // const handleDrop = (event, setter, isMultiple = false) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');

  //   const files = event.dataTransfer.files;
  //   if (files && files.length > 0) {
  //     if (isMultiple) {
  //       const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
  //       setter((prev) => [...prev, ...imageFiles]);
  //     } else {
  //       if (files[0].type.startsWith('image/')) {
  //         setter(files[0]);
  //       } else {
  //         alert('Please upload an image file.');
  //       }
  //     }
  //   }
  // };

  // const handleFileChange = (event, setter, isMultiple = false) => {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     if (isMultiple) {
  //       const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
  //       setter((prev) => [...prev, ...imageFiles]);
  //     } else {
  //       if (files[0].type.startsWith('image/')) {
  //         setter(files[0]);
  //       } else {
  //         alert('Please upload an image file.');
  //       }
  //     }
  //   }
  // };

  const getPreviewUrl = (file) => (file ? URL.createObjectURL(file) : null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto my-8">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          {id ? 'Edit Product' : 'Add Product'}
        </h2>
      </div>

      <form onSubmit={saveProduct} key={data?._id || 'new-product-form'}>
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
                />
              </label>
              {(productImage || data?.image) && (
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-gray-200">
                  <img 
                    src={productImage ? URL.createObjectURL(productImage) : path + data.image} 
                    alt="Front Preview" 
                    className="h-12 w-12 rounded object-cover border"
                  />
                  <span className="text-xs text-gray-600 truncate flex-1 font-medium">
                    {productImage ? productImage.name : data.image}
                  </span>
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
              {(backimage || data?.backImage) && (
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-gray-200">
                  <img 
                    src={backimage ? URL.createObjectURL(backimage) : path + data.backImage} 
                    alt="Back Preview" 
                    className="h-12 w-12 rounded object-cover border"
                  />
                  <span className="text-xs text-gray-600 truncate flex-1 font-medium">
                    {backimage ? backimage.name : data.backImage}
                  </span>
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
              
              {galleryImages.length > 0 ? (
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
              ) : gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {gallery.map((imgName, index) => (
                    <div key={index} className="relative h-14 w-full rounded-md overflow-hidden border border-gray-200 bg-white">
                      <img 
                        src={path + imgName} 
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
                defaultValue={data?.name}
                placeholder="Product Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={(e) => {
                  const pId = e.target.value;
                  getSubCategory(pId);
                }}
                required
              >
                <option value="">Nothing Selected</option>
                {parant.map((obj) => (
                  <option 
                    value={obj._id} 
                    selected={data?.parant?._id === obj._id || data?.parant === obj._id} 
                    key={obj._id}
                  >
                    {obj.name}
                  </option>
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
                onChange={(e) => {
                  const subId = e.target.value;
                  getSubSubCategory(subId);
                }}
                required
              >
                <option value="">Select Sub Category</option>
                {subCategoryList.map((obj) => (
                  <option 
                    value={obj._id} 
                    selected={data?.subCategory?._id === obj._id || data?.subCategory === obj._id} 
                    key={obj._id}
                  >
                    {obj.name}
                  </option>
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
              >
                <option value="">Select Sub Sub Category</option>
                {subSubcategoryList.map((obj) => (
                  <option 
                    value={obj._id} 
                    selected={data?.subSubCategory?._id === obj._id || data?.subSubCategory === obj._id} 
                    key={obj._id}
                  >
                    {obj.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Material */}
            <div>
              <label htmlFor="material" className="text-gray-700 font-medium block mb-1">Select Material</label>
              <select
                id="material"
                name="materials"
                multiple
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {materialList.map((obj) => (
                  <option 
                    value={obj._id}
                    selected={data?.materials?.find((materialObj) => (materialObj._id || materialObj) === obj._id)}
                    key={obj._id}
                  >
                    {obj.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Color */}
            <div>
              <label htmlFor="color" className="text-gray-700 font-medium block mb-1">Select Color</label>
              <select
                id="color"
                multiple
                name="colors"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {colorList.map((obj) => (
                  <option 
                    value={obj._id}
                    selected={data?.colors?.find((colorObj) => (colorObj._id || colorObj) === obj._id)}
                    key={obj._id}
                  >
                    {obj.name}
                  </option>
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
              >
                <option value="">Nothing Selected</option>
                <option selected={data?.productType === "Features"} value="Features">Features</option>
                <option selected={data?.productType === "New Arrivals"} value="New Arrivals">New Arrivals</option>
                <option selected={data?.productType === "On Sale"} value="On Sale">On Sale</option>
              </select>
            </div>

            {/* Is Best Selling */}
            <div>
              <label htmlFor="isBestSelling" className="text-gray-700 font-medium block mb-1">Is Best Selling</label>
              <select
                id="isBestSelling"
                name="bestSelling"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Nothing Selected</option>
                <option selected={data?.bestSelling === true || data?.bestSelling === "true" || data?.bestSelling === 1} value="true">Yes</option>
                <option selected={data?.bestSelling === false || data?.bestSelling === "false" || data?.bestSelling === 0} value="false">No</option>
              </select>
            </div>

            {/* Is UpSell */}
            <div>
              <label htmlFor="isUpSell" className="text-gray-700 font-medium block mb-1">Is UpSell</label>
              <select
                id="isUpSell"
                name="upSale"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Nothing Selected</option>
                <option selected={data?.upSale === true || data?.upSale === "true" || data?.upSale === 1} value="true">Yes</option>
                <option selected={data?.upSale === false || data?.upSale === "false" || data?.upSale === 0} value="false">No</option>
              </select>
            </div>

            {/* Actual Price */}
            <div>
              <label htmlFor="actualPrice" className="text-gray-700 font-medium block mb-1">Actual Price</label>
              <input
                type="number"
                id="actualPrice"
                defaultValue={data?.actualPrice}
                name="actualPrice"
                placeholder="Actual Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                defaultValue={data?.salePrice}
                placeholder="Sale Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Total In Stocks */}
            <div>
              <label htmlFor="totalInStocks" className="text-gray-700 font-medium block mb-1">Total In Stocks</label>
              <input
                type="number"
                id="totalInStocks"
                name="stock"
                defaultValue={data?.stock}
                placeholder="Total In Stocks"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                defaultValue={data?.order}
                placeholder="Order"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            defaultValue={data?.description}
            rows="5"
            placeholder="Product Description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
         <button
  type="submit"
  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-200 cursor-pointer"
>
  {id ? 'Update Product' : 'Create Product'}
</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;