import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@vortex/store';
import { Heading, Text, Button, tokens } from '@vortex/design-system';
import { EstabelecimentoList } from './components/EstabelecimentoList';

const App: React.FC = () => {
  const navigate = useNavigate();
  const est = useAuthStore((s) => s.estabelecimentoAtivo);

  return (
    <div style={{ maxWidth: 640 }}>
      <Heading as="h2">Estabelecimentos</Heading>
      <Text size="sm" color={tokens.colors.muted} style={{ display: 'block', margin: '8px 0 24px' }}>
        Selecione o estabelecimento para operar
      </Text>
      <EstabelecimentoList />
      {est && (
        <Button onClick={() => navigate('/carteira')} style={{ marginTop: 24 }}>
          Ir para Carteira →
        </Button>
      )}
    </div>
  );
};

export default App;
