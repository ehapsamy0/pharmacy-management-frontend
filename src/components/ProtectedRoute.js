// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { roleAccess } from '../config/roleAccess';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');
  const location = useLocation();

  const isAuthorized = userRole && roleAccess[userRole]?.includes(location.pathname);

  if (!userRole || !allowedRoles.includes(userRole) || !isAuthorized) {
    // Redirect to Not Authorized page
    return <Navigate to="/not-authorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
