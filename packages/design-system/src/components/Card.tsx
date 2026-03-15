import React from 'react';
import { styled, YStack } from 'tamagui';

const StyledCard = styled(YStack, {
  backgroundColor: '$color.white',
  borderRadius: '$3',
  padding: '$4',
  borderWidth: 1,
  borderColor: '$color.border',
});

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, hover, style, onClick }) => (
  <StyledCard
    onPress={onClick}
    cursor={hover ? 'pointer' : 'default'}
    hoverStyle={hover ? { opacity: 0.95 } : undefined}
    pressStyle={hover ? { opacity: 0.9 } : undefined}
    style={style as any}
  >
    {children}
  </StyledCard>
);
