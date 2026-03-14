import React, { useState } from 'react';
import { Heading, Text, Card, Badge, Button, Input, Divider, tokens } from '@vortex/design-system';

const agenda = [
  { bandeira: 'Visa', valor: 8200, data: '2025-06-15' },
  { bandeira: 'Mastercard', valor: 5400, data: '2025-06-15' },
  { bandeira: 'Elo', valor: 3100, data: '2025-06-20' },
  { bandeira: 'Hipercard', valor: 1620, data: '2025-06-25' },
];

const totalAgenda = agenda.reduce((s, a) => s + a.valor, 0);

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const Recebiveis: React.FC = () => {
  const [percentual, setPercentual] = useState(100);
  const taxa = 1.8;
  const valorAntecipado = (totalAgenda * percentual) / 100;
  const desconto = valorAntecipado * (taxa / 100);
  const liquido = valorAntecipado - desconto;

  return (
    <div>
      <Heading as="h3">Recebíveis</Heading>
      <Text size="sm" color={tokens.colors.muted} style={{ display: 'block', margin: '8px 0 24px' }}>
        Agenda de recebíveis e simulador de antecipação
      </Text>

      <Text weight="semibold" size="lg" style={{ display: 'block', marginBottom: 12 }}>
        Agenda por bandeira
      </Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
        {agenda.map((a) => (
          <Card key={a.bandeira}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text weight="semibold">{a.bandeira}</Text>
              <Badge variant="info">{a.data}</Badge>
            </div>
            <Heading as="h4" style={{ marginTop: 8 }}>{fmt(a.valor)}</Heading>
          </Card>
        ))}
      </div>

      <Divider />

      <Text weight="semibold" size="lg" style={{ display: 'block', marginBottom: 12 }}>
        Simulador de antecipação
      </Text>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <Input
              label="Percentual a antecipar"
              type="number"
              min={1}
              max={100}
              value={percentual}
              onChange={(e) => setPercentual(Number(e.target.value))}
            />
            <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginTop: 8 }}>
              Taxa: {taxa}% a.m.
            </Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div>
              <Text size="xs" color={tokens.colors.muted}>Valor bruto</Text>
              <Text weight="semibold" size="lg" style={{ display: 'block' }}>{fmt(valorAntecipado)}</Text>
            </div>
            <div>
              <Text size="xs" color={tokens.colors.muted}>Desconto</Text>
              <Text weight="semibold" color={tokens.colors.danger} style={{ display: 'block' }}>
                - {fmt(desconto)}
              </Text>
            </div>
            <Divider style={{ margin: '4px 0' }} />
            <div>
              <Text size="xs" color={tokens.colors.muted}>Valor líquido</Text>
              <Heading as="h3" style={{ color: tokens.colors.accent }}>{fmt(liquido)}</Heading>
            </div>
            <Button style={{ marginTop: 8 }}>Solicitar antecipação</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
