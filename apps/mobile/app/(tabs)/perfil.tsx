import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@vortex/store';
import { Heading, Text, Card, Avatar, Button, Divider, tokens } from '@vortex/design-system';

export default function PerfilScreen() {
  const usuario = useAuthStore((s) => s.usuario);
  const estabelecimento = useAuthStore((s) => s.estabelecimentoAtivo);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={{ padding: 24, alignItems: 'center' }}>
        <Avatar nome={usuario?.nome || 'U'} size="lg" />
        <Heading as="h4" style={{ marginTop: 12 }}>
          {usuario?.nome}
        </Heading>
        <Text size="sm" color={tokens.colors.muted}>
          {usuario?.email}
        </Text>
      </Card>

      {estabelecimento && (
        <Card style={{ padding: 16, marginTop: 14 }}>
          <Text size="xs" color={tokens.colors.muted}>
            Estabelecimento ativo
          </Text>
          <Text weight="semibold" style={{ marginTop: 4 }}>
            {estabelecimento.nome}
          </Text>
          <Text size="xs" color={tokens.colors.muted} style={{ marginTop: 2 }}>
            {estabelecimento.cnpj}
          </Text>
        </Card>
      )}

      <Divider />

      <Button variant="danger" onClick={handleLogout} fullWidth>
        Sair da conta
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.colors.background },
  content: { padding: 20, paddingBottom: 40 },
});
