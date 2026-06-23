/**
 * @file spacing.ts
 * @description Sistema de espaçamento, bordas e elevação (sombras).
 *
 * Baseado numa escala de 4px. Todos os valores de margem, padding,
 * gap e tamanho de componentes devem vir daqui para garantir consistência.
 *
 * @usage
 *   import { useTheme } from '@/theme/useTheme';
 *   const { spacing, radii } = useTheme();
 *   <View style={{ padding: spacing.md, borderRadius: radii.md }} />
 */

// ─── Escala base (múltiplos de 4px) ──────────────────────────────────────────

export const spacing = {
  /** 2px — micro separador */
  xxs: 2,
  /** 4px — espaço mínimo entre elementos inline */
  xs: 4,
  /** 8px — padding interno compact */
  sm: 8,
  /** 12px — gap padrão entre elementos */
  md: 12,
  /** 16px — padding de seção / card */
  lg: 16,
  /** 20px — padding de tela lateral */
  xl: 20,
  /** 24px — separação entre blocos */
  xxl: 24,
  /** 32px — espaço generoso */
  xxxl: 32,
  /** 48px — espaço extra (headers, footers) */
  huge: 48,
} as const;

export type SpacingKey = keyof typeof spacing;

// ─── Border radius ────────────────────────────────────────────────────────────

export const radii = {
  /** 4px — elementos pequenos: badges, tags */
  xs: 4,
  /** 8px — inputs, botões secundários */
  sm: 8,
  /** 12px — cards, modais pequenos */
  md: 12,
  /** 16px — cards grandes, bottom sheets */
  lg: 16,
  /** 24px — pill buttons, chips */
  xl: 24,
  /** 9999px — círculos e cápsulas */
  full: 9999,
} as const;

export type RadiiKey = keyof typeof radii;

// ─── Border widths ────────────────────────────────────────────────────────────

export const borderWidths = {
  hairline: 0.5,
  thin: 1,
  medium: 1.5,
  thick: 2,
} as const;

// ─── Sombras / Elevação ───────────────────────────────────────────────────────
// iOS usa shadowColor/Offset/Opacity/Radius; Android usa elevation.
// Ambos são expostos por cada nível.

export type ShadowToken = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export const shadows: Record<'none' | 'xs' | 'sm' | 'md' | 'lg', ShadowToken> =
  {
    none: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 2,
      elevation: 1,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.14,
      shadowRadius: 16,
      elevation: 8,
    },
  };
