import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import "./Header.css";

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const [theme, setTheme] = useState("light");
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    console.log("local theme", savedTheme);
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.createRef();
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
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
              <li>
                Theme{" "}
                <select
                  className="header-theme"
                  value={theme}
                  onChange={handleThemeChange}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </li>

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
