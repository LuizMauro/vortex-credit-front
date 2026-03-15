import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { VortexProvider, globalStyles } from '@vortex/design-system';
import { App } from './App';

const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VortexProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VortexProvider>
  </React.StrictMode>,
);
