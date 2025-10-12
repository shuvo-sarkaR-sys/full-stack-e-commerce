import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    //  If no token, redirect to login page
    return <Navigate to="/login" />;
  }

  //  If token exists, allow access to protected page
  return children;
}
