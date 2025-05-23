import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/context/UserAuth";


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!token || !user?.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
