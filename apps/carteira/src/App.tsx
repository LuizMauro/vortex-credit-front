import React from 'react';
import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom';
import { tokens } from '@vortex/design-system';
import { VisaoGeral } from './pages/VisaoGeral';
import { Extrato } from './pages/Extrato';
import { Recebiveis } from './pages/Recebiveis';

const tabs = [
  { label: 'Visão Geral', path: '' },
  { label: 'Extrato', path: 'extrato' },
  { label: 'Recebíveis', path: 'recebiveis' },
];

const App: React.FC = () => {
  const location = useLocation();
  const basePath = '/carteira';

  return (
    <div>
      <nav style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
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
                padding: '8px 16px',
                borderRadius: tokens.radii.full,
                fontSize: '13px',
                fontWeight: active ? 600 : 400,
                backgroundColor: active ? tokens.colors.primary : 'transparent',
                color: active ? tokens.colors.white : tokens.colors.muted,
                textDecoration: 'none',
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
