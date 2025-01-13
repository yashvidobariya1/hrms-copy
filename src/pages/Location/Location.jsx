import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router";
import "./Location.css";
import Pagination from "../../main/Pagination";
import Loader from "../Helper/Loader";
import { GetCall, PostCall } from "../../ApiServices";
import { showToast } from "../../main/ToastManager";
import DeleteConfirmation from "../../main/DeleteConfirmation";

const Location = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [ShowdropwornAction, SetShowdropwornAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const locationPerPage = 10;

  const handleAction = (id) => {
    SetShowdropwornAction(ShowdropwornAction === id ? null : id);
  };

  const GoTOAddLocation = () => {
    navigate("/location/addlocation");
  };

  const indexOfLastLocation = currentPage * locationPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationPerPage;
  const currentlocation = locationList?.slice(
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
      const response = await GetCall("/getalllocation");
      if (response?.data?.status === 200) {
        setLocationList(response?.data?.location);
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
      const response = await PostCall(`/deletelocation/${id}`);
      if (response?.data?.status === 200) {
        showToast(response?.data?.message, "success");
        navigate("/location");
      } else {
        // console.log(response?.data?.message);
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
        currentlocation?.length !== 0 && (
          <>
            <table className="location-table">
              <thead>
                <tr>
                  <th>location Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Post Code</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentlocation?.map((location) => (
                  <tr key={location._id}>
                    <td>{location?.locationName}</td>
                    <td>{location?.address}</td>
                    <td>{location?.city}</td>
                    <td>{location?.postcode}</td>
                    <td className="location-action-buttons">
                      <div className="location-dropdown-container">
                        <SlOptionsVertical
                          onClick={() => handleAction(location?._id)}
                          className="location-action-button"
                        />
                        {ShowdropwornAction === location?._id && (
                          <div className="location-dropdown-menu">
                            <button
                              onClick={() => HandleEditLocation(location?._id)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                HandleDeleteLocation(
                                  location?._id,
                                  location?.locationName
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showConfirm && (
              <DeleteConfirmation
                name={locationName}
                onConfirm={() => confirmDelete(locationId)}
                onCancel={cancelDelete}
              />
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )
      )}
    </div>
  );
};

export default Location;
