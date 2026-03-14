import React from 'react';
import { tokens } from '../tokens';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

const fontSizes: Record<TextSize, string> = {
  xs: '12px', sm: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px',
};
const fontWeights: Record<TextWeight, number> = {
  regular: 400, medium: 500, semibold: 600, bold: 700,
};

interface TextProps {
  children: React.ReactNode;
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  children, size = 'md', weight = 'regular', color, style,
}) => (
  <span
    style={{
      fontSize: fontSizes[size],
      fontWeight: fontWeights[weight],
      fontFamily: tokens.fonts.body,
      color: color || 'inherit',
      ...style,
    }}
  >
    {children}
  </span>
);

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

const headingSizes: Record<HeadingLevel, string> = {
  h1: '36px', h2: '28px', h3: '22px', h4: '18px',
};

interface HeadingProps {
  children: React.ReactNode;
  as?: HeadingLevel;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({ children, as: Tag = 'h2', style }) => (
  <Tag
    style={{
      fontSize: headingSizes[Tag],
      fontWeight: 700,
      fontFamily: tokens.fonts.display,
      color: tokens.colors.primary,
      lineHeight: 1.2,
      ...style,
    }}
  >
    {children}
  </Tag>
);
