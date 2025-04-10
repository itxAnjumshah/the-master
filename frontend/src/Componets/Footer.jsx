import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  // Scroll or Navigate Function
  const handleNavigation = (id) => {
    if (id === "certificate") {
      navigate("/certificate");
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 w-full mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Section - Logo & Name */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-blue-400">
            The Master
          </span>
        </div>

        {/* Center Section - Navigation Links */}
        <ul className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
          {["Home", "About", "Services", "Certificate", "Contact"].map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleNavigation(item.toLowerCase())}
                className="text-gray-300 hover:text-blue-400 transition duration-300 text-lg font-medium"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Section - Social Media Links */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="text-2xl text-gray-400 hover:text-blue-400 transition duration-300"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6 mx-6"></div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} The Master. All rights reserved.
      </div>
    </footer>
  );
}
