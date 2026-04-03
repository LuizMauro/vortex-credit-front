import React, { useState } from 'react';
import { Heading, Text, Card, Badge, Button, Divider, tokens, useIsMobile } from '@vortex/design-system';

type Tipo = 'todos' | 'credito' | 'debito';

const transacoes = [
  { id: 1, desc: 'Venda Visa Crédito', valor: 1230, tipo: 'credito' as const, data: '2025-05-28' },
  { id: 2, desc: 'Antecipação Mastercard', valor: 3800, tipo: 'credito' as const, data: '2025-05-27' },
  { id: 3, desc: 'Taxa administrativa', valor: -45, tipo: 'debito' as const, data: '2025-05-27' },
  { id: 4, desc: 'Venda Elo Débito', valor: 890, tipo: 'credito' as const, data: '2025-05-26' },
  { id: 5, desc: 'Transferência para conta', valor: -10000, tipo: 'debito' as const, data: '2025-05-25' },
  { id: 6, desc: 'Venda Hipercard Crédito', valor: 560, tipo: 'credito' as const, data: '2025-05-24' },
  { id: 7, desc: 'Aluguel POS', valor: -120, tipo: 'debito' as const, data: '2025-05-23' },
];

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const Extrato: React.FC = () => {
  const [filtro, setFiltro] = useState<Tipo>('todos');
  const isMobile = useIsMobile();
  const filtered = filtro === 'todos' ? transacoes : transacoes.filter((t) => t.tipo === filtro);

  return (
    <div>
      <Heading as="h3">Extrato</Heading>
      <Text size="sm" color={tokens.colors.muted} style={{ display: 'block', marginTop: 4, marginBottom: 20 }}>
        Transações do estabelecimento
      </Text>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {(['todos', 'credito', 'debito'] as Tipo[]).map((t) => (
          <Button
            key={t}
            variant={filtro === t ? 'primary' : 'secondary'}
            onClick={() => setFiltro(t)}
            style={{ padding: '7px 16px' }}
          >
            {t === 'todos' ? 'Todos' : t === 'credito' ? 'Crédito' : 'Débito'}
          </Button>
        ))}
      </div>

      <Card style={{ padding: isMobile ? '8px 16px' : '8px 24px' }}>
        {filtered.map((t, i) => (
          <React.Fragment key={t.id}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              padding: '14px 0',
              gap: isMobile ? 8 : 0,
            }}>
              <div>
                <Text weight="medium">{t.desc}</Text>
                <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginTop: 2 }}>
                  {t.data}
                </Text>
              </div>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: isMobile ? 'center' : 'flex-end', gap: 4 }}>
                <Text weight="semibold" color={t.valor >= 0 ? tokens.colors.success : tokens.colors.danger}>
                  {t.valor >= 0 ? '+ ' : ''}{fmt(t.valor)}
                </Text>
                <Badge variant={t.tipo === 'credito' ? 'success' : 'danger'}>
                  {t.tipo === 'credito' ? 'Crédito' : 'Débito'}
                </Badge>
              </div>
            </div>
            {i < filtered.length - 1 && <Divider style={{ margin: 0 }} />}
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
};
