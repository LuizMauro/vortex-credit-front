import React from 'react';
import { useAuthStore, type Estabelecimento } from '@vortex/store';
import { Card, Text, Badge, tokens, useIsMobile } from '@vortex/design-system';

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
  const isMobile = useIsMobile();

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {mockEstabelecimentos.map((est) => {
        const isActive = ativo?.id === est.id;
        return (
          <Card
            key={est.id}
            hover
            onClick={() => selecionar(est)}
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              padding: isMobile ? '14px 16px' : '16px 20px',
              gap: isMobile ? 10 : 0,
              border: isActive
                ? `2px solid ${tokens.colors.accent}`
                : `1px solid ${tokens.colors.border}`,
              backgroundColor: isActive ? tokens.colors.accentLight : tokens.colors.white,
            }}
          >
            <div>
              <Text weight="semibold" size={isMobile ? 'md' : 'lg'}>{est.nome}</Text>
              <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginTop: 4 }}>
                {est.cnpj}
              </Text>
            </div>
            <Badge variant={isActive ? 'success' : 'default'}>
              {isActive ? 'Ativo' : tipoLabel[est.tipo]}
            </Badge>
          </Card>
        );
      })}
    </div>
  );
};
