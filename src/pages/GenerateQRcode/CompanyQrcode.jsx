// import React, { useRef, useState } from "react";
// import QRCode from "react-qr-code";
// import { FaDownload } from "react-icons/fa6";
// import "./CompanyQrcode.css";

// import { useParams } from "react-router";

// const CompanyQrcode = () => {
//   const { id } = useParams();
//   const [inputValue, setInputValue] = useState("");
//   const [QRcode, setQRCode] = useState("");
//   const [base64Image, setBase64Image] = useState("");
//   const [error, setError] = useState("");
//   const qrCodeRef = useRef();

//   const handleGenerateQRCode = async () => {
//     if (!inputValue) {
//       setError("QR Code value is required");
//       return;
//     }
//     setError("");
//     setQRCode(inputValue);

//     setTimeout(() => {
//       const qrCodeSVG = qrCodeRef.current.querySelector("svg");
//       console.log("qrCodeSVG1");

//       if (qrCodeSVG) {
//         const svgData = new XMLSerializer().serializeToString(qrCodeSVG);
//         const img = new Image();
//         const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
//         const svgUrl = URL.createObjectURL(svgBlob);

//         img.onload = async () => {
//           const canvas = document.createElement("canvas");
//           const ctx = canvas.getContext("2d");
//           canvas.width = img.width;
//           canvas.height = img.height;
//           ctx.drawImage(img, 0, 0);
//           const pngBase64 = canvas.toDataURL("image/png");
//           console.log("ase64", pngBase64);
//           setBase64Image(pngBase64);

//           const formdata = {
//             qrValue: inputValue,
//             qrCode: pngBase64,
//             qrType: "Company",
//           };
//           console.log("updateformdata", formdata);
//           // try {
//           //   const response = await PostCall(`/generateQR/${id}`, formdata);
//           //   console.log("response", response);
//           //   if (response.status === 200) {
//           //     showToast(response?.data?.message, "success");
//           //   } else {
//           //     showToast(response?.data?.message, "error");
//           //   }
//           // } catch (error) {
//           //   console.error("Error:", error);
//           // }
//         };

//         img.src = svgUrl;
//       }
//     }, 0);
//   };

//   const handleDownloadBase64 = () => {
//     if (!base64Image) {
//       console.error("No QR code to download.");
//       return;
//     }
//     const link = document.createElement("a");
//     link.href = base64Image;
//     link.download = "QRCode.png";
//     link.click();
//   };

//   return (
//     <div className="qr-generator-container">
//       <div className="qr-generator-section">
//         <div className="qr-generator-container-flex">
//           <h1>Company QR Code Generator</h1>
//           <label>Enter The QR Value</label>
//           <input
//             type="text"
//             placeholder="Enter Generated Value"
//             className="qrgenerate-input"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//           {error && <p className="error-text">{error}</p>}
//           <div className="generate-qr-button">
//             <button onClick={handleGenerateQRCode}>Generate QR Code</button>
//           </div>
//         </div>

//         {QRcode && (
//           <div className="qr-display-container">
//             <div className="qr-code" ref={qrCodeRef}>
//               <QRCode className="generated-code" value={QRcode} />
//             </div>
//             <div className="qr-download">
//               <button className="download-btn" onClick={handleDownloadBase64}>
//                 <FaDownload />
//                 Download
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyQrcode;

import React from "react";

const CompanyQrcode = () => {
  return <div>CompanyQrcode</div>;
};

export default CompanyQrcode;
