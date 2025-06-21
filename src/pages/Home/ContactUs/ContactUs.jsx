import React from "react";
import banner2 from "../../../assets/banner1.avif";
const ContactUs = () => {
  return (
    <div
      className="hero min-h-screen bg-fixed "
      style={{
        backgroundImage: `url(${banner2})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content w-full text-neutral-content p-0">
        <div className="w-full md:max-w-lg bg-black bg-opacity-50 py-10 px-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            Contact Us
          </h2>

          <form className="w-full">
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-white rounded-lg mt-2 focus:outline-none focus:ring-1 focus:ring-white  bg-transparent text-white"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-white rounded-lg mt-2 focus:outline-none focus:ring-1 focus:ring-white  bg-transparent text-white"
                placeholder="Enter your email"
              />
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-3 border border-white rounded-lg mt-2 focus:outline-none focus:ring-1 focus:ring-white  bg-transparent text-white"
                rows="5"
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="w-full py-3 bg-white text-primaryColor rounded-lg hover:bg-[#e03a38] hover:text-white transition duration-300 font-semibold">
              Submit
            </button>
          </form>

          <p className="text-center mt-6 text-white">
            Or call us at:{" "}
            <a href="tel:+1234567890" className="hover:underline">
              +123-456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
