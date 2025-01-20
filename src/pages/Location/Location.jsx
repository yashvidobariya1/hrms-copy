import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router";
import "./Location.css";
import Loader from "../Helper/Loader";
import { GetCall, PostCall } from "../../ApiServices";
import { showToast } from "../../main/ToastManager";
import DeleteConfirmation from "../../main/DeleteConfirmation";
import CommonTable from "../../SeparateCom/CommonTable";
import Pagination from "../../main/Pagination";

const Location = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [ShowdropwornAction, SetShowdropwornAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [locationPerPage, setLocationPerPage] = useState(10);

  const handleAction = (id) => {
    SetShowdropwornAction(ShowdropwornAction === id ? null : id);
  };

  const GoTOAddLocation = () => {
    navigate("/location/addlocation");
  };

  const indexOfLastLocation = currentPage * locationPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationPerPage;
  const currentData = locationList.slice(
    indexOfFirstLocation,
    indexOfLastLocation
  );
  const totalPages = Math.ceil(locationList.length / locationPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const HandleEditLocation = async (id) => {
    navigate(`/location/editlocation/${id}`);
    SetShowdropwornAction(null);
  };

  const HandleDeleteLocation = async (id, name) => {
    setLocationName(name);
    setLocationId(id);
    setShowConfirm(true);
  };

  const GetLocations = async () => {
    try {
      setLoading(true);
      const response = await GetCall("/getAllLocation");
      if (response?.data?.status === 200) {
        setLocationList(response?.data?.locations);
      } else {
        showToast(response?.data?.message, "error");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    SetShowdropwornAction(null);
  };

  const confirmDelete = async (id) => {
    setShowConfirm(false);
    SetShowdropwornAction(null);
    try {
      setLoading(true);
      const response = await PostCall(`/deleteLocation/${id}`);
      if (response?.data?.status === 200) {
        showToast(response?.data?.message, "success");
        navigate("/location");
      } else {
        showToast(response?.data?.message, "error");
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
    GetLocations();
  };

  useEffect(() => {
    GetLocations();
  }, []);

  const headers = ["Location Name", "Address", "City", "Post Code", "Action"];

  const handlePerPageChange = (e) => {
    setLocationPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };
  const actionsList = [
    {
      label: "Edit",
      onClick: HandleEditLocation,
    },
    {
      label: "Delete",
      onClick: HandleDeleteLocation,
    },
  ];

  return (
    <div className="location-list-container">
      <div className="locationlist-flex">
        <div className="locationlist-title">
          <h2>Location List</h2>
        </div>
        <div className="locationlist-action">
          <button onClick={GoTOAddLocation}>
            <FaLocationDot className="location-action-icon" />
            Add Location
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        <>
          <CommonTable
            headers={headers}
            data={currentData.map((location) => ({
              _id: location._id,
              locationName: location.locationName,
              address: location.address,
              city: location.city,
              postcode: location.postcode,
            }))}
            actions={{
              ShowdropwornAction,
              actionsList,
              onEdit: HandleEditLocation,
              onDelete: HandleDeleteLocation,
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showPerPage={locationPerPage}
            OnPerPageChange={handlePerPageChange}
            handleAction={handleAction}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            ShowperPage={locationPerPage}
            OnPerPageChange={handlePerPageChange}
          />

          {showConfirm && (
            <DeleteConfirmation
              name={locationName}
              onConfirm={() => confirmDelete(locationId)}
              onCancel={cancelDelete}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Location;
