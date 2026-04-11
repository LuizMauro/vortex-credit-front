import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@vortex/store';
import { Button, Input, Heading, Text, Card, tokens, useIsMobile } from '@vortex/design-system';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const loginAsync = useAuthStore((s) => s.loginAsync);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !senha) return;

    try {
      await loginAsync(trimmedEmail, senha);
      navigate('/core');
    } catch {
      // error is already set in the store
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tokens.colors.background,
        padding: isMobile ? '20px 16px' : 0,
      }}
    >
      <Card style={{ width: '100%', maxWidth: 400, padding: isMobile ? 24 : 36 }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 28 }}>
          <Heading as="h2">Vortex Credit</Heading>
          <Text size="sm" color={tokens.colors.muted} style={{ display: 'block', marginTop: 6 }}>
            Acesse sua conta
          </Text>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {error && (
            <Text size="sm" color={tokens.colors.danger} style={{ textAlign: 'center' }}>
              {error}
            </Text>
          )}
          <Button type="submit" fullWidth disabled={loading} style={{ marginTop: 4, alignSelf: 'stretch' }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
