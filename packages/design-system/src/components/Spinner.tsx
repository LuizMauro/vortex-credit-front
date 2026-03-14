import React from 'react';
import { tokens } from '../tokens';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 24, color = tokens.colors.accent }) => (
  <>
    <style>{`@keyframes vortex-spin { to { transform: rotate(360deg); } }`}</style>
    <div
      style={{
        width: size,
        height: size,
        border: `2.5px solid ${tokens.colors.border}`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'vortex-spin 0.6s linear infinite',
      }}
    />
  </>
);
