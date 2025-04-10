import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTruck, FaWrench, FaUsers, FaShieldAlt, FaGraduationCap, FaIndustry, FaTools, FaHardHat, FaCogs, FaHammer, FaScrewdriver, FaClipboardCheck, FaBriefcase, FaGlobe } from "react-icons/fa";

// Importing service images
import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
import service6 from '../assets/service6.jpg';
import service7 from "../assets/img3.jpg";
import service8 from "../assets/img3.jpg";
import service9 from "../assets/img1.jpg";
import service10 from "../assets/img2.jpg";
import service12 from "../assets/img4.jpg";
import service13 from "../assets/img5.jpg";
import service14 from "../assets/img6.jpg";

// Services Data
const services = [
  { image: service1, title: "Heavy Machinery Training", icon: <FaTruck /> },
  { image: service2, title: "Mechanical & Repairing", icon: <FaWrench /> },
  { image: service3, title: "Hands-on Workshops", icon: <FaUsers /> },
  { image: service4, title: "Safety & Compliance", icon: <FaShieldAlt /> },
  { image: service5, title: "Certification Programs", icon: <FaGraduationCap /> },
  { image: service6, title: "Industrial Training", icon: <FaIndustry /> },
  { image: service8, title: "Construction Safety", icon: <FaHardHat /> },
  { image: service9, title: "Automotive Engineering", icon: <FaCogs /> },
  { image: service10, title: "Carpentry & Woodwork", icon: <FaHammer /> },
  { image: service12, title: "Quality Control & Inspection", icon: <FaClipboardCheck /> },
  { image: service13, title: "Professional Career Training", icon: <FaBriefcase /> },
  { image: service14, title: "International Training Programs", icon: <FaGlobe /> },
];

export default function Service() {
  
  // ✅ AOS Initialization
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="services" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-8" data-aos="fade-up">
          Our Services
        </h2>
        <p className="text-lg text-gray-300 mb-12" data-aos="fade-up">
          Explore our top-notch training programs and services designed for your success.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-md border border-white/20"
              data-aos="zoom-in"
            >
              <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <div className="flex justify-center text-yellow-400 text-4xl mb-4">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-yellow-400">{service.title}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
