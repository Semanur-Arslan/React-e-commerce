import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Admin from './index';
import { useAuth } from '../../contexts/AuthContext';

function ProtectedRouteAdmin() {
  const { loggedIn, user } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Admin />;
}

export default ProtectedRouteAdmin;

