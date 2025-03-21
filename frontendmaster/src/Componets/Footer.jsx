import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  // Scroll Function
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-8 w-full mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Section - Logo & Name */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-wide text-blue-400">
            The Master
          </span>
        </div>

        {/* Center Section - Navigation Links */}
        <ul className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
          {["Home", "About", "Services", "Certificate", "Contact"].map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleScroll(item.toLowerCase())}
                className="hover:text-blue-400 transition duration-300"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Section - Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-xl hover:text-blue-400 transition">
            <FaFacebook />
          </a>
          <a href="#" className="text-xl hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="#" className="text-xl hover:text-blue-400 transition">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom Text */}
      <div className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} The Master. All rights reserved.
      </div>
    </footer>
  );
}