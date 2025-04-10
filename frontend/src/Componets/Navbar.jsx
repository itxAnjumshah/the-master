import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../assets/masterlogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const path = location.pathname.substring(1);
    if (path && path !== "certificate") {
      setActive(path);
      scrollToSection(path);
    }
  }, [location.pathname]); // Jab bhi route change ho, scroll kare

  const menuItems = [
    { name: "Home", id: "home", path: "/" },
    { name: "About", id: "about", path: "/about" },
    { name: "Services", id: "services", path: "/services" },
    { name: "Our Clients", id: "client", path: "/client" },
    { name: "Certificate", id: "certificate", path: "/certificate" }, // Separate Page
    { name: "Contact", id: "contact", path: "/contact" },
  ];

  const handleNavigation = (id, path) => {
    setActive(id);

    if (id === "certificate") {
      navigate(path); // Certificate alag page pe open hoga
    } else {
      navigate("/"); // Always go to the Home page first
      setTimeout(() => {
        scrollToSection(id);
      }, 100); // Smooth scrolling
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="bg-gray-900 text-white fixed w-full shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 h-16" data-aos="fade-down">
        
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation("home", "/")}>
          <img src={logo} alt="Logo" className="h-[60px] w-auto" />
          <span className="text-2xl font-semibold text-blue-400 font-mono">THE MASTER</span>
        </div>

        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.id} data-aos="zoom-in">
              <button
                className={`cursor-pointer px-4 py-2 rounded-lg transition ${
                  active === item.id ? "bg-blue-500 text-white" : "hover:text-blue-400"
                }`}
                onClick={() => handleNavigation(item.id, item.path)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl focus:outline-none z-50">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`absolute top-16 left-0 w-full bg-gray-900 text-white transition-all duration-300 ease-in-out transform ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        } md:hidden`}
      >
        <ul className="text-center py-6 space-y-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`cursor-pointer block py-2 rounded-lg transition ${
                  active === item.id ? "bg-blue-500 text-white" : "hover:text-blue-400"
                }`}
                onClick={() => {
                  handleNavigation(item.id, item.path);
                  setIsOpen(false);
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
