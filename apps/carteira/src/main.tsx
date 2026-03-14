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
const state = useAuthStore.getState();
state.login({ id: '1', nome: 'Dev User', email: 'dev@vortex.com' });
state.selecionarEstabelecimento({
  id: '1', nome: 'Posto Vortex Centro', tipo: 'posto', cnpj: '12.345.678/0001-01',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
