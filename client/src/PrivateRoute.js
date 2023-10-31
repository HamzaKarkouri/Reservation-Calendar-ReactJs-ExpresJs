import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check if the user is authenticated (e.g., token exists and not expired)
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return Date.now() < decodedToken.exp * 1000; // Check if token is not expired
    }
    return false;
  };

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
