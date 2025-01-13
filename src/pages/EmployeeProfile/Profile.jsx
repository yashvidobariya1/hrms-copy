import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const userRole = localStorage.getItem("userRole");
  return (
    <div className="profile-main-section">
      <div className="profile-container-flex">
        <div className="profile-content">
          <div className="profile-flex">
            <div className="profile-image">
              <img src="/image/profile.png" />
              <div className="profile-role">
                <h1>
                  {user?.firstName} {user?.lastName}
                </h1>
                <p>{userRole}</p>
              </div>
            </div>
            <div className="profile-div-section">
              <div className="profile-container">
                <label className="label">First Name</label>
                <input
                  disabled
                  type="text"
                  value={user?.firstName}
                  name="companyName"
                  className="profile-input"
                />
              </div>
              <div className="profile-container">
                <label className="label">Middle Name</label>
                <input
                  disabled
                  type="text"
                  value={user?.middleName}
                  name="payeReferenceNumber"
                  className="profile-input"
                />
              </div>
            </div>

            <div className="profile-div-section">
              <div className="profile-container">
                <label className="label">Last Name</label>
                <input
                  disabled
                  type="text"
                  value={user?.lastName}
                  name="addressLine2"
                  className="profile-input"
                />
              </div>
              <div className="profile-container">
                <label className="label">Date of Birth</label>
                <input
                  disabled
                  type="text"
                  value={user?.dateOfBirth}
                  name="addressLine2"
                  className="profile-input"
                />
              </div>
            </div>

            <div className="profile-div-section">
              <div className="profile-container">
                <label className="label">Gender</label>
                <input
                  disabled
                  type="text"
                  value={user?.gender}
                  name="companyName"
                  className="profile-input"
                />
              </div>
              <div className="profile-container">
                <label className="label">Marital Status</label>
                <input
                  disabled
                  type="text"
                  value={user?.maritalStatus}
                  name="payeReferenceNumber"
                  className="profile-input"
                />
              </div>
            </div>

            <div className="profile-div-section">
              <div className="profile-container">
                <label className="label">Phone</label>
                <input
                  disabled
                  type="text"
                  value={user?.phone}
                  name="payeReferenceNumber"
                  className="profile-input"
                />
              </div>
              <div className="profile-container">
                <label className="label">Home Telephone</label>
                <input
                  disabled
                  type="text"
                  value={user?.homeTelephone}
                  name="addressLine2"
                  className="profile-input"
                />
              </div>
            </div>

            <div className="profile-div-section">
              <div className="profile-container">
                <label className="label">Email</label>
                <input
                  disabled
                  type="text"
                  className="profile-input"
                  value={user?.email}
                />
              </div>
              <div className="profile-container">
                <label className="label">NI Number</label>
                <input
                  disabled
                  type="text"
                  className="profile-input"
                  value={user?.niNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
