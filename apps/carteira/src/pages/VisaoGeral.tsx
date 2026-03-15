import React from 'react';
import { useAuthStore } from '@vortex/store';
import { Heading, Text, Card, Badge, Divider, tokens } from '@vortex/design-system';

const stats = [
  { label: 'Saldo disponível', value: 'R$ 42.850,00', variant: 'success' as const, tag: 'Disponível' },
  { label: 'A receber (30d)', value: 'R$ 18.320,00', variant: 'info' as const, tag: 'Pendente' },
  { label: 'Antecipado', value: 'R$ 7.500,00', variant: 'warning' as const, tag: 'Antecipado' },
];

const movimentacoes = [
  { desc: 'Venda Visa Crédito', valor: '+ R$ 1.230,00', tipo: 'credito', data: '28/05' },
  { desc: 'Antecipação Mastercard', valor: '+ R$ 3.800,00', tipo: 'credito', data: '27/05' },
  { desc: 'Taxa administrativa', valor: '- R$ 45,00', tipo: 'debito', data: '27/05' },
  { desc: 'Venda Elo Débito', valor: '+ R$ 890,00', tipo: 'credito', data: '26/05' },
  { desc: 'Transferência para conta', valor: '- R$ 10.000,00', tipo: 'debito', data: '25/05' },
];

export const VisaoGeral: React.FC = () => {
  const est = useAuthStore((s) => s.estabelecimentoAtivo);

  return (
    <div>
      <Heading as="h3">{est?.nome}</Heading>
      <Text size="sm" color={tokens.colors.muted} style={{ display: 'block', marginTop: 4, marginBottom: 28 }}>
        Visão geral da carteira
      </Text>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 36 }}>
        {stats.map((s) => (
          <Card key={s.label} style={{ padding: '20px 24px' }}>
            <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginBottom: 8 }}>
              {s.label}
            </Text>
            <Heading as="h3" style={{ marginBottom: 10 }}>{s.value}</Heading>
            <Badge variant={s.variant}>{s.tag}</Badge>
          </Card>
        ))}
      </div>

      <Text weight="semibold" size="lg" style={{ display: 'block', marginBottom: 14 }}>
        Últimas movimentações
      </Text>
      <Card style={{ padding: '8px 24px' }}>
        {movimentacoes.map((m, i) => (
          <React.Fragment key={i}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
            }}>
              <div>
                <Text weight="medium">{m.desc}</Text>
                <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginTop: 2 }}>
                  {m.data}
                </Text>
              </div>
              <Text
                weight="semibold"
                color={m.tipo === 'credito' ? tokens.colors.success : tokens.colors.danger}
              >
                {m.valor}
              </Text>
            </div>
            {i < movimentacoes.length - 1 && <Divider style={{ margin: 0 }} />}
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
};
