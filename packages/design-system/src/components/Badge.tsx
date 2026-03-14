import React from 'react';
import { tokens } from '../tokens';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantColors: Record<BadgeVariant, { bg: string; color: string }> = {
  default: { bg: tokens.colors.border, color: tokens.colors.primary },
  success: { bg: '#dcfce7', color: tokens.colors.success },
  warning: { bg: '#fef3c7', color: '#92400e' },
  danger: { bg: '#fee2e2', color: tokens.colors.danger },
  info: { bg: '#dbeafe', color: tokens.colors.info },
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const c = variantColors[variant];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: tokens.radii.full,
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor: c.bg,
        color: c.color,
      }}
    >
      {children}
    </span>
  );
};
