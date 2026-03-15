import React from 'react';
import { styled, Text } from 'tamagui';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

const StyledBadge = styled(Text, {
  paddingHorizontal: 10,
  paddingVertical: 2,
  borderRadius: '$4',
  fontSize: 12,
  fontWeight: '600',
  alignSelf: 'flex-start',

  variants: {
    variant: {
      default: { backgroundColor: '$color.border', color: '$color.primary' },
      success: { backgroundColor: '$color.successBg', color: '$color.success' },
      warning: { backgroundColor: '$color.warningBg', color: '$color.warningText' },
      danger: { backgroundColor: '$color.dangerBg', color: '$color.danger' },
      info: { backgroundColor: '$color.infoBg', color: '$color.info' },
    },
  } as const,

  defaultVariants: { variant: 'default' },
});

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => (
  <StyledBadge variant={variant}>{children}</StyledBadge>
);
