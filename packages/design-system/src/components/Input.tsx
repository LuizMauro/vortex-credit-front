import React from 'react';
import { Input as TInput, Label, Text, YStack, XStack } from 'tamagui';

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
        <Label fontSize={13} fontWeight="500" color="$color.muted">
          {label}
        </Label>
      )}
      <XStack alignItems="center" position="relative">
        {icon && (
          <Text position="absolute" left={12} color="$color.muted" zIndex={1}>
            {icon}
          </Text>
        )}
        <TInput
          flex={1}
          paddingHorizontal={icon ? 38 : 14}
          paddingVertical={10}
          borderRadius="$2"
          borderWidth={1.5}
          borderColor={error ? '$color.danger' : '$color.border'}
          fontSize={14}
          placeholder={placeholder}
          value={String(value ?? '')}
          onChangeText={handleChangeText}
          // @ts-ignore web-only props
          type={type}
          min={min}
          max={max}
          style={style as any}
        />
      </XStack>
      {error && (
        <Text fontSize={12} color="$color.danger">{error}</Text>
      )}
      {hint && !error && (
        <Text fontSize={12} color="$color.muted">{hint}</Text>
      )}
    </YStack>
  );
};
