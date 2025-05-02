import { JSX } from '@emotion/react/jsx-runtime';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token || token == "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
