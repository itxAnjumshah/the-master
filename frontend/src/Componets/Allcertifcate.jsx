import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Certificatedesign from "../Componets/Certiificatedesign"

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default function Allcertifcate() {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchCertificates = useCallback(async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/api/certificates', {
        params: {
          page,
          limit: pagination.limit,
          search
        },
        timeout: 10000 // 10 second timeout
      });
      
      if (response.data && Array.isArray(response.data.data)) {
        setCertificates(response.data.data);
        setPagination({
          page: response.data.pagination.page,
          limit: response.data.pagination.limit,
          total: response.data.pagination.total,
          pages: response.data.pagination.pages
        });
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
      let errorMessage = 'Failed to fetch certificates. Please try again later.';
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCertificates(1, searchTerm);
    }, 500); // Debounce search by 500ms

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, fetchCertificates]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const handleDelete = async (rollNo) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await api.delete(`/api/certificates/${rollNo}`);
        setCertificates(prev => prev.filter(cert => cert.rollNo !== rollNo));
        // Refresh the current page
        fetchCertificates(pagination.page, searchTerm);
      } catch (error) {
        console.error('Error deleting certificate:', error);
        let errorMessage = 'Failed to delete certificate. Please try again.';
        
        if (error.response) {
          errorMessage = error.response.data?.message || errorMessage;
        } else if (error.request) {
          errorMessage = 'Network error. Please check your connection.';
        }
        
        alert(errorMessage);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchCertificates(newPage, searchTerm);
    }
  };

  if (loading && certificates.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Certificates</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name, roll number, machine, father's name, or grade..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {certificates.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No certificates found matching your search</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <div key={certificate.rollNo} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Certificatedesign
                  name={certificate.name}
                  course={certificate.machineName}
                  date={certificate.date}
                  certificateNumber={certificate.rollNo}
                  proficiencyScore={certificate.proficiencyScore}
                  grade={certificate.grade}
                  fatherName={certificate.fatherName}
                  image={certificate.image}
                />
                <div className="p-4 flex justify-center">
                  <button
                    onClick={() => handleDelete(certificate.rollNo)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`px-4 py-2 rounded ${
                  pagination.page === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className={`px-4 py-2 rounded ${
                  pagination.page === pagination.pages
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
