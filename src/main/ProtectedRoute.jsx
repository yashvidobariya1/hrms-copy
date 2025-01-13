import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // const userRole = useSelector((state) => state.role.currentRole);
  const userRole = localStorage.getItem("userRole");

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
