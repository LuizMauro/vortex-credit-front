import React from 'react';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from './tamagui.config';

export const VortexProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
    {children}
  </TamaguiProvider>
);
