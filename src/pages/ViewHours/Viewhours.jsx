import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Viewhours = () => {
  const [scanResult, setScanResult] = useState(""); // Store the scan result
  const [isScannerVisible, setIsScannerVisible] = useState(true); // Control visibility of scanner

  useEffect(() => {
    // Initialize the scanner
    const scanner = new Html5QrcodeScanner("render", {
      qrbox: {
        width: 600,
        height: 600,
      },
      fps: 5,
    });

    const success = (result) => {
      setScanResult(result);
      setIsScannerVisible(false); // Hide the scanner after successful scan
      scanner.clear(); // Stop the scanner after a successful scan
    };

    const error = (err) => {
      console.warn("QR Scanner Error:", err);
    };

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div>
      <h1>QR Scanner</h1>
      {isScannerVisible && (
        <div id="render" style={{ width: "150px", height: "150px" }}></div>
      )}
      {scanResult && <p>Scanned Result: {scanResult}</p>}
    </div>
  );
};

export default Viewhours;
