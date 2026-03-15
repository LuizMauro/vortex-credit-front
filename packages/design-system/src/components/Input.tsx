import React from 'react';
import { Input as TInput, Text, YStack, XStack } from 'tamagui';

interface InputProps {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  icon,
  value,
  onChange,
  type,
  placeholder,
  min,
  max,
  style,
}) => {
  const handleChangeText = (text: string) => {
    if (!onChange) return;
    const syntheticEvent = {
      target: { value: text },
      currentTarget: { value: text },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  return (
    <YStack gap="$1">
      {label && (
        <Text fontSize={13} fontWeight="500" color="$color.muted" marginBottom={2}>
          {label}
        </Text>
      )}
      <XStack alignItems="center" position="relative">
        {icon && (
          <Text position="absolute" left={12} color="$color.muted" zIndex={1}>
            {icon}
          </Text>
        )}
        <TInput
          flex={1}
          height={42}
          paddingHorizontal={icon ? 38 : 14}
          borderRadius="$2"
          borderWidth={1.5}
          borderColor={error ? '$color.danger' : '$color.border'}
          fontSize={14}
          fontFamily="$body"
          placeholder={placeholder}
          placeholderTextColor="$color.muted"
          value={String(value ?? '')}
          onChangeText={handleChangeText}
          focusStyle={{ borderColor: '$color.accent' }}
          // @ts-ignore web-only props
          type={type}
          min={min}
          max={max}
          style={style as any}
        />
      </XStack>
      {error && (
        <Text fontSize={12} color="$color.danger" marginTop={2}>{error}</Text>
      )}
      {hint && !error && (
        <Text fontSize={12} color="$color.muted" marginTop={2}>{hint}</Text>
      )}
    </YStack>
  );
};
