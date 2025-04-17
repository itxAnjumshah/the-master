import React, { useRef } from "react";
import html2canvas from 'html2canvas';

export default function CertificateDesign({
  name,
  fatherName,
  registrationNum,
  rollNo,
  centerName,
  machineName,
  proficiencyScore,
  grade,
  completedate,
  profileimg
}) {
  const certificateRef = useRef(null);

  const handleDownloadCertificate = async () => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = imgData;
        link.click();
      } catch (error) {
        console.error('Error converting certificate to image:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      
      <div
        ref={certificateRef}
        style={{ 
          width: "990px", 
          height: "700px", 
          backgroundImage: "url('/secondframe.png')",
          backgroundSize: "990px 700px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        {/* Top Row - Roll No and Reg No */}
        <div style={{ 
          // display: "flex", 
          // flexDirection:"column",
          // justifyContent:"space-between",
               
          position: "absolute", 
          top: "180px", 
          left: "50px", 
          // right: "100px" 
        }}>
          <div style={{
            // background: "linear-gradient(to right, #f0f7ff, #ffffff)",
            // padding: "16px",
            // borderRadius: "12px",
            // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            // border: "1px solid #dbeafe"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#4b5563" }}>
              Roll No: <span style={{ fontWeight: 700, color: "#2563eb", fontSize: "20px" }}>{rollNo}</span>
            </h3>
          </div>
          <div style={{
            // background: "linear-gradient(to right, #f0f7ff, #ffffff)",
            // padding: "16px",
            // borderRadius: "12px",
            // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            // border: "1px solid #dbeafe"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#4b5563" }}>
              Reg No: <span style={{ fontWeight: 400, color: "#2563eb", fontSize: "20px" }}>{registrationNum}</span>
            </h3>
          </div>
        </div>

        {/* Title Section */}
        <div style={{ 
          textAlign: "center", 
          marginTop: "100px", 
          position: "relative" 
        }}>
          <h1 style={{ 
            fontSize: "33px", 
            fontWeight: 700, 
            maxWidth:"30",
            color: "#1d4ed8", 
            textTransform: "uppercase", 
            letterSpacing: "1px", 
            marginBottom: "3px",
            background: "linear-gradient(to right, #2563eb, #1e40af)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}>
            {centerName}
          </h1>
          
          <h2 style={{ 
            fontSize: "24px", 
            fontWeight: 600, 
            color: "#4b5563", 
            textTransform: "uppercase", 
            letterSpacing: "2px", 
            marginBottom: "1px" 
          }}>
            Certificate of Proficiency
          </h2>
          
          <p style={{ marginBottom: "1px" }}> *We build skill and empower* </p>
          
          <h2 style={{ 
            fontSize: "30px", 
            color: "#16a34a", 
            fontWeight: 600, 
            marginBottom: "1px",
            textAlign: "center" 
          }}>
            {name} 
          </h2>
          
          <h4 style={{ fontSize: "18px", color: "#6b7280" }}>
            Son of <span style={{ fontWeight: 600, color: "#2563eb" }}>{fatherName} </span>
          </h4>
          
          <div style={{
            position: "absolute",
            top: "70px",
            right: "120px",
            width: "118px",
            height: "140px",
            borderRadius: "6px",
            overflow: "hidden",
            border: "2px solid #60a5fa",
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)"
          }}>
            {profileimg && (
              <img
                src={profileimg}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "fill" }}
              />
            )}
          </div>
        </div>

        {/* Skill/Field */}
        <h3 style={{ 
          fontSize: "24px", 
          fontWeight: 700, 
          color: "#4f46e5", 
          textAlign: "center", 
          textTransform: "uppercase", 
          letterSpacing: "1px", 
          marginBottom: "2px",
          marginTop: "1px"
        }}>
          {machineName} 
        </h3>

        {/* Description */}
        <div style={{ 
          maxWidth: "750px", 
          margin: " auto" 
        }}>
          <p style={{ 
            fontSize: "18px", 
            textAlign: "center", 
            color: "#4b5563", 
            marginBottom: "20px", 
            lineHeight: "1.5", 
            padding: "14px",
            background: "linear-gradient(to right, #f0f7ff, #ffffff)",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            border: "1px solid #dbeafe"
          }}>
            This is to certify that <span style={{ fontWeight: 600, color: "#2563eb" }}>{name}</span> has
            successfully completed the <span style={{ fontWeight: 600, color: "#2563eb" }}>{machineName}</span> training program with
            distinction and is hereby recognized as a qualified professional.
          </p>
        </div>

        {/* Signatures */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "36px", 
          alignItems: "center", 
          marginBottom: "32px", 
          color: "#4b5563" 
        }}>
          <div style={{
            background: "linear-gradient(to right, #f0f7ff, #ffffff)",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #dbeafe"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#4b5563" }}>
              Proficiency: <span style={{ fontWeight: 700, color: "#2563eb", fontSize: "20px" }}>{proficiencyScore}</span>
            </h3>
          </div>
          <div style={{
            background: "linear-gradient(to right, #fefce8, #fef9c3)",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #fde68a"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#4b5563" }}>
              Grade: <span style={{ fontWeight: 700, color: "#16a34a", fontSize: "20px" }}>{grade}</span>
            </h3>
          </div>
        </div>

        {/* Date of Issue */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "16px", 
          color: "#4b5563" 
        }}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: "18px", fontFamily: "serif" }}>
              Date of Issue: <span style={{ fontWeight: 500, color: "#374151" }}>{new Date(completedate).toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        {/* Signatures at bottom */}
        <div style={{ 
          // marginTop: "100px",
          display: "flex", 
          justifyContent: "space-evenly", 
          alignItems: "center", 
          gap: "10px", 
          marginTop: "20px", 
          color: "#4b5563" 
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "128px", borderBottom: "2px solid #9ca3af", marginTop: "8px", marginLeft: "auto", marginRight: "auto" }}></div>
              <p style={{ fontWeight: 600, fontSize: "18px", fontFamily: "serif" }}>Instructor Sign</p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "128px", borderBottom: "2px solid #9ca3af", marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}></div>
              <p style={{ fontWeight: 600, fontSize: "18px", fontFamily: "serif" }}>Director's Sign/Stamp</p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}