import React, { useState } from "react";

export default function AddCertificate() {
  const [certificate, setCertificate] = useState({
    name: "",
    fatherName: "",
    rollNo: "",
    machineName: "Machine A",
    proficiencyScore: "",
    grade: "Good",
    date: "",
    image: null, // Image state added
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setCertificate({ ...certificate, image: e.target.files[0] }); // Store image file
    } else {
      setCertificate({ ...certificate, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", certificate.name);
    formData.append("fatherName", certificate.fatherName);
    formData.append("rollNo", certificate.rollNo);
    formData.append("machineName", certificate.machineName);
    formData.append("proficiencyScore", certificate.proficiencyScore);
    formData.append("grade", certificate.grade);
    formData.append("date", certificate.date);
    formData.append("image", certificate.image); // Append image file

    try {
      const response = await fetch("https://your-api-endpoint.com/certificates", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload data");
      }

      console.log("Certificate Added Successfully");

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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-2 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={certificate.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={certificate.fatherName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter father's name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Roll No</label>
          <input
            type="text"
            name="rollNo"
            value={certificate.rollNo}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter roll number"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Machine Name</label>
          <select
            name="machineName"
            value={certificate.machineName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="Machine A">Machine A</option>
            <option value="Machine B">Machine B</option>
            <option value="Machine C">Machine C</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Proficiency Score</label>
          <input
            type="number"
            name="proficiencyScore"
            value={certificate.proficiencyScore}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter proficiency score"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Grade</label>
          <select
            name="grade"
            value={certificate.grade}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Date of Issue</label>
          <input
            type="date"
            name="date"
            value={certificate.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
        >
          Add Certificate
        </button>
      </form>
    </div>
  );
}
