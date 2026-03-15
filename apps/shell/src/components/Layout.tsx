import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@vortex/store';
import { tokens, Avatar, Text, Divider } from '@vortex/design-system';

const navItems = [
  { label: 'Estabelecimentos', path: '/core' },
];

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = useAuthStore((s) => s.usuario);
  const estabelecimento = useAuthStore((s) => s.estabelecimentoAtivo);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <aside
        style={{
          width: 260,
          backgroundColor: tokens.colors.white,
          borderRight: `1px solid ${tokens.colors.border}`,
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ padding: '0 8px', marginBottom: 8 }}>
          <Text size="xl" weight="bold">Vortex</Text>
        </div>
        <Divider />
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  padding: '10px 12px',
                  borderRadius: tokens.radii.md,
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                  backgroundColor: active ? tokens.colors.accentLight : 'transparent',
                  color: active ? tokens.colors.accent : tokens.colors.primary,
                  transition: 'background-color 0.15s',
                }}
              >
                {item.label}
              </button>
            );
          })}
          {estabelecimento && (
            <button
              onClick={() => navigate('/carteira')}
              style={{
                padding: '10px 12px',
                borderRadius: tokens.radii.md,
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: location.pathname.startsWith('/carteira') ? 600 : 400,
                backgroundColor: location.pathname.startsWith('/carteira') ? tokens.colors.accentLight : 'transparent',
                color: location.pathname.startsWith('/carteira') ? tokens.colors.accent : tokens.colors.primary,
                transition: 'background-color 0.15s',
              }}
            >
              Carteira
            </button>
          )}
        </nav>

        {estabelecimento && (
          <div style={{
            padding: '10px 12px',
            backgroundColor: tokens.colors.accentLight,
            borderRadius: tokens.radii.md,
            marginBottom: 12,
          }}>
            <Text size="xs" color={tokens.colors.muted}>Estabelecimento ativo</Text>
            <Text size="sm" weight="semibold" style={{ display: 'block', marginTop: 2 }}>
              {estabelecimento.nome}
            </Text>
          </div>
        )}

        <Divider />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px' }}>
          <Avatar nome={usuario?.nome || 'U'} size="sm" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Text size="sm" weight="medium" style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {usuario?.nome}
            </Text>
          </div>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            style={{
              fontSize: '12px',
              color: tokens.colors.muted,
              padding: '4px 8px',
              borderRadius: tokens.radii.sm,
              transition: 'color 0.15s',
            }}
          >
            Sair
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};
