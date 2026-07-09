import React, { useState } from 'react';

function AddCountryForm() {
  // State for form fields
  const [countryName, setCountryName] = useState('');
  const [order, setOrder] = useState('');

  // --- Form Submission ---
  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real application, you'd collect all this data and send it to your API
    const formData = {
      countryName,
      order: parseInt(order, 10), // Convert order to a number
    };

    console.log('Submitting Country Data:', formData);

    alert('Country Added (Check console for data)');
    // Optionally, reset form fields here
    setCountryName('');
    setOrder('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto my-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Add Country</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Country Name */}
          <div>
            <label htmlFor="countryName" className="text-gray-700 font-medium block mb-1">
              Country Name
            </label>
            <input
              type="text"
              id="countryName"
              placeholder="Country Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
            />
          </div>

          {/* Order */}
          <div>
            <label htmlFor="order" className="text-gray-700 font-medium block mb-1">
              Order
            </label>
            <input
              type="number"
              id="order"
              placeholder="Order"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Add Country
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCountryForm;