import React from 'react';
import { tokens } from '../tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, hint, icon, style, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    {label && (
      <label style={{ fontSize: '13px', fontWeight: 500, color: tokens.colors.muted }}>
        {label}
      </label>
    )}
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {icon && (
        <span style={{ position: 'absolute', left: '12px', color: tokens.colors.muted }}>
          {icon}
        </span>
      )}
      <input
        style={{
          width: '100%',
          padding: '10px 14px',
          paddingLeft: icon ? '38px' : '14px',
          borderRadius: tokens.radii.md,
          border: `1.5px solid ${error ? tokens.colors.danger : tokens.colors.border}`,
          fontSize: '14px',
          fontFamily: tokens.fonts.body,
          outline: 'none',
          transition: 'border-color 0.15s',
          ...style,
        }}
        {...props}
      />
    </div>
    {error && <span style={{ fontSize: '12px', color: tokens.colors.danger }}>{error}</span>}
    {hint && !error && (
      <span style={{ fontSize: '12px', color: tokens.colors.muted }}>{hint}</span>
    )}
  </div>
);
