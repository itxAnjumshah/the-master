import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PremiumCertificate from './Certiificatedesign';
import { FaEdit, FaArrowLeft, FaArrowRight, FaTimes, FaTrash, FaImage } from 'react-icons/fa';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default function AllCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch all certificates
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/api/certificates');
      setCertificates(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching certificates:', err);
      setError('Failed to load certificates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (certificate) => {
    setEditData({ ...certificate });
    setPreviewImage(certificate.image);
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setEditData({ ...editData, newImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      // Append all text fields
      Object.keys(editData).forEach(key => {
        if (key !== 'newImage' && key !== 'image') {
          formData.append(key, editData[key]);
        }
      });
      // Append image if there's a new one
      if (editData.newImage) {
        formData.append('image', editData.newImage);
      }

      await api.put(`/api/certificates/${editData.rollNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      fetchCertificates(); // Refresh the list
      setIsEditing(false);
      setEditData(null);
      setPreviewImage(null);
    } catch (err) {
      console.error('Error updating certificate:', err);
      alert('Failed to update certificate. Please try again.');
    }
  };

  const handleDelete = async (certificate) => {
    if (window.confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
      try {
        await api.delete(`/api/certificates/${certificate.rollNo}`);
        fetchCertificates();
        if (currentIndex >= certificates.length - 1) {
          setCurrentIndex(Math.max(0, certificates.length - 2));
        }
      } catch (err) {
        console.error('Error deleting certificate:', err);
        alert('Failed to delete certificate. Please try again.');
      }
    }
  };

  const nextCertificate = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const previousCertificate = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <p className="text-xl font-bold mb-2">No Certificates Found</p>
          <p>There are no certificates available to display.</p>
        </div>
      </div>
    );
  }

  const currentCertificate = certificates[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Navigation Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={previousCertificate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
            >
              <FaArrowLeft /> Previous
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Certificate {currentIndex + 1} of {certificates.length}</h2>
              <p className="text-gray-600">Roll No: {currentCertificate.rollNo}</p>
            </div>
            <button
              onClick={nextCertificate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
            >
              Next <FaArrowRight />
            </button>
          </div>

          {/* Certificate Display */}
          <div className="relative">
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => handleEdit(currentCertificate)}
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(currentCertificate)}
                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
              >
                <FaTrash size={20} />
              </button>
            </div>
            <div className="certificate-container">
              <PremiumCertificate
                name={currentCertificate.name}
                course={currentCertificate.machineName}
                date={currentCertificate.date}
                certificateNumber={currentCertificate.rollNo}
                proficiencyScore={currentCertificate.proficiencyScore}
                grade={currentCertificate.grade}
                fatherName={currentCertificate.fatherName}
                image={currentCertificate.image}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Certificate</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Image Upload Section */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center relative">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaImage size={40} className="text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
                >
                  <FaImage /> Change Image
                </button>
              </div>

              {/* Existing form fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                <input
                  type="text"
                  value={editData.fatherName}
                  onChange={(e) => setEditData({ ...editData, fatherName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <input
                  type="text"
                  value={editData.machineName}
                  onChange={(e) => setEditData({ ...editData, machineName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Proficiency Score</label>
                <input
                  type="number"
                  value={editData.proficiencyScore}
                  onChange={(e) => setEditData({ ...editData, proficiencyScore: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade</label>
                <input
                  type="text"
                  value={editData.grade}
                  onChange={(e) => setEditData({ ...editData, grade: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 