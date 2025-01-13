import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import "./Header.css";

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.createRef();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const userRole = localStorage.getItem("userRole");
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // const closeDropdown = () => {
  //   setIsDropdownOpen(false);
  // };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <section className="home-section">
      <div className="home-content">
        <IoIosMenu className="Header-Toggle-menu" onClick={toggleSidebar} />
        <span className="text">
          <MdOutlineNotificationsActive className="header-notification" />
          <div className="profile-name">
            <p>{user?.firstName}</p>
            <h6>{userRole}</h6>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/image/profile.png"}
            alt="Profile"
            onClick={toggleDropdown}
          />
        </span>
        {isDropdownOpen && (
          <div className="profile-dropdown-menu" ref={dropdownRef}>
            <ul>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <Link to="/changepassword">
                <li>Change Password</li>
              </Link>
              <Link to="/" onClick={handleLogout}>
                <li>Logout</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
