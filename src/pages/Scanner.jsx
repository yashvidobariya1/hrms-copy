// import React, { useState } from "react";
// import { isMobile } from "react-device-detect";
// import QrReader from "react-qr-scanner";

// const Scanner = () => {
//   const [scanResult, setScanResult] = useState("");
//   const [isScannerOpen, setIsScannerOpen] = useState(false);

//   const handleScan = (data) => {
//     if (data) {
//       setScanResult(data.text);
//       setIsScannerOpen(false);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   const handleButtonClick = () => {
//     // if (isMobile) {
//     setIsScannerOpen(true);
//     // } else {
//     //   alert("This feature is available only on mobile devices.");
//     // }
//   };

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Scan QR Code</button>

//       {isScannerOpen && (
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onScan={handleScan}
//           style={{ width: "400px", height: "400px" }}
//         />
//       )}

//       {scanResult && <p>QR Code Data: {scanResult}</p>}
//     </div>
//   );
// };

// export default Scanner;

import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QrScanner = ({ onScanSuccess }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanner, setScanner] = useState(null);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    if (isScanning && !scanner) {
      const qrcodeScanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250,
        aspectRatio: 1.0,
      });

      // Start scanning and listen for success
      qrcodeScanner.render(
        (decodedText) => {
          // Stop scanning when QR code is detected
          setQrData(decodedText);
          onScanSuccess(decodedText);
          qrcodeScanner.clear(); // Stop the scanner
          setIsScanning(false); // Hide the scanner
        },
        (errorMessage) => {
          // Handle error if needed
          console.log("QR Code error: ", errorMessage);
        }
      );
      setScanner(qrcodeScanner);
    }

    // Cleanup scanner on component unmount
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [isScanning, scanner, onScanSuccess]);

  return (
    <div className="qr-scanner-container">
      {isScanning ? (
        <div id="reader" style={{ width: "100%", height: "600px" }}></div>
      ) : (
        <div className="qr-result">
          <h3>Scanned QR Code:</h3>
          <p>{qrData}</p>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
