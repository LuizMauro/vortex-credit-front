import { create, type StateCreator } from 'zustand';

const API_BASE =
  (typeof import.meta !== 'undefined' &&
    (import.meta as unknown as Record<string, Record<string, string>>).env
      ?.VITE_API_URL) ||
  'http://localhost:5000';

const REQUEST_TIMEOUT = 15_000;

async function carteiraFetch<T>(path: string, init?: RequestInit): Promise<T> {
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

export interface CarteiraResumo {
  saldo: number;
  aReceber: number;
  antecipado: number;
}

export interface CarteiraState {
  resumo: CarteiraResumo | null;
  loading: boolean;
  error: string | null;
  carregarResumo: () => Promise<void>;
}

const storeCreator: StateCreator<CarteiraState> = (set) => ({
  resumo: null,
  loading: false,
  error: null,

  carregarResumo: async () => {
    set({ loading: true, error: null });
    try {
      const data = await carteiraFetch<CarteiraResumo>('/api/auth/profile');
      set({ resumo: data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Erro ao carregar carteira',
      });
    }
  },
});

export const useCarteiraStore = create<CarteiraState>()(storeCreator);
