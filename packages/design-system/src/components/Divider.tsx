import React from 'react';
import { Separator } from 'tamagui';

interface DividerProps {
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({ style }) => (
  <Separator
    borderColor="$color.border"
    marginVertical="$3"
    style={style as any}
  />
);
