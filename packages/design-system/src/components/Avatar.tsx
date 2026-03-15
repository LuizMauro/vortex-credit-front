import React from 'react';
import { Stack, Text } from 'tamagui';

type AvatarSize = 'sm' | 'md' | 'lg';

const sizes: Record<AvatarSize, { wh: number; font: number }> = {
  sm: { wh: 32, font: 12 },
  md: { wh: 40, font: 14 },
  lg: { wh: 52, font: 18 },
};

const getInitials = (nome: string) =>
  nome
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

interface AvatarProps {
  nome: string;
  size?: AvatarSize;
}

export const Avatar: React.FC<AvatarProps> = ({ nome, size = 'md' }) => {
  const s = sizes[size];
  return (
    <Stack
      width={s.wh}
      height={s.wh}
      borderRadius="$4"
      backgroundColor="$color.accent"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="$color.white" fontSize={s.font} fontWeight="700">
        {getInitials(nome)}
      </Text>
    </Stack>
  );
};
