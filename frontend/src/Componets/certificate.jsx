import React, { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from 'axios';
import PremiumCertificate from "./Certiificatedesign";

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
    console.log('Response:', response);
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
  const certificateRef = useRef();

  const handleSearch = useCallback(async () => {
    if (!searchInput.trim()) {
      setSearchStatus({ type: 'error', message: 'Please enter your roll number' });
      return;
    }

    setSearchStatus({ type: 'loading', message: 'Searching...' });
    setLoading(true);

    try {
      console.log('Searching for certificate:', searchInput.trim());
      const response = await api.get(`/api/certificates/${searchInput.trim()}`);
      console.log('Certificate response:', response.data);
      
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
      
      if (error.response) {
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
    const certificateElement = certificateRef.current;
    if (!certificateElement) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the certificate');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate</title>
          <style>
            @media print {
              body { margin: 0; }
              .certificate-container { 
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            ${certificateElement.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    setLoading(true);
    const certificateElement = certificateRef.current;
    if (!certificateElement) {
      setLoading(false);
      return;
    }

    try {
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const yPosition = (210 - imgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight);
      pdf.save('certificate.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSearchStatus({ 
        type: 'error', 
        message: 'Error generating PDF. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  }, []);

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

      {certificate && certificateData && (
        <div className="mt-8 w-full max-w-4xl">
          <div ref={certificateRef} className="bg-white p-2 shadow-lg rounded-lg">
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
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            >
              Print Certificate
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={loading}
              className={`bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


