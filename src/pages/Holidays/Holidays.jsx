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

import React from "react";

const Holidays = () => {
  return <div>Holidays</div>;
};

export default Holidays;
