import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@vortex/store';

export const RequireAuth: React.FC = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
