import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PremiumCertificate from './Certiificatedesign';
import { FaEdit, FaTrash, FaSearch, FaPrint, FaArrowLeft, FaArrowRight, FaUser, FaGraduationCap, FaCertificate } from 'react-icons/fa';

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
  // console.log('Starting Request:', request);
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    // console.log('Response:', response);
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
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);

  // Get filtered certificates
  const filteredCertificates = certificates.filter(cert => 
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.machineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    setPreviewImage(certificate.profileimg);
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
      Object.keys(editData).forEach(key => {
        if (key !== 'newImage' && key !== 'profileimg') {
          formData.append(key, editData[key]);
        }
      });
      if (editData.newImage) {
        formData.append('profileimg', editData.newImage);
      }

      await api.put(`/api/certificates/${editData.rollNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      fetchCertificates();
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
        if (currentIndex >= filteredCertificates.length - 1) {
          setCurrentIndex(Math.max(0, filteredCertificates.length - 2));
        }
      } catch (err) {
        console.error('Error deleting certificate:', err);
        alert('Failed to delete certificate. Please try again.');
      }
    }
  };

  const handlePrint = (certificate) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${certificate.name}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @page {
              size: A4 landscape;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .certificate-container {
              width: 100%;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: white;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            ${document.querySelector(`#certificate-${certificate.rollNo}`).innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 1000);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const nextCertificate = () => {
    if (filteredCertificates.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredCertificates.length);
    }
  };

  const previousCertificate = () => {
    if (filteredCertificates.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredCertificates.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <div className="text-gray-400 text-4xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Certificates Found</h2>
          <p className="text-gray-600">There are no certificates available to display.</p>
        </div>
      </div>
    );
  }

  const currentCertificate = filteredCertificates[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, roll number, or machine name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full px-4 py-3 pl-12 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-600">
              Found {filteredCertificates.length} matching certificates
            </p>
          )}
        </div>

        {/* Certificate Navigation and Controls */}
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <button
            onClick={previousCertificate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={filteredCertificates.length <= 1}
          >
            <FaArrowLeft /> Previous
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Certificate {currentIndex + 1} of {filteredCertificates.length}
            </h2>
            <p className="text-gray-600">Roll No: {currentCertificate?.rollNo}</p>
          </div>
          <button
            onClick={nextCertificate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={filteredCertificates.length <= 1}
          >
            Next <FaArrowRight />
          </button>
        </div>

        {/* Certificate Display */}
        {currentCertificate && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={() => handlePrint(currentCertificate)}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
                title="Print Certificate"
              >
                <FaPrint size={16} />
              </button>
              <button
                onClick={() => handleEdit(currentCertificate)}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                title="Edit Certificate"
              >
                <FaEdit size={16} />
              </button>
              <button
                onClick={() => handleDelete(currentCertificate)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                title="Delete Certificate"
              >
                <FaTrash size={16} />
              </button>
            </div>

            {/* Certificate Preview */}
            <div id={`certificate-${currentCertificate.rollNo}`} className="certificate-content w-full">
              <PremiumCertificate
                name={currentCertificate.name}
                fatherName={currentCertificate.fatherName}
                registrationNum={currentCertificate.registrationNum}
                rollNo={currentCertificate.rollNo}
                centerName={currentCertificate.centerName}
                machineName={currentCertificate.machineName}
                machineImg={currentCertificate.machineImg}
                proficiencyScore={currentCertificate.proficiencyScore}
                grade={currentCertificate.grade}
                completedate={currentCertificate.completedate}
                profileimg={currentCertificate.profileimg}
              />
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditing && editData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full transform transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Certificate</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Roll Number</label>
                    <input
                      type="text"
                      value={editData.rollNo}
                      onChange={(e) => setEditData({ ...editData, rollNo: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Machine Name</label>
                    <input
                      type="text"
                      value={editData.machineName}
                      onChange={(e) => setEditData({ ...editData, machineName: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Proficiency Score</label>
                    <input
                      type="number"
                      value={editData.proficiencyScore}
                      onChange={(e) => setEditData({ ...editData, proficiencyScore: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Grade</label>
                    <select
                      value={editData.grade}
                      onChange={(e) => setEditData({ ...editData, grade: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="Good">Good</option>
                      <option value="Bad">Bad</option>
                      <option value="Excellent">Excellent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Image</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditData(null);
                      setPreviewImage(null);
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 font-medium"
                  >
                    Update Certificate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 