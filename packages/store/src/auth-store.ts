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
  loading: boolean;
  error: string | null;
  loginAsync: (email: string, password: string) => Promise<void>;
  registerAsync: (email: string, password: string) => Promise<void>;
  loadProfile: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  selecionarEstabelecimento: (est: Estabelecimento) => void;
  limparEstabelecimento: () => void;
}

const STORE_KEY = '__vortex_auth_store__';

const hasLocalStorage = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const API_BASE = (typeof import.meta !== 'undefined' && (import.meta as unknown as Record<string, Record<string, string>>).env?.VITE_API_URL) || 'http://localhost:5000';

const REQUEST_TIMEOUT = 15_000; 

async function authFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      signal: controller.signal,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.message || `Erro ${res.status}`);
    }

    const text = await res.text();
    return text ? JSON.parse(text) : ({} as T);
  } finally {
    clearTimeout(timeout);
  }
}

interface LoginResponse {
  user: { id: string; email: string; nome?: string };
}

function toUsuario(u: LoginResponse['user']): Usuario {
  return { id: u.id, nome: u.nome || u.email, email: u.email };
}

const storeCreator: StateCreator<AuthState> = (set) => ({
  usuario: null,
  estabelecimentoAtivo: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  loginAsync: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authFetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      set({ usuario: toUsuario(data.user), isAuthenticated: true, loading: false });
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Erro ao fazer login' });
      throw err;
    }
  },

  registerAsync: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authFetch<LoginResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      set({ usuario: toUsuario(data.user), isAuthenticated: true, loading: false });
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Erro ao registrar' });
      throw err;
    }
  },

  loadProfile: async () => {
    set({ loading: true });
    try {
      const data = await authFetch<{ id: string; email: string; nome?: string }>('/api/auth/profile');
      set({ usuario: toUsuario(data), isAuthenticated: true, loading: false });
    } catch {
      set({ usuario: null, isAuthenticated: false, estabelecimentoAtivo: null, loading: false });
    }
  },

  logout: async () => {
    try {
      await authFetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // even if the request fails, clear local state
    }
    set({ usuario: null, estabelecimentoAtivo: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
  selecionarEstabelecimento: (est) => set({ estabelecimentoAtivo: est }),
  limparEstabelecimento: () => set({ estabelecimentoAtivo: null }),
});

function createAuthStore() {
  if (hasLocalStorage) {
    return create<AuthState>()(
      persist(storeCreator, {
        name: 'vortex-auth',
        partialize: (state) => ({
          usuario: state.usuario,
          estabelecimentoAtivo: state.estabelecimentoAtivo,
          isAuthenticated: state.isAuthenticated,
        }),
      }),
    );
  }
  return create<AuthState>()(storeCreator);
}

const win = globalThis as Record<string, unknown>;
if (!win[STORE_KEY]) {
  win[STORE_KEY] = createAuthStore();
}

export const useAuthStore = win[STORE_KEY] as ReturnType<typeof createAuthStore>;
