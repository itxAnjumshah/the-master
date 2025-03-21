import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import turkeyImg from "../assets/turkeyflag.jpg";
import saudiaImg from "../assets/saudiaflag.jpg";
import omanImg from "../assets/omanflag.jpg";

export default function Client() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id="client" className="bg-gray-900 py-12">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-yellow-400 mb-10" data-aos="fade-up">
          Our Clients
        </h2>

        {/* Client Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Turkey */}
          <div
            className="p-6 rounded-xl shadow-lg bg-gradient-to-b from-white to-gray-200 border border-gray-300"
            data-aos="fade-up"
          >
            <img
              src={turkeyImg}
              alt="Turkey"
              className="w-full h-56 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Turkey</h3>
          </div>

          {/* Saudi Arabia */}
          <div
            className="p-6 rounded-xl shadow-lg bg-gradient-to-b from-white to-gray-200 border border-gray-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              src={saudiaImg}
              alt="Saudi Arabia"
              className="w-full h-56 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Saudi Arabia</h3>
          </div>

          {/* Oman */}
          <div
            className="p-6 rounded-xl shadow-lg bg-gradient-to-b from-white to-gray-200 border border-gray-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <img
              src={omanImg}
              alt="Oman"
              className="w-full h-56 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Oman</h3>
          </div>
        </div>
      </div>
    </section>
  );
}