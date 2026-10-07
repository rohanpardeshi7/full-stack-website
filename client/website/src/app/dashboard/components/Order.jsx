import React from 'react'

export default function Order() {
  return (
    <div>
  <div className="space-y-6">
    {/* Main Title */}
    <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">
      Orders
    </h2>

    {/* Responsive Table Wrapper */}
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 text-center text-sm font-medium">
        
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-50 border-b border-gray-300 text-gray-900 font-serif font-bold">
            <th className="py-4 px-4 border-r border-gray-200">Order</th>
            <th className="py-4 px-4 border-r border-gray-200">Date</th>
            <th className="py-4 px-4 border-r border-gray-200">Status</th>
            <th className="py-4 px-4 border-r border-gray-200">Total</th>
            <th className="py-4 px-4">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-gray-800">
          
          {/* Row 1 */}
          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="py-4 px-4 font-bold border-r border-gray-200">1</td>
            <td className="py-4 px-4 font-bold text-gray-700 border-r border-gray-200">May 10, 2018</td>
            <td className="py-4 px-4 font-bold text-gray-700 border-r border-gray-200">Completed</td>
            <td className="py-4 px-4 text-gray-600 border-r border-gray-200">Rs. 25.00 For 1 Item</td>
            <td className="py-4 px-4">
              <button className="text-[#c09578] font-bold hover:underline focus:outline-none">
                View
              </button>
            </td>
          </tr>

          {/* Row 2 */}
          <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="py-4 px-4 font-bold border-r border-gray-200">2</td>
            <td className="py-4 px-4 font-bold text-gray-700 border-r border-gray-200">May 10, 2018</td>
            <td className="py-4 px-4 font-bold text-gray-700 border-r border-gray-200">Processing</td>
            <td className="py-4 px-4 text-gray-600 border-r border-gray-200">Rs. 17.00 For 1 Item</td>
            <td className="py-4 px-4">
              <button className="text-[#c09578] font-bold hover:underline focus:outline-none">
                View
              </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</div>
  )
}
