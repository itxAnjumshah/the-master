import React, { useState, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCertificate() {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState({
    name: "",
    fatherName: "",
    rollNo: "",
    machineName: "Machine A",
    proficiencyScore: "",
    grade: "Good",
    date: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!certificate.name.trim()) newErrors.name = 'Name is required';
    if (!certificate.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    if (!certificate.rollNo.trim()) newErrors.rollNo = 'Roll number is required';
    if (!certificate.proficiencyScore) newErrors.proficiencyScore = 'Proficiency score is required';
    if (!certificate.date) newErrors.date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [certificate]);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setCertificate(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Please fill in all required fields correctly' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      Object.keys(certificate).forEach(key => {
        if (key === 'image' && certificate[key]) {
          formData.append('image', certificate[key]);
        } else {
          formData.append(key, certificate[key]);
        }
      });

      const response = await axios.post('http://localhost:5000/api/certificates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', text: response.data.message });
      // Reset form
      setCertificate({
        name: "",
        fatherName: "",
        rollNo: "",
        machineName: "Machine A",
        proficiencyScore: "",
        grade: "Good",
        date: "",
        image: null,
      });
      
      // Redirect to all certificates page after 2 seconds
      setTimeout(() => {
        navigate('/all-certificates');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add certificate. Please try again.";
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-2 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Certificate</h2>
      {message.text && (
        <div className={`mb-4 p-2 rounded ${
          message.type === 'success' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name *</label>
          <input
            type="text"
            name="name"
            value={certificate.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Father's Name *</label>
          <input
            type="text"
            name="fatherName"
            value={certificate.fatherName}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.fatherName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter father's name"
          />
          {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Roll No *</label>
          <input
            type="text"
            name="rollNo"
            value={certificate.rollNo}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.rollNo ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter roll number"
          />
          {errors.rollNo && <p className="text-red-500 text-sm mt-1">{errors.rollNo}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Machine Name</label>
          <select
            name="machineName"
            value={certificate.machineName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="Machine A">Machine A</option>
            <option value="Machine B">Machine B</option>
            <option value="Machine C">Machine C</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Proficiency Score *</label>
          <input
            type="number"
            name="proficiencyScore"
            value={certificate.proficiencyScore}
            onChange={handleChange}
            min="0"
            max="100"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.proficiencyScore ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter proficiency score"
          />
          {errors.proficiencyScore && <p className="text-red-500 text-sm mt-1">{errors.proficiencyScore}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Grade</label>
          <select
            name="grade"
            value={certificate.grade}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Date of Issue *</label>
          <input
            type="date"
            name="date"
            value={certificate.date}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Adding Certificate...' : 'Add Certificate'}
        </button>
      </form>
    </div>
  );
}
