import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { cssVariables, globalStyles } from '@vortex/design-system';
import { useAuthStore } from '@vortex/store';
import App from './App';

const style = document.createElement('style');
style.textContent = cssVariables + globalStyles;
document.head.appendChild(style);

// Mock data for standalone dev
useAuthStore.getState().login({ id: '1', nome: 'Dev User', email: 'dev@vortex.com' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
