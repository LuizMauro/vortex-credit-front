import React from 'react';
import { useAuthStore, type Estabelecimento } from '@vortex/store';
import { Card, Text, Badge, tokens } from '@vortex/design-system';

const mockEstabelecimentos: Estabelecimento[] = [
  { id: '1', nome: 'Posto Vortex Centro', tipo: 'posto', cnpj: '12.345.678/0001-01' },
  { id: '2', nome: 'Loja Vortex Mall', tipo: 'loja', cnpj: '12.345.678/0002-02' },
  { id: '3', nome: 'Distribuidora Vortex Sul', tipo: 'distribuidora', cnpj: '12.345.678/0003-03' },
];

const tipoLabel: Record<Estabelecimento['tipo'], string> = {
  posto: 'Posto',
  loja: 'Loja',
  distribuidora: 'Distribuidora',
};

export const EstabelecimentoList: React.FC = () => {
  const selecionar = useAuthStore((s) => s.selecionarEstabelecimento);
  const ativo = useAuthStore((s) => s.estabelecimentoAtivo);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {mockEstabelecimentos.map((est) => (
        <Card
          key={est.id}
          hover
          onClick={() => selecionar(est)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: ativo?.id === est.id
              ? `2px solid ${tokens.colors.accent}`
              : `1px solid ${tokens.colors.border}`,
          }}
        >
          <div>
            <Text weight="semibold" size="lg">{est.nome}</Text>
            <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginTop: 2 }}>
              {est.cnpj}
            </Text>
          </div>
          <Badge variant={ativo?.id === est.id ? 'success' : 'default'}>
            {ativo?.id === est.id ? 'Ativo' : tipoLabel[est.tipo]}
          </Badge>
        </Card>
      ))}
    </div>
  );
};
