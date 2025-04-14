import React, { useState, useRef, useCallback } from "react";
import axios from 'axios';
import PremiumCertificate from "./Certiificatedesign"; // Fixed typo in import

// Create axios instance with default config
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
    console.log('Response received:', response);
    return response;
  },
  error => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default function Certificate() {
  const [certificate, setCertificate] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchStatus, setSearchStatus] = useState({ type: '', message: '' });
  const [certificateData, setCertificateData] = useState(null);
  const [renderError, setRenderError] = useState(null);
  const certificateRef = useRef();

  const handleSearch = useCallback(async () => {
    if (!searchInput.trim()) {
      setSearchStatus({ type: 'error', message: 'Please enter your roll number' });
      return;
    }

    setSearchStatus({ type: 'loading', message: 'Searching...' });
    setLoading(true);
    setRenderError(null);

    try {
      const response = await api.get(`/api/certificates/${searchInput.trim()}`);
      
      if (response.data) {
        setCertificateData(response.data);
        setCertificate(true);
        setSearchStatus({ type: 'success', message: 'Certificate Found ✅' });
      } else {
        throw new Error('No certificate data received');
      }
    } catch (error) {
      console.error('Certificate search error:', error);
      setCertificate(false);
      setCertificateData(null);
      let errorMessage = 'No Certificate Found ❌';
      
      if (error.response && error.response.status === 404) {
        errorMessage = 'Certificate not found. Please check your roll number.';
      } else if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setSearchStatus({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  }, [searchInput]);

  const handlePrint = useCallback(() => {
    setLoading(true);
    const certificateElement = certificateRef.current;
    if (!certificateElement) {
      setSearchStatus({ type: 'error', message: 'Cannot print: certificate not rendered properly' });
      setLoading(false);
      return;
    }

    try {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        setSearchStatus({ type: 'error', message: 'Please allow popups to print the certificate' });
        setLoading(false);
        return;
      }

      // Get the certificate HTML
      const certificateHTML = certificateElement.innerHTML;

      // Write the HTML to the print window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Certificate</title>
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
              ${certificateHTML}
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
      setSearchStatus({ type: 'success', message: 'Print prepared successfully' });
    } catch (error) {
      console.error('Print preparation error:', error);
      setSearchStatus({ type: 'error', message: 'Error preparing print. Please try again.' });
    } finally {
      setLoading(false);
    }
  }, []);

  const renderCertificate = () => {
    try {
      return (
        <PremiumCertificate
          name={certificateData.name}
          course={certificateData.machineName}
          date={certificateData.date}
          certificateNumber={certificateData.rollNo}
          proficiencyScore={certificateData.proficiencyScore}
          grade={certificateData.grade}
          fatherName={certificateData.fatherName}
          image={certificateData.image}
        />
      );
    } catch (error) {
      console.error('Error rendering certificate:', error);
      setRenderError('Failed to render certificate. Please check certificate data.');
      return <div className="p-4 text-red-600">Error rendering certificate</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Certificate Verification</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your roll number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Searching...' : 'Search Certificate'}
          </button>
        </div>
      </div>

      {searchStatus.message && (
        <div className={`mt-4 p-2 text-center font-medium rounded ${
          searchStatus.type === 'success' 
            ? "bg-green-100 border border-green-400 text-green-700" 
            : searchStatus.type === 'error'
            ? "bg-red-100 border border-red-400 text-red-700"
            : "bg-blue-100 border border-blue-400 text-blue-700"
        }`}>
          {searchStatus.message}
        </div>
      )}

      {renderError && (
        <div className="mt-4 p-2 text-center font-medium rounded bg-red-100 border border-red-400 text-red-700">
          {renderError}
        </div>
      )}

      {certificate && certificateData && !renderError && (
        <div className="mt-8 w-full max-w-4xl">
          <div ref={certificateRef} className="bg-white p-2 shadow-lg rounded-lg flex flex-col items-center justify-center">
            {renderCertificate()}
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrint}
              disabled={loading}
              className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Preparing Print...' : 'Print Certificate'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}