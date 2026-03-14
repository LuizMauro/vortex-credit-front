import React from 'react';
import { tokens } from '../tokens';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, hover, style, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.radii.lg,
      padding: tokens.spacing.lg,
      border: `1px solid ${tokens.colors.border}`,
      cursor: hover ? 'pointer' : 'default',
      transition: hover ? 'box-shadow 0.2s, transform 0.2s' : undefined,
      ...style,
    }}
    onMouseEnter={(e) => {
      if (hover) {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }
    }}
    onMouseLeave={(e) => {
      if (hover) {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }
    }}
  >
    {children}
  </div>
);
