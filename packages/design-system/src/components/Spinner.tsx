import React from 'react';
import { Spinner as TSpinner } from 'tamagui';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 24, color }) => (
  <TSpinner size={size > 30 ? 'large' : 'small'} color={color || '$color.accent'} />
);
