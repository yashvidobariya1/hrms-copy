import React, { useState, useEffect } from "react";
import { GetCall, PostCall } from "../../ApiServices";
import { showToast } from "../../main/ToastManager";
import moment from "moment";
import "./ClockIn.css";
import { BsHourglassSplit } from "react-icons/bs";
import Loader from "../Helper/Loader";
import QrReader from "react-qr-scanner";

const CheckIn = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [loading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [totalWorkingTime, setTotalWorkingTime] = useState("0h 0m 0s");
  const [location, setLocation] = useState({ lat: null, long: null });
  const [scanResult, setScanResult] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(true);

  useEffect(() => {
    const savedStartTime = localStorage.getItem("startTime");
    const savedElapsedTime = localStorage.getItem("elapsedTime");
    const savedTotalWorkingTime =
      Number(localStorage.getItem("totalWorkingTime")) || 0;

    if (savedStartTime) {
      const savedTime = new Date(savedStartTime);
      const currentElapsed =
        Math.floor((Date.now() - savedTime.getTime()) / 1000) +
        Number(savedElapsedTime || 0);
      setStartTime(savedTime);
      setElapsedTime(currentElapsed);
      startTimer(savedTime);
    }
    setTotalWorkingTime(savedTotalWorkingTime);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location:", error);
        showToast(error, "error");
      }
    );

    const fetchTimesheet = async () => {
      const response = await GetCall(`/getowntimesheet`);
      try {
        if (response?.data?.status === 200) {
          setTimeSheetData(response?.data?.timesheet?.clockinTime);
          setTimerOn(response?.data?.timesheet?.isTimerOn);
          setTotalWorkingTime(response?.data?.timesheet?.totalHours);
        } else {
          if (response?.data?.message !== "Record is not found!") {
            showToast(response?.data?.message, "error");
          }
        }
      } catch (error) {
        showToast(response?.data?.message, "error");
      }
    };

    fetchTimesheet();
  }, []);

  useEffect(() => {
    console.log("timerOn state updated:", timerOn);
  }, [timerOn]);

  useEffect(() => {
    if (startTime) {
      localStorage.setItem("startTime", startTime);
    } else {
      localStorage.removeItem("startTime");
    }
    localStorage.setItem("elapsedTime", elapsedTime);
    localStorage.setItem("totalWorkingTime", totalWorkingTime);
  }, [startTime, elapsedTime, timeSheetData, totalWorkingTime]);

  useEffect(() => {
    console.log("timerOn state updated:", timerOn);
  }, [timerOn]);

  const startTimer = (start) => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - start.getTime()) / 1000));
    }, 1000);
    setTimerInterval(interval);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      setIsScannerOpen(false);
    }
  };

  const checkCameraPermission = () => {
    navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
      if (permissionStatus.state === "granted") {
        setCameraPermission(true);
      } else {
        setCameraPermission(false);
        showToast("Please allow camera access to scan the QR code", "error");
      }
    });
  };

  const handleClockIn = async () => {
    checkCameraPermission();

    if (!cameraPermission) {
      showToast("Please allow camera access before clocking in.", "error");
      return;
    }

    if (!location.lat || !location.long) {
      showToast("Unable to fetch your location. Please try again.");
      return;
    }
    setIsScannerOpen(true);

    const scanPromise = new Promise((resolve) => {
      const interval = setInterval(() => {
        if (scanResult) {
          clearInterval(interval);
          resolve(scanResult);
        }
      }, 500);
    });

    const qrData = await scanPromise;
    console.log("qrcodedata", qrData);
    if (!qrData) {
      showToast("QR code scan failed. Please try again.", "error");
      return;
    }
    setIsScannerOpen(false);

    const body = {
      userId,
      location: {
        latitude: location.lat,
        longitude: location.long,
      },
      // qrData,
    };

    const response = await PostCall(`/clockin`, body);
    try {
      if (response.data.status === 200) {
        const { timesheet } = response.data;
        const now = new Date();
        setStartTime(now);
        setEndTime(null);
        setElapsedTime(0);
        startTimer(now);
        setTimeSheetData(timesheet.clockinTime);
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error while clocking in:", error);
      showToast(error, "error");
    }
  };

  const handleClockOut = async () => {
    if (!location.lat || !location.long) {
      showToast("Unable to fetch your location. Please try again.", "error");
      return;
    }

    const body = {
      userId,
      location: {
        latitude: location.lat,
        longitude: location.long,
      },
    };
    const response = await PostCall(`/clockout`, body);
    try {
      if (response.data.status === 200) {
        const { timesheet } = response?.data;
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTimeSheetData(timesheet.clockinTime);
        setTotalWorkingTime(timesheet.totalHours);

        setStartTime(null);
        setElapsedTime(0);
        localStorage.removeItem("startTime");
        localStorage.removeItem("elapsedTime");

        showToast(response?.data?.message, "success");
      } else {
        showToast(response?.data?.message, "error");
      }
    } catch (error) {
      console.error("Error clocking out:", error);
      showToast(response?.data?.message);
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#555" }}>
        {moment().format("llll")}
      </h2>
      {isScannerOpen && (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "400px", height: "400px" }}
          facingMode="environment"
        />
      )}

      {scanResult && <p>QR Code Data: {scanResult}</p>}

      <div className="button-container">
        <button onClick={handleClockIn} className="clock-in-btn">
          Clock In
        </button>
        <span className="timer">Timer: {formatTime(elapsedTime)}</span>
        <button onClick={handleClockOut} className="clock-out-btn">
          Clock Out
        </button>
      </div>
      {timeSheetData?.length > 0 ? (
        <div className="total-working-time">
          Total Working Time: <b>{totalWorkingTime}</b>
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : timeSheetData?.length > 0 ? (
        <table className="location-table">
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Working Time</th>
            </tr>
          </thead>
          <tbody>
            {timeSheetData?.map((entry, index) => (
              <tr key={index}>
                <td>{moment(entry.clockIn).format("L LTS")}</td>
                <td>
                  {entry.clockOut ? (
                    moment(entry.clockOut).format("L LTS")
                  ) : (
                    <b className="active">Active</b>
                  )}
                </td>
                <td>
                  {entry.totalTiming !== "0" ? (
                    entry.totalTiming
                  ) : (
                    <BsHourglassSplit />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data-wrapper"></div>
      )}
    </div>
  );
};

export default CheckIn;
