import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Heading, Text, Card, Badge, Button, Divider, tokens } from "@vortex/design-system";

type Tipo = "todos" | "credito" | "debito";

const transacoes = [
  { id: 1, desc: "Venda Visa Crédito", valor: 1230, tipo: "credito" as const, data: "2025-05-28" },
  { id: 2, desc: "Antecipação Mastercard", valor: 3800, tipo: "credito" as const, data: "2025-05-27" },
  { id: 3, desc: "Taxa administrativa", valor: -45, tipo: "debito" as const, data: "2025-05-27" },
  { id: 4, desc: "Venda Elo Débito", valor: 890, tipo: "credito" as const, data: "2025-05-26" },
  { id: 5, desc: "Transferência para conta", valor: -10000, tipo: "debito" as const, data: "2025-05-25" },
  { id: 6, desc: "Venda Hipercard Crédito", valor: 560, tipo: "credito" as const, data: "2025-05-24" },
  { id: 7, desc: "Aluguel POS", valor: -120, tipo: "debito" as const, data: "2025-05-23" },
];

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function ExtratoScreen() {
  const [filtro, setFiltro] = useState<Tipo>("todos");
  const filtered = filtro === "todos" ? transacoes : transacoes.filter((t) => t.tipo === filtro);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Heading as="h3">Extrato</Heading>
      <Text size="sm" color={tokens.colors.muted}>Transações do estabelecimento</Text>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 16, marginBottom: 20 }}>
        {(["todos", "credito", "debito"] as Tipo[]).map((t) => (
          <Button
            key={t}
            variant={filtro === t ? "primary" : "secondary"}
            onClick={() => setFiltro(t)}
            style={{ paddingHorizontal: 14, paddingVertical: 6 }}
          >
            {t === "todos" ? "Todos" : t === "credito" ? "Crédito" : "Débito"}
          </Button>
        ))}
      </View>

      <Card style={{ padding: 16 }}>
        {filtered.map((t, i) => (
          <View key={t.id}>
            <View style={{ paddingVertical: 12, gap: 6 }}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text weight="medium">{t.desc}</Text>
                  <Text size="xs" color={tokens.colors.muted}>{t.data}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text
                  weight="semibold"
                  color={t.valor >= 0 ? tokens.colors.success : tokens.colors.danger}
                >
                  {t.valor >= 0 ? "+ " : ""}{fmt(t.valor)}
                </Text>
                <Badge variant={t.tipo === "credito" ? "success" : "danger"}>
                  {t.tipo === "credito" ? "Crédito" : "Débito"}
                </Badge>
              </View>
            </View>
            {i < filtered.length - 1 && <Divider style={{ margin: 0 }} />}
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.colors.background },
  content: { padding: 20, paddingBottom: 40 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});
