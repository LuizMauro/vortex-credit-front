import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useAuthStore, type Estabelecimento } from "@vortex/store";
import { Heading, Text, Card, Badge, Divider, tokens } from "@vortex/design-system";

const mockEstabelecimentos: Estabelecimento[] = [
  { id: "1", nome: "Posto Vortex Centro", tipo: "posto", cnpj: "12.345.678/0001-01" },
  { id: "2", nome: "Loja Vortex Mall", tipo: "loja", cnpj: "12.345.678/0002-02" },
  { id: "3", nome: "Distribuidora Vortex Sul", tipo: "distribuidora", cnpj: "12.345.678/0003-03" },
];

const tipoLabel: Record<Estabelecimento["tipo"], string> = {
  posto: "Posto",
  loja: "Loja",
  distribuidora: "Distribuidora",
};

const stats = [
  { label: "Saldo disponível", value: "R$ 42.850,00", variant: "success" as const, tag: "Disponível" },
  { label: "A receber (30d)", value: "R$ 18.320,00", variant: "info" as const, tag: "Pendente" },
  { label: "Antecipado", value: "R$ 7.500,00", variant: "warning" as const, tag: "Antecipado" },
];

const movimentacoes = [
  { desc: "Venda Visa Crédito", valor: "+ R$ 1.230,00", tipo: "credito", data: "28/05" },
  { desc: "Antecipação Mastercard", valor: "+ R$ 3.800,00", tipo: "credito", data: "27/05" },
  { desc: "Taxa administrativa", valor: "- R$ 45,00", tipo: "debito", data: "27/05" },
  { desc: "Venda Elo Débito", valor: "+ R$ 890,00", tipo: "credito", data: "26/05" },
];

export default function HomeScreen() {
  const selecionar = useAuthStore((s) => s.selecionarEstabelecimento);
  const ativo = useAuthStore((s) => s.estabelecimentoAtivo);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Heading as="h3">Estabelecimentos</Heading>
      <Text size="sm" color={tokens.colors.muted}>Selecione um estabelecimento</Text>

      <View style={{ gap: 10, marginTop: 14 }}>
        {mockEstabelecimentos.map((est) => {
          const isActive = ativo?.id === est.id;
          return (
            <Pressable key={est.id} onPress={() => selecionar(est)}>
              <Card
                style={{
                  borderWidth: isActive ? 2 : 1,
                  borderColor: isActive ? tokens.colors.accent : tokens.colors.border,
                  backgroundColor: isActive ? tokens.colors.accentLight : tokens.colors.white,
                  padding: 16,
                }}
              >
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text weight="semibold">{est.nome}</Text>
                    <Text size="xs" color={tokens.colors.muted}>{est.cnpj}</Text>
                  </View>
                  <Badge variant={isActive ? "success" : "default"}>
                    {isActive ? "Ativo" : tipoLabel[est.tipo]}
                  </Badge>
                </View>
              </Card>
            </Pressable>
          );
        })}
      </View>

      {ativo && (
        <>
          <Divider />
          <Heading as="h3">{ativo.nome}</Heading>
          <Text size="sm" color={tokens.colors.muted}>Visão geral da carteira</Text>

          <View style={{ gap: 12, marginTop: 14 }}>
            {stats.map((s) => (
              <Card key={s.label} style={{ padding: 18 }}>
                <Text size="xs" color={tokens.colors.muted}>{s.label}</Text>
                <Heading as="h3" style={{ marginTop: 6, marginBottom: 8 }}>{s.value}</Heading>
                <Badge variant={s.variant}>{s.tag}</Badge>
              </Card>
            ))}
          </View>

          <Text weight="semibold" size="lg" style={{ marginTop: 24, marginBottom: 12 }}>
            Últimas movimentações
          </Text>
          <Card style={{ padding: 16 }}>
            {movimentacoes.map((m, i) => (
              <View key={i}>
                <View style={[styles.row, { paddingVertical: 12 }]}>
                  <View style={{ flex: 1 }}>
                    <Text weight="medium">{m.desc}</Text>
                    <Text size="xs" color={tokens.colors.muted}>{m.data}</Text>
                  </View>
                  <Text
                    weight="semibold"
                    color={m.tipo === "credito" ? tokens.colors.success : tokens.colors.danger}
                  >
                    {m.valor}
                  </Text>
                </View>
                {i < movimentacoes.length - 1 && <Divider style={{ margin: 0 }} />}
              </View>
            ))}
          </Card>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.colors.background },
  content: { padding: 20, paddingBottom: 40 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});
