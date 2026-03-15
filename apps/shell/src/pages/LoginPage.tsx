import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@vortex/store';
import { Button, Input, Heading, Text, Card, tokens } from '@vortex/design-system';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: '1', nome: 'Luiz Operador', email: email || 'luiz@vortex.com' });
    navigate('/core');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tokens.colors.background,
      }}
    >
      <Card style={{ width: 400, padding: 36 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
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
          <Button type="submit" fullWidth style={{ marginTop: 4, alignSelf: 'stretch' }}>
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};
