"use client";
import React, { useState } from "react";
import { Send, Check } from "lucide-react";

const ContactSection = () => {
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phoneNumber: "",
  subject: "",
  message: "",
  hasReadPrivacy: false,
});


  const [focusedField, setFocusedField] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    // Fake success simulation
    setTimeout(() => {
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-0 rounded-[2rem] overflow-hidden bg-white shadow-2xl shadow-rose-900/5 border border-gray-100">
        
        {/* LEFT SIDE - FORM */}
        <div className="w-full md:w-3/5 p-8">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
               Thank You for Reaching Out 💖
              </h2>
              <p className="text-gray-600">
                Our GlowLuxe support team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
               We’re Here to Help
              </h2>

              {/* INPUT GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* FULL NAME */}
                <div className="relative group">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField("")}
                    className="w-full p-3 bg-gray-50 border-b-2 border-gray-100 rounded-t-lg focus:outline-none focus:border-[#916a6b] transition-colors"
                    required
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 ${
                      focusedField === "fullName" || formData.fullName
                        ? "-top-6 text-sm text-[#916a6b]"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Full Name*
                  </label>
                </div>

                {/* EMAIL */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    className="w-full p-3 bg-gray-50 border-b-2 border-gray-100 rounded-t-lg focus:outline-none focus:border-[#916a6b] transition-colors"
                    required
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 ${
                      focusedField === "email" || formData.email
                        ? "-top-6 text-sm text-[#916a6b]"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Email Address*
                  </label>
                </div>

                {/* COMPANY */}
                <div className="relative group">
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("companyName")}
                    onBlur={() => setFocusedField("")}
                    className="w-full p-3 bg-gray-50 border-b-2 border-gray-100 rounded-t-lg focus:outline-none focus:border-[#916a6b] transition-colors"
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 ${
                      focusedField === "companyName" || formData.companyName
                        ? "-top-6 text-sm text-[#916a6b]"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Company Name
                  </label>
                </div>

                {/* PHONE */}
                <div className="relative group">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("phoneNumber")}
                    onBlur={() => setFocusedField("")}
                    className="w-full p-3 bg-gray-50 border-b-2 border-gray-100 rounded-t-lg focus:outline-none focus:border-[#916a6b] transition-colors"
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 ${
                      focusedField === "phoneNumber" || formData.phoneNumber
                        ? "-top-6 text-sm text-[#916a6b]"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              {/* MESSAGE */}
              <div className="relative group">
                <textarea
                  name="aboutProject"
                  value={formData.aboutProject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("aboutProject")}
                  onBlur={() => setFocusedField("")}
                  className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl h-32 focus:outline-none focus:border-[#916a6b] resize-none transition-colors"
                  required
                />
                <label
                  className={`absolute left-3 transition-all duration-200 ${
                    focusedField === "aboutProject" || formData.aboutProject
                      ? "-top-6 text-sm text-[#916a6b]"
                      : "top-3 text-gray-400"
                  }`}
                >
                  How Can We Help You?*
                </label>
              </div>

              {/* CHECKBOXES */}
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasReadPrivacy"
                    checked={formData.hasReadPrivacy}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I have read Privacy Notice*
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptsMarketing"
                    checked={formData.acceptsMarketing}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm text-gray-600">
                    I agree to receive marketing materials
                  </span>
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-[#916a6b] text-white py-4 rounded-xl hover:bg-[#7a595a] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] font-bold flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* RIGHT SIDE - STATIC INFO */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-[#FAF9F6] to-[#f4eeee] p-12 flex flex-col justify-center border-l border-gray-50">
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#916a6b]/10 rounded-[1.5rem] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src="https://res.cloudinary.com/dwau5poqz/image/upload/v1771519314/0oH-Oa2QuL_BkD9rg6FFbF1uZ5B0RxH1N4iFpxhbDdVUVrQ3QPSCuCdS0T99u2q6DCcZl1QLm6TORuNtvHCPU8LGGSKrRnn-q3pKtwiv_L8_hpc73o.jpg"
                alt="Contact illustration"
                className="relative w-full h-80 object-cover rounded-[1.5rem] shadow-lg  transition-all duration-500"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-[#916a6b] tracking-tight">
      Need Help With Your Glow?
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">
               Have questions about your order or our beauty tools? 
  Our support team is here to assist you quickly and professionally.
              </p>
            </div>
            
            <div className="pt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/50 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Response Time</p>
                    <p className="text-[#916a6b] font-bold">Under 24h</p>
                </div>
                <div className="p-4 bg-white/50 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Availability</p>
                    <p className="text-[#916a6b] font-bold">Mon - Fri</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
