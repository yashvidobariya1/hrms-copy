import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import QrReader from "react-qr-scanner";

const Scanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      setIsScannerOpen(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleButtonClick = () => {
    // if (isMobile) {
    setIsScannerOpen(true);
    // } else {
    //   alert("This feature is available only on mobile devices.");
    // }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Scan QR Code</button>

      {isScannerOpen && (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "400px", height: "400px" }}
        />
      )}

      {scanResult && <p>QR Code Data: {scanResult}</p>}
    </div>
  );
};

export default Scanner;
