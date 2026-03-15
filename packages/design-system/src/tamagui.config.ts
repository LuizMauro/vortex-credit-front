import { createTamagui, createTokens, createFont } from 'tamagui';

const headingFont = createFont({
  family: "'Inter', sans-serif",
  size: { 4: 18, 5: 22, 6: 28, 7: 36 },
  weight: { 4: '400', 7: '700' },
  lineHeight: { 4: 24, 5: 28, 6: 34, 7: 42 },
});

const bodyFont = createFont({
  family: "'Inter', sans-serif",
  size: { 1: 12, 2: 13, 3: 14, 4: 16, 5: 18, 6: 22, 7: 28 },
  weight: { 4: '400', 5: '500', 6: '600', 7: '700' },
  lineHeight: { 1: 16, 2: 18, 3: 20, 4: 22, 5: 24, 6: 28, 7: 34 },
});

const tokens = createTokens({
  color: {
    primary: '#0A0A0A',
    background: '#F2F2F0',
    accent: '#1A7A5E',
    accentLight: '#e8f5f0',
    white: '#FFFFFF',
    danger: '#DC2626',
    warning: '#F59E0B',
    info: '#3B82F6',
    success: '#16A34A',
    muted: '#6B7280',
    border: '#E5E5E3',
    dangerBg: '#fee2e2',
    warningBg: '#fef3c7',
    successBg: '#dcfce7',
    infoBg: '#dbeafe',
    warningText: '#92400e',
    transparent: 'transparent',
  },
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    true: 16,
  },
  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    true: 16,
  },
  radius: {
    0: 0,
    1: 6,
    2: 10,
    3: 16,
    4: 9999,
    true: 10,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
  },
});

const lightTheme = {
  background: tokens.color.background,
  color: tokens.color.primary,
  borderColor: tokens.color.border,
  accentBackground: tokens.color.accent,
  accentColor: tokens.color.white,
};

export const tamaguiConfig = createTamagui({
  tokens,
  themes: {
    light: lightTheme,
  },
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  defaultFont: 'body',
});

export default tamaguiConfig;

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
