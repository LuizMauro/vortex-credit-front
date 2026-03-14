import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { cssVariables, globalStyles } from '@vortex/design-system';
import { App } from './App';

const style = document.createElement('style');
style.textContent = cssVariables + globalStyles;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
