import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@vortex/store";
import { Button, Input, Heading, Text, Card, tokens } from "@vortex/design-system";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleLogin = () => {
    login({ id: "1", nome: "Luiz Operador", email: email || "luiz@vortex.com" });
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        <Card style={{ padding: 28 }}>
          <View style={{ alignItems: "center", marginBottom: 24 }}>
            <Heading as="h2">Vortex Credit</Heading>
            <Text size="sm" color={tokens.colors.muted}>
              Acesse sua conta
            </Text>
          </View>
          <View style={{ gap: 16 }}>
            <Input
              label="E-mail"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button variant="primary" onClick={handleLogin} fullWidth>
              Entrar
            </Button>
          </View>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.colors.background },
  inner: { flex: 1, justifyContent: "center", padding: 20 },
});
