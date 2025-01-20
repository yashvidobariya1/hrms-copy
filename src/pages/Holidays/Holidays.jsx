// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "../ViewHours/Viewhours.css";

// const Viewhours = () => {
//   const localizer = momentLocalizer(moment);

//   const events = [
//     {
//       hours: "5 Hour",
//       start: new Date(2025, 0, 10, 10, 0),
//       end: new Date(2025, 0, 10, 15, 0),
//     },
//     {
//       hours: "5 Hour overtime",
//       start: new Date(2025, 0, 10, 10, 0),
//       end: new Date(2025, 0, 10, 15, 0),
//     },
//     {
//       hours: "6 hour",
//       start: new Date(2025, 0, 26, 9, 0),
//       end: new Date(2025, 0, 26, 19, 0),
//     },
//     {
//       hours: "2 Hour",
//       start: new Date(2025, 0, 15, 14, 0),
//       end: new Date(2025, 0, 15, 16, 0),
//     },
//     {
//       hours: "6 hour",
//       start: new Date(2025, 0, 20, 3, 0),
//       end: new Date(2025, 0, 20, 12, 0),
//     },
//     {
//       hours: "4 hour",
//       start: new Date(2025, 0, 17, 1, 0),
//       end: new Date(2025, 0, 17, 19, 0),
//     },
//   ];

//   const [selectedOvertime, setSelectedOvertime] = useState(null);

//   const calculateOvertime = (start, end) => {
//     const durationInHours = moment(end).diff(moment(start), "hours");
//     const overtime = durationInHours > 8 ? durationInHours - 8 : 0;
//     return overtime;
//   };

//   const customEventRenderer = ({ event }) => {
//     const overtime = calculateOvertime(event.start, event.end);
//     return (
//       <div>
//         <span>{event.hours}</span>
//         {overtime > 0 && (
//           <div className="overtime-label">{overtime} hours overtime</div>
//         )}
//       </div>
//     );
//   };

//   const handleEventClick = (event) => {
//     const overtime = calculateOvertime(event.start, event.end);
//     setSelectedOvertime(overtime > 0 ? `${overtime} hours overtime` : null);
//   };

//   const renderWeekOvertimeHeader = ({ label }) => {
//     return (
//       <div className="week-header">
//         <span>{label}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="View-hour-main">
//       <main className="viewhour-content">
//         <header className="viewhour-section">
//           <h1>Working Hours</h1>
//         </header>
//         <Calendar
//           localizer={localizer}
//           events={events.map((event) => ({
//             ...event,
//             overtime: calculateOvertime(event.start, event.end),
//           }))}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 700 }}
//           views={["month", "week", "day"]}
//           components={{
//             event: customEventRenderer,
//             week: { header: renderWeekOvertimeHeader },
//           }}
//           onSelectEvent={handleEventClick}
//         />
//         {selectedOvertime && (
//           <div className="overtime-info">{selectedOvertime}</div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Viewhours;

import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { jsPDF } from "jspdf";

const GenerateQRcode = () => {
  const [inputValue, setInputValue] = useState("");
  const [QRcode, setQRCode] = useState("");
  const [formdata, setFormdata] = useState({ QRcode: "" });
  const [error, setError] = useState("");
  const qrCodeRef = useRef();

  const handleGenerateQRCode = () => {
    if (!inputValue.trim()) {
      setError("Input value cannot be empty.");
      return;
    }
    setError("");
    setQRCode(inputValue);
    console.log("inputvalue", inputValue);
    setFormdata((prevData) => ({ ...prevData, QRcode: inputValue }));
    console.log("Form submitted with data:", formdata);
  };

  const handleDownload = () => {
    const qrCodeSVG = qrCodeRef.current.querySelector("svg");
    console.log("qrsvg", qrCodeSVG);
    const svgData = new XMLSerializer().serializeToString(qrCodeSVG);
    console.log("svgdata", svgData);
    const canvas = document.createElement("canvas");
    console.log("canvas", canvas);
    const ctx = canvas.getContext("2d");
    console.log("ctx", ctx);

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 180);
      pdf.save("QRCode.pdf");
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter value"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "80%",
          margin: "10px auto",
          display: "block",
        }}
      />
      {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
      <button
        onClick={handleGenerateQRCode}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Generate QR Code
      </button>
      <div style={{ marginTop: "20px" }} ref={qrCodeRef}>
        {QRcode && (
          <QRCode
            size={256}
            style={{ height: "256px", width: "256px", margin: "0 auto" }}
            value={QRcode}
          />
        )}
      </div>
      <button
        onClick={handleDownload}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Download
      </button>
    </div>
  );
};

export default GenerateQRcode;
