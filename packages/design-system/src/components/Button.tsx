import React from 'react';
import { tokens } from '../tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: tokens.colors.primary,
    color: tokens.colors.white,
  },
  secondary: {
    backgroundColor: 'transparent',
    color: tokens.colors.primary,
    border: `1.5px solid ${tokens.colors.border}`,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: tokens.colors.primary,
  },
  danger: {
    backgroundColor: tokens.colors.danger,
    color: tokens.colors.white,
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading,
  children,
  style,
  disabled,
  ...props
}) => (
  <button
    disabled={disabled || loading}
    style={{
      padding: '10px 20px',
      borderRadius: tokens.radii.md,
      fontFamily: tokens.fonts.body,
      fontWeight: 600,
      fontSize: '14px',
      transition: 'opacity 0.15s',
      opacity: disabled || loading ? 0.5 : 1,
      ...variantStyles[variant],
      ...style,
    }}
    {...props}
  >
    {loading ? 'Carregando...' : children}
  </button>
);
