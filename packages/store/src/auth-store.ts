import { create, type StateCreator } from 'zustand';
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

const hasLocalStorage = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const storeCreator: StateCreator<AuthState> = (set) => ({
  usuario: null as AuthState['usuario'],
  estabelecimentoAtivo: null as AuthState['estabelecimentoAtivo'],
  isAuthenticated: false,
  login: (usuario: Usuario) => set({ usuario, isAuthenticated: true }),
  logout: () => set({ usuario: null, estabelecimentoAtivo: null, isAuthenticated: false }),
  selecionarEstabelecimento: (est: Estabelecimento) => set({ estabelecimentoAtivo: est }),
  limparEstabelecimento: () => set({ estabelecimentoAtivo: null }),
});

function createAuthStore() {
  if (hasLocalStorage) {
    return create<AuthState>()(persist(storeCreator, { name: 'vortex-auth' }));
  }
  return create<AuthState>()(storeCreator);
}

// Anchor on window so all MFEs share the exact same store instance
const win = globalThis as Record<string, unknown>;
if (!win[STORE_KEY]) {
  win[STORE_KEY] = createAuthStore();
}

export const useAuthStore = win[STORE_KEY] as ReturnType<typeof createAuthStore>;
