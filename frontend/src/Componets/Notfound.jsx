import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Notfound() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-4">
      <div className="text-center">
        <h1
          className="text-9xl font-extrabold text-red-300 mb-4"
          data-aos="zoom-in"
        >
          404
        </h1>
        <h2
          className="text-3xl md:text-4xl font-semibold mb-6"
          data-aos="fade-up"
        >
          Oops! Page Not Found
        </h2>
        <p
          className="text-lg max-w-xl mx-auto mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track!
        </p>
        <a
          href="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Go Back Home
        </a>
      </div>
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <p className="text-sm">Designed with ❤️ using Tailwind CSS</p>
      </div>
    </div>
  );
}
