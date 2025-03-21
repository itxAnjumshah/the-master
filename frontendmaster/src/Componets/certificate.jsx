import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Certificate() {
  const [certificate, setCertificate] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const certificateRef = useRef();

  // Dummy Database (CNIC / Reg No. -> Certificate Image)
  const certificates = {
    "123456": "/path/to/master2logo.jpg",
    "987654": "/path/to/certificate2.jpg",
  };

  // Search Function
  const handleSearch = () => {
    if (certificates[inputValue]) {
      setCertificate(certificates[inputValue]);
    } else {
      setCertificate(null);
    }
  };

  // Print Function (Only Certificate)
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head><title>Print Certificate</title></head>
        <body onload="window.print(); window.close();">
          <img src="${certificate}" style="width:100%; height:auto;" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Input Field */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Search Your Certificate</h2>
        <input
          type="text"
          placeholder="Enter Registration No. or CNIC"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 w-full rounded-md"
        />
        <button onClick={handleSearch} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </div>

      {/* Certificate Display */}
      {certificate ? (
        <div ref={certificateRef} className="mt-6 bg-white p-4 shadow-lg rounded-lg text-center">
          <h3 className="text-lg font-bold mb-2">Your Certificate</h3>
          <img src={certificate} alt="Certificate" className="w-full max-w-lg rounded-lg shadow" />
          <div className="mt-4 space-x-4">
            <button onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded-md">
              Print
            </button>
            {/* <button onClick={handleDownloadPDF} className="bg-red-600 text-white px-4 py-2 rounded-md">
              Download PDF
            </button> */}
          </div>
        </div>
      ) : (
        inputValue && <p className="mt-4 text-red-600 font-semibold">No Certificate Found</p>
      )}
    </div>
  );
}
