import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@vortex/store';
import { tokens, Avatar, Text, Divider, useIsMobile } from '@vortex/design-system';

const navItems = [
  { label: 'Estabelecimentos', path: '/core' },
];

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = useAuthStore((s) => s.usuario);
  const estabelecimento = useAuthStore((s) => s.estabelecimentoAtivo);
  const logout = useAuthStore((s) => s.logout);
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    if (isMobile) setMenuOpen(false);
  };

  const sidebar = (
    <aside
      style={{
        width: isMobile ? '100%' : 260,
        backgroundColor: tokens.colors.white,
        borderRight: isMobile ? 'none' : `1px solid ${tokens.colors.border}`,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        ...(isMobile
          ? {
              position: 'fixed',
              top: 56,
              left: 0,
              bottom: 0,
              zIndex: 50,
              borderTop: `1px solid ${tokens.colors.border}`,
            }
          : {}),
      }}
    >
      {!isMobile && (
        <>
          <div style={{ padding: '0 8px', marginBottom: 8 }}>
            <Text size="xl" weight="bold">Vortex</Text>
          </div>
          <Divider />
        </>
      )}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
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
            onClick={() => handleNav('/carteira')}
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
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      {isMobile && (
        <header
          style={{
            height: 56,
            backgroundColor: tokens.colors.white,
            borderBottom: `1px solid ${tokens.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            position: 'sticky',
            top: 0,
            zIndex: 51,
          }}
        >
          <Text size="lg" weight="bold">Vortex</Text>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ fontSize: 24, padding: '4px 8px' }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </header>
      )}

      <div style={{ display: 'flex', flex: 1 }}>
        {isMobile ? menuOpen && sidebar : sidebar}

        {(!isMobile || !menuOpen) && (
          <main style={{ flex: 1, padding: isMobile ? '20px 16px' : '32px 40px', overflowY: 'auto' }}>
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
};
