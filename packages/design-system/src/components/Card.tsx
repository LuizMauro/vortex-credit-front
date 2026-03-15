import React from 'react';
import { styled, Stack } from 'tamagui';

const StyledCard = styled(Stack, {
  backgroundColor: '$color.white',
  borderRadius: '$3',
  padding: '$4',
  borderWidth: 1,
  borderColor: '$color.border',
  transition: 'box-shadow 0.2s, transform 0.2s',
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
    hoverStyle={hover ? { scale: 1.01, shadowColor: 'rgba(0,0,0,0.08)', shadowRadius: 20 } : undefined}
    pressStyle={hover ? { scale: 0.99 } : undefined}
    style={style as any}
  >
    {children}
  </StyledCard>
);
