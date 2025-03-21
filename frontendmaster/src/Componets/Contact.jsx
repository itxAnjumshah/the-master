import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-800 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg text-center text-white">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Contact US</h2>

        {/* WhatsApp */}
        <div className="flex items-center bg-gray-700 p-3 rounded-lg mb-4 hover:bg-gray-600 transition">
          <FaWhatsapp className="text-green-400 text-2xl mx-3" />
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg"
          >
            +92 300 1234567
          </a>
        </div>

        {/* Facebook */}
        <div className="flex items-center bg-gray-700 p-3 rounded-lg mb-4 hover:bg-gray-600 transition">
          <FaFacebook className="text-blue-500 text-2xl mx-3" />
          <a
            href="https://www.facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg"
          >
            Facebook Profile
          </a>
        </div>

        {/* Instagram */}
        <div className="flex items-center bg-gray-700 p-3 rounded-lg mb-4 hover:bg-gray-600 transition">
          <FaInstagram className="text-pink-400 text-2xl mx-3" />
          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg"
          >
            Instagram Profile
          </a>
        </div>

        {/* Location */}
        <div className="flex flex-col bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-red-400 text-2xl mx-3" />
            <span className="text-lg">Islamabad,Pakistan</span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.519139852317!2d72.92079987611436!3d33.64370803919095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df970240b101e7%3A0xa8dab09c368cf653!2sThe%20Master%20Training%20Center!5e0!3m2!1sen!2s!4v1742542011105!5m2!1sen!2s"
            width="100%"
            height="300"
            className="rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
