import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // Redux store se user uthao
  const user = useSelector((state) => state.auth.user);

  // agar login nahi hai → login page bhej do
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // agar login hai → actual component render karo
  return children;
};

export default ProtectedRoute;
