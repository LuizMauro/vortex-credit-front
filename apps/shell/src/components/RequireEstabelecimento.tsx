import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@vortex/store';

export const RequireEstabelecimento: React.FC = () => {
  const est = useAuthStore((s) => s.estabelecimentoAtivo);
  return est ? <Outlet /> : <Navigate to="/core" replace />;
};
