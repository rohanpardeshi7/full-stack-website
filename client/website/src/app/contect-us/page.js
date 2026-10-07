"use client";
import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import Breadcrumb from "../common/BreadCrumb";


export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    console.log(formData);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-16">
    <Breadcrumb 
      title="Contact Us" 
      links={[{ label: "Contact Us" }]} 
    />

      {/* 2. Main Content Wrapper */}
      <div className="max-w-[1320px] mx-auto px-6 py-10 md:py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT COLUMN: Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-black mb-2">Get In Touch</h2>
            <p className="text-sm text-gray-500 mb-6">We are here to help you. Please fill out the form below.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c09578] text-sm text-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c09578] text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c09578] text-sm text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c09578] text-sm text-black resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#2d2a26] text-white px-8 py-3 font-semibold text-sm tracking-wider uppercase hover:bg-[#c09578] transition-colors duration-300 rounded-md shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Contact Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-md border border-gray-200 flex items-start space-x-4 shadow-sm">
                <div className="p-3 bg-gray-50 text-[#c09578] rounded-md border border-gray-100">
                  <FiPhone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm uppercase tracking-wider">Call Us</h4>
                  <p className="text-sm text-gray-600 mt-1">+91-9781234560</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-md border border-gray-200 flex items-start space-x-4 shadow-sm">
                <div className="p-3 bg-gray-50 text-[#c09578] rounded-md border border-gray-100">
                  <FiMail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm uppercase tracking-wider">Email Us</h4>
                  <p className="text-sm text-gray-600 mt-1 break-all">furniture@gmail.com</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-md border border-gray-200 flex items-start space-x-4 shadow-sm">
                <div className="p-3 bg-gray-50 text-[#c09578] rounded-md border border-gray-100">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm uppercase tracking-wider">Office</h4>
                  <p className="text-sm text-gray-600 mt-1">Claritas est etiam processus dynamicus, India</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-md border border-gray-200 flex items-start space-x-4 shadow-sm">
                <div className="p-3 bg-gray-50 text-[#c09578] rounded-md border border-gray-100">
                  <FiClock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm uppercase tracking-wider">Open Hours</h4>
                  <p className="text-sm text-gray-600 mt-1">09:00 AM - 07:00 PM</p>
                </div>
              </div>
            </div>

            <div className="w-full h-[250px] bg-gray-200 rounded-md overflow-hidden border border-gray-200 shadow-sm">

                    
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29475.86798700867!2d75.77871611435545!3d22.561013054390433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1781599098964!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}