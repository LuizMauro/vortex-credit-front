export const tokens = {
  colors: {
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
  },
  fonts: {
    display: "'Syne', sans-serif",
    body: "'DM Sans', sans-serif",
    mono: "'DM Mono', monospace",
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
} as const;

export const cssVariables = `
  :root {
    --color-primary: ${tokens.colors.primary};
    --color-bg: ${tokens.colors.background};
    --color-accent: ${tokens.colors.accent};
    --color-accent-light: ${tokens.colors.accentLight};
    --color-white: ${tokens.colors.white};
    --color-danger: ${tokens.colors.danger};
    --color-warning: ${tokens.colors.warning};
    --color-info: ${tokens.colors.info};
    --color-success: ${tokens.colors.success};
    --color-muted: ${tokens.colors.muted};
    --color-border: ${tokens.colors.border};
    --font-display: ${tokens.fonts.display};
    --font-body: ${tokens.fonts.body};
    --font-mono: ${tokens.fonts.mono};
    --radius-sm: ${tokens.radii.sm};
    --radius-md: ${tokens.radii.md};
    --radius-lg: ${tokens.radii.lg};
    --radius-full: ${tokens.radii.full};
  }
`;
