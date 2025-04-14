import React from "react";
import profilePic from "../assets/service6.jpg";
import masterlogo2 from "../assets/master2logo.jpg";
import { FaCertificate, FaMedal, FaAward, FaStar } from "react-icons/fa";

const Certificatedesign = ({ 
  name, 
  course, 
  date, 
  certificateNumber, 
  proficiencyScore, 
  grade, 
  fatherName,
  image 
}) => {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-3xl min-h-[450px] bg-yellow-400 mx-auto shadow-2xl overflow-hidden border-6 border-yellow-500 rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out px-4 sm:px-8 py-4 sm:py-6">
        {/* Certificate Border Layer */}
        <div className="absolute inset-3 sm:inset-4 border-2 border-yellow-500 opacity-50 rounded-lg"></div>

        {/* Decorative Icons */}
        <div className="absolute top-3 left-3 bg-amber-100 p-2 rounded-full shadow-md">
          <FaCertificate className="text-amber-600 text-lg" />
        </div>
        <div className="absolute top-3 right-3 bg-blue-100 p-2 rounded-full shadow-md">
          <FaMedal className="text-blue-600 text-lg" />
        </div>
        <div className="absolute bottom-3 left-3 bg-blue-100 p-2 rounded-full shadow-md">
          <FaAward className="text-blue-600 text-lg" />
        </div>
        <div className="absolute bottom-3 right-3 bg-amber-100 p-2 rounded-full shadow-md">
          <FaStar className="text-amber-600 text-lg" />
        </div>

        {/* Background Watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={masterlogo2} alt="Master Logo" className="w-full h-full object-cover" />
        </div>

        {/* Certificate Content */}
        <div className="relative z-10 text-center h-full">
          {/* Roll & Registration Number */}
          <div className="flex justify-between text-xs sm:text-sm mb-3 font-semibold">
            <div className="bg-gray-200 px-2 py-1 rounded-full text-black">Roll No: <span className="text-black">{certificateNumber}</span></div>
            <div className="bg-gray-200 px-2 py-1 rounded-full text-black">Registration No: <span className="text-black">580123</span></div>
          </div>

          {/* Header */}
          <h1 className="text-lg sm:text-2xl font-bold text-black tracking-wide font-serif uppercase">The Master Technical Training Center</h1>
          <div className="mt-2 mb-3 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto w-1/3"></div>
          <h2 className="text-md sm:text-xl font-semibold text-amber-700 font-serif">Certificate of Proficiency</h2>
          <p className="italic text-xs text-black mt-1">*We build skill and empower*</p>

          {/* Profile Image & Student Info */}
          <div className="flex flex-col items-center my-4">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-amber-600 overflow-hidden shadow-lg">
              <img 
                src={image || profilePic} 
                alt="Student" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-black mt-2 font-serif border-b-2 border-black px-4 pb-1">{name}</h3>
            <p className="text-black mt-1 text-xs sm:text-md">S/o <span className="font-medium border-b border-black px-1">{fatherName}</span></p>
            <div className="mt-2 px-4 py-1 bg-blue-200 rounded-full border border-blue-300 shadow-sm">
              <p className="text-sm sm:text-md font-bold text-blue-800">{course}</p>
            </div>
          </div>

          {/* Certification Statement */}
          <p className="text-xl sm:text-md leading-relaxed text-black font-bold mb-4 px-4 sm:px-8">
            has successfully completed the <span className="font-semibold text-green-700">{course}</span> training program<br />
            with distinction and is hereby recognized as a qualified professional.
          </p>

          {/* Proficiency Score & Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 px-4 sm:px-8">
            <div className="text-center bg-amber-100 py-2 rounded-lg border border-amber-200 shadow-md">
              <div className="text-xs text-black mb-1">PROFICIENCY SCORE</div>
              <div className="text-lg sm:text-xl font-bold text-amber-700">{proficiencyScore}%</div>
            </div>
            <div className="text-center bg-blue-100 py-2 rounded-lg border border-blue-200 shadow-md">
              <div className="text-xs text-black mb-1">GRADE</div>
              <div className="text-lg sm:text-xl font-bold text-blue-700">{grade}</div>
            </div>
          </div>

          {/* Date of Issue */}
          <div className="text-center mb-4">
            <div className="text-xs text-black mb-1">DATE OF ISSUE</div>
            <div className="font-medium text-black">{formattedDate}</div>
          </div>

          {/* Signatures */}
          <div className="flex justify-center items-end space-x-6 sm:space-x-16 relative">
            <div className="text-center">
              <div className="border-t-2 border-black w-24 sm:w-32 mb-2 mx-auto"></div>
              <div className="text-xs text-black uppercase tracking-wider">Instructor's Signature</div>
            </div>
            <FaCertificate className="w-10 h-10 text-yellow-600 animate-pulse"/>
            <div className="text-center">
              <div className="border-t-2 border-black w-24 sm:w-32 mb-2 mx-auto"></div>
              <div className="text-xs text-black uppercase tracking-wider">Director's Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificatedesign;
