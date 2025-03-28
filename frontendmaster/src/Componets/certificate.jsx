import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PremiumCertificate from "./Certiificatedesign";

export default function Certificate() {
  const [certificate, setCertificate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchStatus, setSearchStatus] = useState(""); // New State for search message
  const certificateRef = useRef();

  // Dummy database
  const certificates = {
    "123456": true,
    "987654": true,
  };

  const handleSearch = () => {
    setSearchStatus("Searching..."); // Show Searching status
    setTimeout(() => { 
      if (certificates[inputValue]) {
        setCertificate(true);
        setSearchStatus("Certificate Found ✅");
      } else {
        setCertificate(false);
        setSearchStatus("No Certificate Found ❌");
      }
    }, 1000); // Delay to simulate real search process
  };

  // WORKING PRINT FUNCTION
  const handlePrint = () => {
    const certificateElement = certificateRef.current;
    if (!certificateElement) return;

    const originalContents = document.body.innerHTML;
    const printContents = certificateElement.innerHTML;

    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;">
        ${printContents}
      </div>
    `;
    
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // WORKING PDF DOWNLOAD FUNCTION
  const handleDownloadPDF = () => {
    setLoading(true);
    const certificateElement = certificateRef.current;
    if (!certificateElement) return;

    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '1200px';
    tempContainer.appendChild(certificateElement.cloneNode(true));
    document.body.appendChild(tempContainer);

    html2canvas(tempContainer, {
      scale: 2,
      logging: true,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    }).then((canvas) => {
      document.body.removeChild(tempContainer);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const yPosition = (210 - imgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight);
      pdf.save('certificate.pdf');
      setLoading(false);
    }).catch(error => {
      console.error('Error generating PDF:', error);
      setLoading(false);
      alert('Error generating PDF. Please try again.');
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Search Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Certificate Verification</h2>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter Registration No. or CNIC"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Search Certificate
          </button>
        </div>
      </div>

      {/* Search Status Message */}
      {searchStatus && (
        <div className={`mt-4 p-2 text-center font-medium rounded ${
          searchStatus.includes("Found") 
            ? "bg-green-100 border border-green-400 text-green-700" 
            : "bg-red-100 border border-red-400 text-red-700"
        }`}>
          {searchStatus}
        </div>
      )}

      {/* Results Section */}
      {certificate && (
        <div className="mt-8 w-full max-w-4xl">
          <div ref={certificateRef} className="bg-white p-2 shadow-lg rounded-lg">
            <PremiumCertificate />
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            >
              Print Certificate
            </button>
            {/* <button
              onClick={handleDownloadPDF}
              disabled={loading}
              className={`bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
