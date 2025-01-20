import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { FaDownload } from "react-icons/fa6";
import "./GenerateQRcode.css";

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [QRcode, setQRCode] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [error, setError] = useState("");
  const qrCodeRef = useRef();

  useEffect(() => {
    if (QRcode) {
      const qrCodeSVG = qrCodeRef.current.querySelector("svg");
      if (qrCodeSVG) {
        const svgData = new XMLSerializer().serializeToString(qrCodeSVG);
        const base64 = `data:image/svg+xml;base64,${btoa(svgData)}`;
        setBase64Image(base64);
        console.log("base64", base64);
      }
    }
  }, [QRcode]);

  const handleGenerateQRCode = () => {
    if (!inputValue.trim()) {
      setError("QrCode value is Required");
      return;
    }
    setError("");
    setQRCode(inputValue);
  };

  const handleDownloadBase64 = () => {
    if (!base64Image) {
      console.error("No QR code to download.");
      return;
    }
    const link = document.createElement("a");
    link.href = base64Image;
    link.download = "QRCode.svg";
    link.click();
  };

  return (
    <div className="qr-generator-container">
      <div className="qr-generator-section">
        <div className="qr-generator-container-flex">
          <h1>QRCode Generator</h1>
          <label>Enter The QR Value</label>
          <input
            type="text"
            placeholder="Add Your Generated Value"
            className="qrgenerate-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <div className="generate-qr-button">
            <button onClick={handleGenerateQRCode}>Generate QR Code</button>
          </div>
        </div>

        {QRcode && (
          <div className="qr-display-container">
            <div className="qr-code" ref={qrCodeRef}>
              <QRCode className="generated-code" value={QRcode} />
            </div>
            <div className="qr-download">
              <button className="download-btn" onClick={handleDownloadBase64}>
                <FaDownload />
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
