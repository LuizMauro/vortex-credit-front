import React from 'react';
import { tokens } from '../tokens';

export const Divider: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <hr
    style={{
      border: 'none',
      borderTop: `1px solid ${tokens.colors.border}`,
      margin: `${tokens.spacing.md} 0`,
      ...style,
    }}
  />
);
