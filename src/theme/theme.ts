/**
 * @file theme.ts
 * @description Objeto de tema completo — combina todos os tokens em uma
 * única estrutura tipada, separada por modo (light / dark).
 *
 * @usage
 *   // Acesso via hook (recomendado):
 *   import { useTheme } from '@/theme/useTheme';
 *   const { colors, spacing, typography, layout } = useTheme();
 *
 *   // Acesso estático (fora de componentes):
 *   import { lightTheme, darkTheme } from '@/theme/theme';
 */

import { lightColors, darkColors, type ColorTokens } from './colors';
import {
  spacing,
  radii,
  borderWidths,
  shadows,
  type SpacingKey,
  type RadiiKey,
  type ShadowToken,
} from './spacing';
import {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  textStyles,
  type TextStyleKey,
} from './typography';
import {
  screen,
  breakpoints,
  tableCardWidth,
  tableCardHeight,
  screenPaddingH,
  screenPaddingV,
  componentHeights,
  hitSlop,
  zIndex,
} from './layout';

// ─── Tipo do tema ─────────────────────────────────────────────────────────────

export type Theme = {
  colors: ColorTokens;
  spacing: typeof spacing;
  radii: typeof radii;
  borderWidths: typeof borderWidths;
  shadows: typeof shadows;
  typography: {
    fontFamily: typeof fontFamily;
    fontWeight: typeof fontWeight;
    fontSize: typeof fontSize;
    lineHeight: typeof lineHeight;
    styles: typeof textStyles;
  };
  layout: {
    screen: typeof screen;
    breakpoints: typeof breakpoints;
    tableCardWidth: number;
    tableCardHeight: number;
    screenPaddingH: number;
    screenPaddingV: number;
    componentHeights: typeof componentHeights;
    hitSlop: typeof hitSlop;
    zIndex: typeof zIndex;
  };
  isDark: boolean;
};

// ─── Objetos de tema ──────────────────────────────────────────────────────────

const baseTheme = {
  spacing,
  radii,
  borderWidths,
  shadows,
  typography: {
    fontFamily,
    fontWeight,
    fontSize,
    lineHeight,
    styles: textStyles,
  },
  layout: {
    screen,
    breakpoints,
    tableCardWidth,
    tableCardHeight,
    screenPaddingH,
    screenPaddingV,
    componentHeights,
    hitSlop,
    zIndex,
  },
} as const;

export const lightTheme: Theme = {
  ...baseTheme,
  colors: lightColors,
  isDark: false,
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: darkColors,
  isDark: true,
};
