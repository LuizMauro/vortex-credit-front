import React from 'react';
import { Stack } from 'tamagui';

interface DividerProps {
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({ style }) => (
  <Stack
    height={1}
    backgroundColor="$color.border"
    marginVertical="$3"
    alignSelf="stretch"
    style={style as any}
  />
);
