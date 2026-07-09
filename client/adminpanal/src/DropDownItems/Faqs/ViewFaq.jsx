import React from 'react';
import { IoPencil } from 'react-icons/io5'; // Using Io5 for the pencil icon

function ViewFaqTable() {
  // Dummy data for demonstration, matching the structure in the screenshot
  const faqs = [
    {
      id: 1,
      question: 'Lorem ipsum dolor sit amet, consectetur, adipisicing elit.',
      answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae adipisci explicabo molestias possimus quidem obcaecati deserunt vel, officiis, nobis facilis earum quaerat aut esse consequuntur ab praesentium eius suscipit natus!',
      order: 1,
      status: 'Active',
    },
    {
      id: 2,
      question: 'Neil Sims', // This seems like a placeholder from another table, adjusting for FAQ content
      answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae debitis hic, voluptatem optio laboriosam, delectus, reiciendis esse vitae eos nostrum? Praesentium provident doloremque debitis, fuga quod quidem doloribus. Aliquid.',
      order: 1,
      status: 'Deactive',
    },
    // Add more dummy FAQ data as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        {/* Keeping the title as "View Country" as per screenshot, but be aware it's for FAQs */}
        <h2 className="text-2xl font-semibold text-gray-800">
          View Country
        </h2>
        <div className="flex items-center space-x-3">
          {/* No filter button seen in screenshot, keeping as per screenshot */}
          <button className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-200">
            Change Status
          </button>
          <button className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200">
            Delete
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Answer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                Action
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                </td>
                <td className="px-6 py-4 max-w-xs truncate"> {/* Added max-w-xs and truncate for long questions */}
                  <div className="text-sm font-medium text-gray-900">
                    {faq.question}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-sm truncate"> {/* Added max-w-sm and truncate for long answers */}
                  <div className="text-sm text-gray-500">
                    {faq.answer}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {faq.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      faq.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {faq.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                    <IoPencil className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewFaqTable;