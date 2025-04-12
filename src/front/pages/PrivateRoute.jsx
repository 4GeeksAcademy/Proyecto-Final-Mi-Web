import React from "react";
import { Navigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';

const PrivateRoute = ({ children }) => {
  const { store } = useGlobalReducer();

  const token = store.token || sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
