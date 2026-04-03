import React, { useState } from 'react';
import { Heading, Text, Card, Badge, Button, Input, Divider, tokens, useIsMobile } from '@vortex/design-system';

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
  const isMobile = useIsMobile();
  const taxa = 1.8;
  const valorAntecipado = (totalAgenda * percentual) / 100;
  const desconto = valorAntecipado * (taxa / 100);
  const liquido = valorAntecipado - desconto;

  return (
    <div>
      <Heading as="h3">Recebíveis</Heading>
      <Text size="sm" color={tokens.colors.muted} style={{ display: 'block', marginTop: 4, marginBottom: isMobile ? 20 : 28 }}>
        Agenda de recebíveis e simulador de antecipação
      </Text>

      <Text weight="semibold" size="lg" style={{ display: 'block', marginBottom: 14 }}>
        Agenda por bandeira
      </Text>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14, marginBottom: isMobile ? 24 : 36 }}>
        {agenda.map((a) => (
          <Card key={a.bandeira} style={{ padding: isMobile ? '14px 16px' : '18px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text weight="semibold">{a.bandeira}</Text>
              <Badge variant="info">{a.data}</Badge>
            </div>
            <Heading as="h4">{fmt(a.valor)}</Heading>
          </Card>
        ))}
      </div>

      <Divider />

      <Text weight="semibold" size="lg" style={{ display: 'block', marginBottom: 14, marginTop: 8 }}>
        Simulador de antecipação
      </Text>
      <Card style={{ padding: isMobile ? '20px 16px' : '28px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 32 }}>
          <div>
            <Input
              label="Percentual a antecipar"
              type="number"
              min={1}
              max={100}
              value={percentual}
              onChange={(e) => setPercentual(Number(e.target.value))}
            />
            <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginTop: 10 }}>
              Taxa: {taxa}% a.m.
            </Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginBottom: 2 }}>
                Valor bruto
              </Text>
              <Text weight="semibold" size="lg">{fmt(valorAntecipado)}</Text>
            </div>
            <div>
              <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginBottom: 2 }}>
                Desconto
              </Text>
              <Text weight="semibold" color={tokens.colors.danger}>
                - {fmt(desconto)}
              </Text>
            </div>
            <Divider style={{ margin: '4px 0' }} />
            <div>
              <Text size="xs" color={tokens.colors.muted} style={{ display: 'block', marginBottom: 2 }}>
                Valor líquido
              </Text>
              <Heading as="h3" style={{ color: tokens.colors.accent }}>{fmt(liquido)}</Heading>
            </div>
            <Button style={{ marginTop: 8 }}>Solicitar antecipação</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
