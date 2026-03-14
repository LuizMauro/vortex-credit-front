import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

const coreUrl = process.env.VITE_MFE_CORE_URL || 'http://localhost:3001';
const carteiraUrl = process.env.VITE_MFE_CARTEIRA_URL || 'http://localhost:3002';

// Cache-busting: timestamp muda a cada build, forçando o browser a buscar o remoteEntry novo
const cacheBust = `?v=${Date.now()}`;

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        mfe_core: `${coreUrl}/assets/remoteEntry.js${cacheBust}`,
        mfe_carteira: `${carteiraUrl}/assets/remoteEntry.js${cacheBust}`,
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        'react-router-dom': { singleton: true, requiredVersion: '^6.0.0' },
        zustand: { singleton: true, requiredVersion: '^5.0.0' },
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: false,
  },
  // SPA fallback: qualquer rota desconhecida retorna index.html
  appType: 'spa',
});
