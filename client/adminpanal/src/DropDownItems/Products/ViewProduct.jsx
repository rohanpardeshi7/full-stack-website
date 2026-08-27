import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoTrash, IoPencil, IoInformationCircleOutline, IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

function ProductItemsTable() {
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([]);
  const [path, setPath] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // Detail modal ke liye state

  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  const getProduct = () => {
    axios.get(`${apibaseurl}product/view`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          setData(Array.isArray(finalRes.data) ? finalRes.data : []);
          setPath(finalRes.path || '');
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      {/* Header Section */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          Product Items
        </h2>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S. No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thumbnail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                {/* Checkbox */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer" />
                </td>

                {/* S.No. */}
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {index + 1}
                </td>

                {/* Image */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={path + product.image}
                    alt={product.name}
                    className="h-14 w-14 object-cover rounded-md border border-gray-200 shadow-sm"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/60x60?text=No+Image";
                    }}
                  />
                </td>

                {/* Product Name & Quick Detail Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold text-gray-900">{product.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline w-max cursor-pointer"
                    >
                      <IoInformationCircleOutline className="mr-1 text-sm" /> View All Details
                    </button>
                  </div>
                </td>

                {/* Parent Category & Nested Details */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{product.parant?.name || 'N/A'}</span>
                  {product.subCategory?.name && (
                    <span className="text-xs block text-gray-500">Sub: {product.subCategory.name}</span>
                  )}
                </td>

                {/* Description */}
                <td className="px-6 py-4 max-w-xs text-sm text-gray-500">
                  <p className="line-clamp-2">{product.description || 'No description available'}</p>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'Active' || product.status === true
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.status ? 'Active' : 'Inactive'}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <Link to={`/edit-product/${product._id}`}>
                    <button 
                      title="Edit"
                      className="p-1 text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50 rounded transition-colors"
                    >
                      <IoPencil className="text-lg" />
                    </button>
                    </Link>
                    <button 
                      title="Delete"
                      className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                    >
                      <IoTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Detail Popup Modal --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Product Full Details</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-4 text-sm text-gray-700">
              <div className="flex gap-4 items-center">
                <img
                  src={path + selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-20 w-20 object-cover rounded-lg border"
                />
                <div>
                  <h4 className="font-semibold text-base text-gray-900">{selectedProduct.name}</h4>
                  <p className="text-gray-500">Order Seq: {selectedProduct.order}</p>
                  <p className="text-gray-500">Type: {selectedProduct.productType || 'Standard'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div><span className="font-semibold">Parent:</span> {selectedProduct.parant?.name || 'N/A'}</div>
                <div><span className="font-semibold">Sub Cat:</span> {selectedProduct.subCategory?.name || 'N/A'}</div>
                <div><span className="font-semibold">Actual Price:</span> ₹{selectedProduct.actualPrice}</div>
                <div><span className="font-semibold">Sale Price:</span> ₹{selectedProduct.salePrice}</div>
                <div><span className="font-semibold">Stock:</span> {selectedProduct.stock}</div>
                <div><span className="font-semibold">Color:</span> {selectedProduct.colors?.name || 'N/A'}</div>
              </div>

              <div>
                <span className="font-semibold block mb-1">Description:</span>
                <p className="text-gray-600 bg-gray-50 p-3 rounded border border-gray-100 leading-relaxed">
                  {selectedProduct.description || 'No description provided.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductItemsTable;