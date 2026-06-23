/**
 * @file index.ts
 * @description Barrel export do módulo de tema.
 *
 * Importar sempre por aqui para manter os paths limpos:
 *   import { useTheme, lightTheme } from '@/theme';
 */

export { useTheme } from './useTheme';
export { lightTheme, darkTheme } from './theme';
export type { Theme } from './theme';
export type { ColorTokens } from './colors';
export type { SpacingKey, RadiiKey } from './spacing';
export type { TextStyleKey } from './typography';
export { tableCardWidth, tableCardHeight } from './layout';
