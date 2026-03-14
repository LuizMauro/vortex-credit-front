import React from 'react';
import { tokens } from '../tokens';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  nome: string;
  size?: AvatarSize;
}

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

export const Avatar: React.FC<AvatarProps> = ({ nome, size = 'md' }) => {
  const s = sizes[size];
  return (
    <div
      style={{
        width: s.wh,
        height: s.wh,
        borderRadius: tokens.radii.full,
        backgroundColor: tokens.colors.accent,
        color: tokens.colors.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: s.font,
        fontWeight: 700,
        fontFamily: tokens.fonts.body,
      }}
    >
      {getInitials(nome)}
    </div>
  );
};
