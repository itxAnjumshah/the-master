import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPlus, FaList, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddCertificate from "../Componets/Addcertifcate";
import AllCertificates from "../Componets/AllCertificates";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("add");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Overlay for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Hamburger Button - Visible on all screen sizes */}
      <button
        className="fixed top-4 right-4 text-white bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-full z-20 focus:outline-none shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center py-8 shadow-2xl rounded-r-3xl transition-all duration-500 z-20 h-full ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full px-6 mb-8">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            The Master
          </h2>
        </div>
        
        <nav className="w-full flex-1 px-4">
          <ul className="space-y-2">
            <li
              className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-300 rounded-xl m-2 text-lg ${
                activeTab === "add" 
                  ? "bg-orange-500 text-white shadow-lg" 
                  : "hover:bg-gray-700 hover:shadow-md"
              }`}
              onClick={() => {
                setActiveTab("add");
                setIsSidebarOpen(false);
              }}
            >
              <FaPlus className="text-xl" /> 
              <span className="font-medium">Add Certificate</span>
            </li>
            <li
              className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-300 rounded-xl m-2 text-lg ${
                activeTab === "all" 
                  ? "bg-orange-500 text-white shadow-lg" 
                  : "hover:bg-gray-700 hover:shadow-md"
              }`}
              onClick={() => {
                setActiveTab("all");
                setIsSidebarOpen(false);
              }}
            >
              <FaList className="text-xl" /> 
              <span className="font-medium">All Certificates</span>
            </li>
          </ul>
        </nav>
        
        {/* Logout Button */}
        <div className="w-full px-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 text-red-400 hover:bg-red-900 hover:text-white transition-all duration-300 rounded-xl m-2 font-medium text-lg hover:shadow-lg"
          >
            <FaSignOutAlt className="text-xl" /> 
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white shadow-lg rounded-l-3xl overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b-2 border-orange-500 pb-3 text-center md:text-left" data-aos="fade-down">
          Dashboard
        </h1>
        <section id="certificate-section" className="p-8 bg-gray-50 rounded-2xl shadow-md" data-aos="fade-up">
          {activeTab === "add" && <AddCertificate />}
          {activeTab === "all" && <AllCertificates />}
        </section>
      </main>
    </div>
  );
}

