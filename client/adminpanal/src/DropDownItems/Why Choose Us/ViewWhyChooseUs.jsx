import React, { useState, useRef, useEffect } from 'react';
import { IoFilter, IoPencil } from 'react-icons/io5';

function ViewTestimonialTable() {
  const testimonials = [
    { id: 1, title: 'Neil Sims', imageUrl: 'https://via.placeholder.com/40', description: 'CEO Of SunPark', order: 1, status: 'Active' },
    { id: 2, title: 'Jane Doe',  imageUrl: 'https://via.placeholder.com/40', description: 'Founder of Acme', order: 2, status: 'Deactive' },
  ];

  // search toggle + state
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);

  // autofocus when opened
  useEffect(() => {
    if (showSearch && searchRef.current) searchRef.current.focus();
  }, [showSearch]);

  const filtered = testimonials.filter((t) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.trim().toLowerCase();
    return (t.title && t.title.toLowerCase().includes(q)) || (t.description && t.description.toLowerCase().includes(q));
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* ===== Search at the very top (hidden by default) ===== */}
      <div className={`mb-4 transition-all duration-200 ${showSearch ? 'max-h-40' : 'max-h-0 overflow-hidden'}`}>
        {showSearch && (
          <div className="flex items-center gap-2">
            <input
              ref={searchRef}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search testimonials by title or description..."
              className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setSearchTerm('')}
              className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              title="Clear"
            >
              Clear
            </button>
            <button
              onClick={() => { setShowSearch(false); setSearchTerm(''); }}
              className="px-3 py-2 bg-red-100 rounded-md hover:bg-red-200"
              title="Close"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* ===== Header / Buttons ===== */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">View Testimonial</h2>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSearch(s => !s)}
            className={`flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
              showSearch ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            aria-pressed={showSearch}
            aria-label="Toggle search"
          >
            <IoFilter className="text-lg" />
            <span className="mx-2 hidden sm:inline">Filter</span>
          </button>

          <button className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-200">
            Change Status
          </button>
          <button className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200">
            Delete
          </button>
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No testimonials found.</td>
              </tr>
            ) : (
              filtered.map((testimonial) => (
                <tr key={testimonial.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{testimonial.title}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={testimonial.imageUrl} alt={`${testimonial.title} image`} className="h-10 w-10 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${testimonial.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{testimonial.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200"><IoPencil className="text-lg" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewTestimonialTable;
