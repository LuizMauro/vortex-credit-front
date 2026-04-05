import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Heading, Text, Card, Badge, Button, Input, Divider, tokens } from "@vortex/design-system";

const agenda = [
  { bandeira: "Visa", valor: 8200, data: "2025-06-15" },
  { bandeira: "Mastercard", valor: 5400, data: "2025-06-15" },
  { bandeira: "Elo", valor: 3100, data: "2025-06-20" },
  { bandeira: "Hipercard", valor: 1620, data: "2025-06-25" },
];

const totalAgenda = agenda.reduce((s, a) => s + a.valor, 0);
const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function RecebiveisScreen() {
  const [percentual, setPercentual] = useState(100);
  const taxa = 1.8;
  const valorAntecipado = (totalAgenda * percentual) / 100;
  const desconto = valorAntecipado * (taxa / 100);
  const liquido = valorAntecipado - desconto;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Heading as="h3">Recebíveis</Heading>
      <Text size="sm" color={tokens.colors.muted}>
        Agenda de recebíveis e simulador
      </Text>

      <Text weight="semibold" size="lg" style={{ marginTop: 20, marginBottom: 12 }}>
        Agenda por bandeira
      </Text>
      <View style={{ gap: 12 }}>
        {agenda.map((a) => (
          <Card key={a.bandeira} style={{ padding: 16 }}>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text weight="semibold">{a.bandeira}</Text>
              <Badge variant="info">{a.data}</Badge>
            </View>
            <Heading as="h4">{fmt(a.valor)}</Heading>
          </Card>
        ))}
      </View>

      <Divider />

      <Text weight="semibold" size="lg" style={{ marginBottom: 12 }}>
        Simulador de antecipação
      </Text>
      <Card style={{ padding: 20 }}>
        <Input
          label="Percentual a antecipar"
          placeholder="100"
          value={percentual}
          onChange={(e) => setPercentual(Number(e.target.value))}
        />
        <Text size="xs" color={tokens.colors.muted} style={{ marginTop: 8 }}>
          Taxa: {taxa}% a.m.
        </Text>

        <Divider />

        <View style={{ gap: 12 }}>
          <View>
            <Text size="xs" color={tokens.colors.muted}>Valor bruto</Text>
            <Text weight="semibold" size="lg">{fmt(valorAntecipado)}</Text>
          </View>
          <View>
            <Text size="xs" color={tokens.colors.muted}>Desconto</Text>
            <Text weight="semibold" color={tokens.colors.danger}>- {fmt(desconto)}</Text>
          </View>
          <Divider style={{ marginBlock: 4 }} />
          <View>
            <Text size="xs" color={tokens.colors.muted}>Valor líquido</Text>
            <Heading as="h3" style={{ color: tokens.colors.accent }}>{fmt(liquido)}</Heading>
          </View>
          <Button style={{ marginTop: 8 }}>Solicitar antecipação</Button>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.colors.background },
  content: { padding: 20, paddingBottom: 40 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});
