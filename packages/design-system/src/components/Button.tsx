import React from 'react';
import { styled, Stack, Text, Spinner } from 'tamagui';

const StyledButton = styled(Stack, {
  tag: 'button',
  role: 'button',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: '$2',
  cursor: 'pointer',
  borderWidth: 0,
  alignSelf: 'flex-start',
  transition: 'all 0.15s ease',

  hoverStyle: { opacity: 0.85 },
  pressStyle: { opacity: 0.7, scale: 0.98 },

  variants: {
    variant: {
      primary: { backgroundColor: '$color.primary' },
      secondary: {
        backgroundColor: '$color.transparent',
        borderWidth: 1.5,
        borderColor: '$color.border',
      },
      ghost: { backgroundColor: '$color.transparent' },
      danger: { backgroundColor: '$color.danger' },
    },
  } as const,

  defaultVariants: { variant: 'primary' },
});

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

const textColors: Record<ButtonVariant, string> = {
  primary: '$color.white',
  secondary: '$color.primary',
  ghost: '$color.primary',
  danger: '$color.white',
};

interface ButtonProps {
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading,
  children,
  disabled,
  style,
  onClick,
  type,
  fullWidth,
}) => (
  <StyledButton
    variant={variant}
    opacity={disabled || loading ? 0.5 : 1}
    onPress={onClick}
    disabled={disabled || loading}
    alignSelf={fullWidth ? 'stretch' : 'flex-start'}
    // @ts-expect-error web props
    type={type}
    style={style as Record<string, unknown>}
  >
    {loading ? (
      <Spinner size="small" color={textColors[variant]} />
    ) : (
      <Text color={textColors[variant]} fontSize={14} fontWeight="600" fontFamily="$body">
        {children}
      </Text>
    )}
  </StyledButton>
);
