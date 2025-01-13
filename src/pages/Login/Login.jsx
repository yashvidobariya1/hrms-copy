import React, { useState } from "react";
import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import { setRole } from "../store/roleSlice";
import "./Login.css";
import { PostCall } from "../../ApiServices";
import { showToast } from "../../main/ToastManager";
// import Loader from "../Helper/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      // setLoading(true);
      const response = await PostCall("/login", formData);
      // console.log("response login ==>", response);
      if (response?.data?.status === 200) {
        localStorage.setItem("userRole", response?.data?.user?.role);
        const userRole = response?.data?.user?.role;
        // dispatch(setRole(userRole));
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.user?.personalDetails)
        );
        localStorage.setItem(
          "userId",
          JSON.stringify(response?.data?.user?._id)
        );
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.user?.token)
        );
        // console.log(response?.data?.user?.personalDetails);
        navigate("/dashboard");
        showToast(response?.data?.message, "success");
      } else {
        // console.log(response?.data?.message);
        showToast(response?.data?.message, "error");
      }
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div className="main-login">
      <div className="login-section">
        <div className="login-bg">
          <img src="/image/login-bg.png" alt="login-img" />
        </div>
        <div className="login-form">
          <div className="form-container">
            <h1>Welcome to HRMS</h1>
            <p>Login your account</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  className="login-input"
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="error-text">{errors?.email}</span>
                )}
              </div>
              <div className="form-group">
                <label>Password*</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData?.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="login-input"
                  />
                  <span
                    className="toggle-password"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && (
                  <span className="error-text">{errors?.password}</span>
                )}
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
