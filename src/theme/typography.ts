/**
 * @file typography.ts
 * @description Sistema tipográfico do aplicativo.
 *
 * Usa `PixelRatio.getFontScale()` para escalar os tamanhos proporcionalmente
 * à densidade de pixels do dispositivo, garantindo legibilidade em dispositivos
 * de 1GB RAM com telas de baixa resolução até telas de alta densidade.
 *
 * Estratégia de escala:
 *  - abaixo de 1.0 → fonte mínima de segurança (evita texto minúsculo)
 *  - entre 1.0 e 1.3 → escala linear normal
 *  - acima de 1.3 → escala amortecida (evita fonte gigante em acessibilidade)
 *
 * @usage
 *   import { useTheme } from '@/theme/useTheme';
 *   const { typography } = useTheme();
 *   <Text style={typography.styles.bodyMd}>Olá</Text>
 */

import { PixelRatio } from 'react-native';

// ─── Escala responsiva ────────────────────────────────────────────────────────

/**
 * Normaliza um tamanho de fonte levando em conta o font scale do sistema.
 * Dispositivos com acessibilidade ativada aumentam o fontScale, o que
 * poderia quebrar layouts fixos — aqui amortecemos esse crescimento.
 */
export function normalizeFont(size: number): number {
  const scale = PixelRatio.getFontScale();

  if (scale <= 1.0) {
    // Dispositivos com densidade baixa: mantém tamanho base
    return size;
  }

  if (scale <= 1.3) {
    // Escala linear normal
    return Math.round(size * scale);
  }

  // Escala amortecida: cresce 60% do excedente acima de 1.3
  const excess = scale - 1.3;
  return Math.round(size * (1.3 + excess * 0.6));
}

// ─── Família tipográfica ──────────────────────────────────────────────────────

export const fontFamily = {
  regular: 'System', // troque pelo nome da fonte customizada se houver
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
} as const;

// ─── Pesos ────────────────────────────────────────────────────────────────────

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

// ─── Tamanhos base (antes da normalização) ────────────────────────────────────

const baseSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  huge: 34,
} as const;

/** Tamanhos normalizados prontos para uso */
export const fontSize = Object.fromEntries(
  Object.entries(baseSizes).map(([key, value]) => [key, normalizeFont(value)]),
) as Record<keyof typeof baseSizes, number>;

// ─── Line heights (múltiplo do fontSize) ─────────────────────────────────────

export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

// ─── Estilos compostos prontos para uso ───────────────────────────────────────
// Esses objetos podem ser espalhados diretamente em StyleSheet ou style prop.

export const textStyles = {
  /** Títulos de tela / section */
  headingXl: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.xxxl * lineHeight.tight,
  },
  headingLg: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.xxl * lineHeight.tight,
  },
  headingMd: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.xl * lineHeight.tight,
  },
  headingSm: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.lg * lineHeight.normal,
  },

  /** Corpo de texto */
  bodyLg: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.lg * lineHeight.relaxed,
  },
  bodyMd: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.md * lineHeight.relaxed,
  },
  bodySm: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.sm * lineHeight.relaxed,
  },

  /** Labels e metadados */
  labelLg: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.md * lineHeight.normal,
  },
  labelMd: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  labelSm: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.xs * lineHeight.normal,
  },

  /** Número de mesa — destaque grande */
  tableNumber: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.xxxl * lineHeight.tight,
  },

  /** Valor monetário em card */
  currency: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.md * lineHeight.normal,
  },
} as const;

export type TextStyleKey = keyof typeof textStyles;
