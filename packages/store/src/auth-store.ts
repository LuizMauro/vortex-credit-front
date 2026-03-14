import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export interface Estabelecimento {
  id: string;
  nome: string;
  tipo: 'posto' | 'loja' | 'distribuidora';
  cnpj: string;
}

export interface AuthState {
  usuario: Usuario | null;
  estabelecimentoAtivo: Estabelecimento | null;
  isAuthenticated: boolean;
  login: (usuario: Usuario) => void;
  logout: () => void;
  selecionarEstabelecimento: (est: Estabelecimento) => void;
  limparEstabelecimento: () => void;
}

const STORE_KEY = '__vortex_auth_store__';

function createAuthStore() {
  return create<AuthState>()(
    persist(
      (set) => ({
        usuario: null,
        estabelecimentoAtivo: null,
        isAuthenticated: false,
        login: (usuario) => set({ usuario, isAuthenticated: true }),
        logout: () => set({ usuario: null, estabelecimentoAtivo: null, isAuthenticated: false }),
        selecionarEstabelecimento: (est) => set({ estabelecimentoAtivo: est }),
        limparEstabelecimento: () => set({ estabelecimentoAtivo: null }),
      }),
      { name: 'vortex-auth' },
    ),
  );
}

// Anchor on window so all MFEs share the exact same store instance
const win = globalThis as Record<string, unknown>;
if (!win[STORE_KEY]) {
  win[STORE_KEY] = createAuthStore();
}

export const useAuthStore = win[STORE_KEY] as ReturnType<typeof createAuthStore>;
