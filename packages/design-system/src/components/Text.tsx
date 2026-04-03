import React from 'react';
import { Text as TText, styled } from 'tamagui';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

const fontSizes: Record<TextSize, number> = {
  xs: 12, sm: 13, md: 14, lg: 16, xl: 18, '2xl': 22, '3xl': 28,
};
const fontWeights = {
  regular: 400, medium: 500, semibold: 600, bold: 700,
} as const;

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
  <TText
    fontSize={fontSizes[size]}
    fontWeight={fontWeights[weight]}
    fontFamily="$body"
    color={color || undefined}
    style={style as Record<string, unknown>}
  >
    {children}
  </TText>
);

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

const headingSizes: Record<HeadingLevel, number> = {
  h1: 36, h2: 28, h3: 22, h4: 18,
};

const StyledHeading = styled(TText, {
  fontWeight: '700',
  fontFamily: '$heading',
  color: '$color.primary',
});

interface HeadingProps {
  children: React.ReactNode;
  as?: HeadingLevel;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({ children, as: level = 'h2', style }) => (
  <StyledHeading
    tag={level}
    fontSize={headingSizes[level]}
    style={style as Record<string, unknown>}
  >
    {children}
  </StyledHeading>
);
