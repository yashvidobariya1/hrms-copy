import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Viewhours.css";
import { GetCall } from "../../ApiServices";

const Viewhours = () => {
  const localizer = momentLocalizer(moment);
  const [AlltimesheetList, setAlltimesheetList] = useState([]);
  const [view, setView] = useState("month");

  const getAlltimesheet = async () => {
    try {
      const response = await GetCall("/getOwnAllTimesheet");
      if (response?.data?.status === 200) {
        setAlltimesheetList(response?.data.timesheets);
        console.log("response", response?.data.timesheets);
      }
    } catch (error) {
      console.error("Error fetching timesheets:", error);
    }
  };

  const customEventRenderer = ({ event }) => {
    return (
      <>
        <div className="Overtime-div">
          <span>{event.title}</span>
        </div>
        {event.overtime && event.overtime !== "0h 0m 0s" && (
          <div className="overtime-label" style={{ display: "block" }}>
            {event.overtime} Hours Overtime
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    getAlltimesheet();
  }, []);

  return (
    <div className="View-hour-main">
      <main className="viewhour-content">
        <header className="viewhour-section">
          <h1>Working Hours</h1>
          <div className="indicate-color">
            <p>
              <span className="color-box black-box"></span>Total Hour
            </p>
            <p>
              <span className="color-box green-box"></span>Overtime
            </p>
          </div>
        </header>
        <Calendar
          localizer={localizer}
          events={AlltimesheetList.flatMap((timesheet) => {
            if (view === "month") {
              return [
                {
                  title: `${timesheet.totalHours} total Hours`,
                  start: timesheet.clockinTime?.[0]?.clockIn
                    ? moment(timesheet.clockinTime[0].clockIn).toDate()
                    : new Date(),
                  end: timesheet.clockinTime?.[0]?.clockOut
                    ? moment(timesheet.clockinTime[0].clockOut).toDate()
                    : new Date(),
                  overtime: timesheet.overTime,
                },
              ];
            }

            if (view === "week" || view === "day") {
              return (
                timesheet.clockinTime?.map((clock) => {
                  const eventStart = clock.clockIn
                    ? moment(clock.clockIn).toDate()
                    : new Date();
                  const eventEnd = clock.clockOut
                    ? moment(clock.clockOut).toDate()
                    : new Date();

                  const clockInFormatted = clock.clockIn
                    ? moment(clock.clockIn).format("hh:mm A")
                    : "";
                  const clockOutFormatted = clock.clockOut
                    ? moment(clock.clockOut).format("hh:mm A")
                    : "";
                  const duration =
                    clock.clockIn && clock.clockOut
                      ? moment.duration(
                          moment(clock.clockOut).diff(moment(clock.clockIn))
                        )
                      : null;

                  const totalDuration = duration
                    ? `${Math.floor(
                        duration.asHours()
                      )}h ${duration.minutes()}m`
                    : "0h 0m";

                  return {
                    title: (
                      <div>
                        <div>{`${clockInFormatted} - ${clockOutFormatted}`}</div>
                        <div>{totalDuration} Total Hours</div>
                      </div>
                    ),
                    start: eventStart,
                    end: eventEnd,
                    overtime: timesheet.overTime,
                  };
                }) || []
              );
            }
          })}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          views={["month", "week", "day"]}
          tooltipAccessor="tooltip"
          components={{
            event: customEventRenderer,
          }}
          onView={(newView) => setView(newView)}
        />
      </main>
    </div>
  );
};

export default Viewhours;
