import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../../theme/useTheme';

type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4'
  | 'body' 
  | 'bodyBold' 
  | 'bodySmall'
  | 'caption' 
  | 'button'
  | 'label';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
}

// Mapeamento de aliases amigáveis para os nomes reais do textStyles
const variantMap: Record<TextVariant, keyof ReturnType<typeof useTheme>['textStyles']> = {
  h1: 'headingXl',
  h2: 'headingLg',
  h3: 'headingMd',
  h4: 'headingSm',
  body: 'bodyMd',
  bodyBold: 'labelLg',
  bodySmall: 'bodySm',
  caption: 'labelSm',
  button: 'labelMd',
  label: 'labelMd',
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  style,
  ...props
}) => {
  const { textStyles, colors } = useTheme();

  const mappedVariant = variantMap[variant];
  const variantStyle = textStyles[mappedVariant];
  const colorStyle = color ? { color } : { color: colors.text.primary };

  return (
    <RNText
      style={[variantStyle, colorStyle, style]}
      {...props}
    />
  );
};
