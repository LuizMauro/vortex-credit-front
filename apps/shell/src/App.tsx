import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '@vortex/design-system';
import { RequireAuth } from './components/RequireAuth';
import { RequireEstabelecimento } from './components/RequireEstabelecimento';
import { MfeBoundary } from './components/MfeBoundary';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './components/Layout';

const CoreApp = lazy(() => import('mfe_core/App'));
const CarteiraApp = lazy(() => import('mfe_carteira/App'));

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    <Spinner size={36} />
  </div>
);

export const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<RequireAuth />}>
      <Route element={<Layout />}>
        <Route
          path="/core"
          element={
            <MfeBoundary name="Core">
              <Suspense fallback={<Loading />}>
                <CoreApp />
              </Suspense>
            </MfeBoundary>
          }
        />
        <Route element={<RequireEstabelecimento />}>
          <Route
            path="/carteira/*"
            element={
              <MfeBoundary name="Carteira">
                <Suspense fallback={<Loading />}>
                  <CarteiraApp />
                </Suspense>
              </MfeBoundary>
            }
          />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/core" replace />} />
  </Routes>
);
