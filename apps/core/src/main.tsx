import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { VortexProvider, globalStyles } from '@vortex/design-system';
import { useAuthStore } from '@vortex/store';
import App from './App';

const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);

// Mock data for standalone dev
useAuthStore.getState().login({ id: '1', nome: 'Dev User', email: 'dev@vortex.com' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VortexProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VortexProvider>
  </React.StrictMode>,
);
