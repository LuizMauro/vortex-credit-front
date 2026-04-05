import { Stack } from "expo-router";
import { VortexProvider } from "@vortex/design-system";

export default function RootLayout() {
  return (
    <VortexProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </VortexProvider>
  );
}
