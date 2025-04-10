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
    <div className="flex h-screen bg-gray-100">
      {/* Overlay for sidebar on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Hamburger Button - Visible on all screen sizes */}
      <button
        className="absolute top-4 left-4 text-white bg-gray-900 p-3 rounded z-20 focus:outline-none md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed w-64 bg-gray-900 text-white flex flex-col items-center py-6 shadow-xl rounded-r-2xl transition-transform duration-300 z-20 h-full ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">The Master</h2>
        <nav className="w-full flex-1">
          <ul>
            <li
              className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all duration-300 rounded-lg m-2 text-base text-center md:text-left justify-center md:justify-start ${
                activeTab === "add" ? "bg-orange-500 text-white" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveTab("add");
                setIsSidebarOpen(false);
              }}
            >
              <FaPlus /> Add Certificate
            </li>
            <li
              className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all duration-300 rounded-lg m-2 text-base text-center md:text-left justify-center md:justify-start ${
                activeTab === "all" ? "bg-orange-500 text-white" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveTab("all");
                setIsSidebarOpen(false);
              }}
            >
              <FaList /> All Certificates
            </li>
          </ul>
        </nav>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-6 py-3 text-red-400 hover:bg-red-900 hover:text-white transition-all duration-300 rounded-lg m-2 w-full justify-center"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-lg rounded-l-2xl overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-700 border-b-2 pb-2 text-center md:text-left" data-aos="fade-down">
          Dashboard
        </h1>
        <section id="certificate-section" className="p-6 bg-gray-50 rounded-lg shadow-md" data-aos="fade-up">
          {activeTab === "add" && <AddCertificate />}
          {activeTab === "all" && <AllCertificates />}
        </section>
        {/* <button
          onClick={() => {
            const certificateContent = document.querySelector('.certificate-content');
            if (certificateContent) {
              const printWindow = window.open('', '_blank');
              printWindow.document.write('<html><head><title>Print Certificate</title>');
              // Include styles
              const styles = Array.from(document.styleSheets)
                .map(styleSheet => {
                  try {
                    return Array.from(styleSheet.cssRules)
                      .map(rule => rule.cssText)
                      .join('');
                  } catch (e) {
                    return '';
                  }
                })
                .join('');
              printWindow.document.write(`<style>${styles}</style>`);
              printWindow.document.write('</head><body>');
              printWindow.document.write(certificateContent.innerHTML);
              printWindow.document.write('</body></html>');
              printWindow.document.close();
              printWindow.focus();
              printWindow.print();
              printWindow.close();
            } else {
              alert('Certificate content not found.');
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors"
        >
          Print Certificates
        </button> */}
      </main>
    </div>
  );
}

