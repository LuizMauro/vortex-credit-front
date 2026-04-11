import React, { useEffect } from 'react';
import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom';
import { tokens } from '@vortex/design-system';
import { VisaoGeral } from './pages/VisaoGeral';
import { Extrato } from './pages/Extrato';
import { Recebiveis } from './pages/Recebiveis';

import { useCarteiraStore } from './store/carteira-store'

const tabs = [
  { label: 'Visão Geral', path: '' },
  { label: 'Extrato', path: 'extrato' },
  { label: 'Recebíveis', path: 'recebiveis' },
];

const App: React.FC = () => {
  const { carregarResumo } = useCarteiraStore();
  const location = useLocation();
  const basePath = '/carteira';


  useEffect(() => { carregarResumo(); }, []);

  return (
    <div>
      <nav style={{
        display: 'inline-flex',
        gap: 4,
        marginBottom: 28,
        padding: 4,
        backgroundColor: tokens.colors.white,
        borderRadius: tokens.radii.full,
        border: `1px solid ${tokens.colors.border}`,
      }}>
        {tabs.map((tab) => {
          const fullPath = tab.path ? `${basePath}/${tab.path}` : basePath;
          const active = tab.path
            ? location.pathname.includes(tab.path)
            : location.pathname === basePath;
          return (
            <NavLink
              key={tab.path}
              to={fullPath}
              style={{
                padding: '8px 18px',
                borderRadius: tokens.radii.full,
                fontSize: '13px',
                fontWeight: active ? 600 : 400,
                backgroundColor: active ? tokens.colors.primary : 'transparent',
                color: active ? tokens.colors.white : tokens.colors.muted,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </NavLink>
          );
        })}
      </nav>
      <Routes>
        <Route index element={<VisaoGeral />} />
        <Route path="extrato" element={<Extrato />} />
        <Route path="recebiveis" element={<Recebiveis />} />
        <Route path="*" element={<Navigate to={basePath} replace />} />
      </Routes>
    </div>
  );
};

export default App;
