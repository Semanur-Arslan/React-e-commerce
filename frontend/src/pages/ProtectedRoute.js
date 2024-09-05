import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Profile from './Profile';

function ProtectedRoute() {
  const { loggedIn, user } = useAuth();
  return (
    loggedIn ? <Profile /> : <Navigate to="/signin" replace />
  )
}

export default ProtectedRoute;

