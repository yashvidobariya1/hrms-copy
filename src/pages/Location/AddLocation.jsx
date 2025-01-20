import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./AddLocation.css";
import { GetCall, PostCall } from "../../ApiServices";
import Loader from "../Helper/Loader";
import { showToast } from "../../main/ToastManager";

const AddLocation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const [formData, setFormData] = useState({
    companyName: "",
    payeReferenceNumber: "",
    locationName: "",
    address: "",
    addressLine2: "",
    city: "",
    postcode: "",
    country: "",
    ukviApproved: false,
  });

  const validate = () => {
    let newErrors = {};
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.locationName) {
      newErrors.locationName = "location Name is required";
    }
    if (!formData.postcode) {
      newErrors.postcode = "Postcode is required";
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      // console.log("Form Data Submitted:", formData);
      try {
        setLoading(true);
        let response;
        if (id) {
          response = await PostCall(`/updateLocation/${id}`, formData);
        } else {
          response = await PostCall("/addLocation", formData);
        }
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
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    const GetLocationDetails = async () => {
      try {
        setLoading(true);
        const response = await GetCall(`/getLocation/${id}`);
        if (response?.data?.status === 200) {
          setFormData(response?.data?.location);
        } else {
          showToast(response?.data?.message, "error");
        }
        setLoading(false);
        // console.log("response", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id) {
      GetLocationDetails(id);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="Addlocation-container">
        <div className="Addlocation-step-content">
          <div className="addlocation-flex">
            <div className="addlocation-section">
              <div className="addlocation-container">
                <label className="label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData?.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="addlocation-input"
                />
              </div>
              <div className="addlocation-container">
                <label className="label">PAYE Reference Number</label>
                <input
                  type="text"
                  name="payeReferenceNumber"
                  value={formData?.payeReferenceNumber}
                  onChange={handleChange}
                  placeholder="Enter PAYE reference number"
                  className="addlocation-input"
                />
              </div>
              <div className="addlocation-container">
                <label className="label">Location Name*</label>
                <input
                  type="text"
                  name="locationName"
                  className="addlocation-input"
                  value={formData?.locationName}
                  onChange={handleChange}
                  placeholder="Enter location name"
                />
                {errors?.locationName && (
                  <p className="location-error-text">{errors?.locationName}</p>
                )}
              </div>
            </div>

            <div className="addlocation-section">
              <div className="addlocation-container">
                <label className="label">Address*</label>
                <input
                  type="text"
                  name="address"
                  className="addlocation-input"
                  value={formData?.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                />
                {errors?.address && (
                  <p className="location-error-text">{errors?.address}</p>
                )}
              </div>
              <div className="addlocation-container">
                <label className="label">Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData?.addressLine2}
                  className="addlocation-input"
                  onChange={handleChange}
                  placeholder="Enter Address Line 2"
                />
              </div>
              <div className="addlocation-container">
                <label className="label">City*</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  className="addlocation-input"
                  onChange={handleChange}
                  placeholder="Enter city"
                />
                {errors?.city && (
                  <p className="location-error-text">{errors?.city}</p>
                )}
              </div>
            </div>

            <div className="addlocation-section">
              <div className="addlocation-container">
                <label className="label">Post Code*</label>
                <input
                  type="text"
                  name="postcode"
                  className="addlocation-input"
                  value={formData?.postcode}
                  onChange={handleChange}
                  placeholder="Enter post code"
                />
                {errors?.postcode && (
                  <p className="location-error-text">{errors?.postcode}</p>
                )}
              </div>

              <div className="addlocation-container">
                <label className="label">Country*</label>
                <select
                  className="addlocation-input checkbox-country"
                  name="country"
                  value={formData?.country}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  <option value="UK">UK</option>
                  <option value="USA">USA</option>
                </select>
                {errors?.country && (
                  <p className="location-error-text">{errors?.country}</p>
                )}
              </div>
            </div>

            <div className="location-approval-link">
              <input
                type="checkbox"
                name="ukviApproved"
                checked={formData?.ukviApproved}
                onChange={handleChange}
              />
              <label className="ukvi-label">UKVI approved?</label>
            </div>
            <div className="addlocation-note">
              <p>
                Ensure that the branch location is approved by the Home Office.
                If uncertain, please verify with the original license
                application, if any sponsored migrant employee is assigned to a
                branch not approved by Home office
              </p>
            </div>
            <button type="submit" className="save-button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddLocation;
