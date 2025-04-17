import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="bg-gray-800 min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg text-center text-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Contact US</h2>

        {/* Common Animation for Cards */}
        {[
          {
            icon: <FaWhatsapp className="text-green-400 text-2xl mx-3" />,
            text: "+92 306 5566288",
            link: "https://wa.me/923065566288",
          },
          {
            icon: <FaWhatsapp className="text-green-400 text-2xl mx-3" />,
            text: "+92 311 5566288",
            link: "https://wa.me/923115566288",
          },
          {
            icon: <FaWhatsapp className="text-green-400 text-2xl mx-3" />,
            text: "+92 3489984743",
            link: "https://wa.me/9203489984743",
          },


          {
            icon: <FaFacebook className="text-blue-500 text-2xl mx-3" />,
            text: "The master Training  center ",
            link: "https://www.facebook.com/share/178uNESuDr/",
          },
          
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center bg-gray-700 p-3 rounded-lg mb-4 hover:bg-gray-600 transition cursor-pointer"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {item.icon}
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg">
              {item.text}
            </a>
          </motion.div>
        ))}

        {/* Location */}
        <motion.div
          className="flex flex-col bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-red-400 text-2xl mx-3" />
            <span className="text-lg">Islamabad, Pakistan</span>
          </div>
          <motion.iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.519139852317!2d72.92079987611436!3d33.64370803919095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df970240b101e7%3A0xa8dab09c368cf653!2sThe%20Master%20Training%20Center!5e0!3m2!1sen!2s!4v1742542011105!5m2!1sen!2s"
            width="100%"
            height="300"
            className="rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          ></motion.iframe>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
