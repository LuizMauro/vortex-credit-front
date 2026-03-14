import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@vortex/store';
import { tokens, Avatar, Text, Divider } from '@vortex/design-system';

const navItems = [{ label: 'Estabelecimentos', path: '/core' }];

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = useAuthStore((s) => s.usuario);
  const estabelecimento = useAuthStore((s) => s.estabelecimentoAtivo);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 240,
          backgroundColor: tokens.colors.white,
          borderRight: `1px solid ${tokens.colors.border}`,
          padding: tokens.spacing.lg,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text size="xl" weight="bold" style={{ fontFamily: tokens.fonts.display }}>
          Vortex
        </Text>
        <Divider />
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
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
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        {estabelecimento && (
          <div style={{ marginBottom: 12 }}>
            <Text size="xs" color={tokens.colors.muted}>
              Ativo:
            </Text>
            <Text size="sm" weight="semibold">
              {' '}
              {estabelecimento.nome}
            </Text>
          </div>
        )}
        <Divider />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar nome={usuario?.nome || 'U'} size="sm" />
          <div style={{ flex: 1 }}>
            <Text size="sm" weight="medium">
              {usuario?.nome}
            </Text>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            style={{ fontSize: '12px', color: tokens.colors.muted }}
          >
            Sair
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: tokens.spacing.xl }}>
        <Outlet />
      </main>
    </div>
  );
};
