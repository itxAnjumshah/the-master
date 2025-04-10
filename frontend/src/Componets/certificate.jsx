import React, { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
      // Get all stylesheets from the current document
      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            // Try to get all CSS rules from the stylesheet
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('');
          } catch (e) {
            // If stylesheet is from a different origin, we can't access its rules
            // Try to use the href instead if available
            if (styleSheet.href) {
              return `@import url("${styleSheet.href}");`;
            }
            return '';
          }
        })
        .filter(Boolean)
        .join('\n');
        
      // Create a copy of the certificate to manipulate
      const certClone = certificateElement.cloneNode(true);
      
      // Convert the certificate's inline styles to be included in the print window
      Array.from(certClone.querySelectorAll('*')).forEach(element => {
        // Get computed styles
        const computedStyle = window.getComputedStyle(element);
        // Apply computed styles as inline styles
        for (let i = 0; i < computedStyle.length; i++) {
          const prop = computedStyle[i];
          const value = computedStyle.getPropertyValue(prop);
          element.style[prop] = value;
        }
      });

      // Open print window
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        setSearchStatus({ type: 'error', message: 'Please allow popups to print the certificate' });
        setLoading(false);
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Certificate</title>
            <style>
              ${styles}
              
              @page {
                size: A4 landscape;
                margin: 0;
              }
              
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: white;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              .certificate-container {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
              }
              
              .certificate-content {
                transform-origin: center;
                width: 100%;
                height: 100%;
              }
              
              /* Additional styles to ensure all elements are visible */
              * {
                visibility: visible !important;
                opacity: 1 !important;
                overflow: visible !important;
              }
              
              /* Force background colors and images to print */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            </style>
            
            <!-- Import your app's main CSS file if it exists -->
            <link rel="stylesheet" href="/css/main.css" />
            <link rel="stylesheet" href="/css/tailwind.css" />
          </head>
          <body>
            <div class="certificate-container">
              <div class="certificate-content">
                ${certClone.outerHTML}
              </div>
            </div>
            <script>
              window.onload = function() {
                try {
                  // Make sure all images are loaded
                  const images = document.querySelectorAll('img');
                  const imagePromises = Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => {
                      img.onload = img.onerror = resolve;
                    });
                  });
                  
                  Promise.all(imagePromises).then(() => {
                    // Resize certificate to fit perfectly on A4
                    const container = document.querySelector('.certificate-container');
                    const content = document.querySelector('.certificate-content');
                    
                    // A4 landscape dimensions in pixels (assuming 96 DPI)
                    const a4Width = 1123; // 297mm
                    const a4Height = 794; // 210mm
                    
                    // Calculate scaling ratio
                    const contentWidth = content.scrollWidth;
                    const contentHeight = content.scrollHeight;
                    
                    // Apply scaling to fit A4 precisely
                    const scaleX = a4Width / contentWidth;
                    const scaleY = a4Height / contentHeight;
                    const scale = Math.min(scaleX, scaleY) * 0.95; // 5% margin
                    
                    content.style.transform = 'scale(' + scale + ')';
                    
                    // Print after short delay to ensure proper rendering
                    setTimeout(function() {
                      window.print();
                      window.close();
                    }, 1500);
                  });
                } catch (error) {
                  console.error('Print error:', error);
                  alert('Error while preparing to print. Please try again.');
                  window.close();
                }
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

  const handleDownloadPDF = useCallback(async () => {
    setLoading(true);
    setSearchStatus({ type: 'loading', message: 'Generating PDF...' });
    
    const certificateElement = certificateRef.current;
    if (!certificateElement) {
      setLoading(false);
      setSearchStatus({ type: 'error', message: 'Cannot download: certificate not rendered properly' });
      return;
    }

    try {
      // Get exact A4 dimensions
      const a4Width = 297; // mm
      const a4Height = 210; // mm
      
      // Create canvas with optimal dimensions for A4
      const canvas = await html2canvas(certificateElement, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: 'white',
        imageTimeout: 15000, // Increased timeout for images
        onclone: (document) => {
          // Force all images to be loaded before capturing
          const imgs = document.getElementsByTagName('img');
          for (let i = 0; i < imgs.length; i++) {
            imgs[i].crossOrigin = "anonymous";
          }
        }
      });

      // Create PDF exactly A4 size
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate image dimensions to fit perfectly on A4
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate scaling ratio
      const ratio = Math.min(a4Width / imgWidth, a4Height / imgHeight) * 0.98; // 2% margin
      
      // Center the image
      const x = (a4Width - (imgWidth * ratio)) / 2;
      const y = (a4Height - (imgHeight * ratio)) / 2;
      
      // Add the image to the PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', x, y, imgWidth * ratio, imgHeight * ratio);
      
      // Save PDF
      pdf.save(`certificate-${certificateData.rollNo}.pdf`);
      setSearchStatus({ type: 'success', message: 'PDF generated successfully' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSearchStatus({ 
        type: 'error', 
        message: 'Error generating PDF. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  }, [certificateData]);

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