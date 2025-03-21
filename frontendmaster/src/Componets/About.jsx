import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import aboutImg from "../assets/master2logo.jpg"; 
import { FaAward, FaCogs, FaTools } from 'react-icons/fa';

export default function About() {
  
  // Initialize AOS Animation
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="about" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
        
        {/* Image Section (Left Side) */}
        <div className="w-full md:w-1/2 flex justify-center" data-aos="fade-right">
          <img
            src={aboutImg}
            alt="About The Master Training Center"
            className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg border-4 border-yellow-400"
          />
        </div>

        {/* Content Section (Right Side) */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-10" data-aos="fade-left">
          <h2 className="text-4xl font-extrabold text-yellow-400 mb-6">About Us</h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            The Master Training Center provides <strong>professional heavy machinery training</strong>, ensuring that you master the skills required for handling dozers, loaders, cranes, and other construction vehicles. Our expert trainers and hands-on approach make learning easy and effective.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4" data-aos="zoom-in">
              <FaCogs className="text-yellow-400 text-4xl" />
              <p className="text-lg text-gray-300">Advanced Equipment Training</p>
            </div>
            <div className="flex items-center space-x-4" data-aos="zoom-in">
              <FaTools className="text-yellow-400 text-4xl" />
              <p className="text-lg text-gray-300">Practical Hands-On Experience</p>
            </div>
            <div className="flex items-center space-x-4" data-aos="zoom-in">
              <FaAward className="text-yellow-400 text-4xl" />
              <p className="text-lg text-gray-300">Certified & Experienced Trainers</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
