/**
 * @file layout.ts
 * @description Tokens de layout e responsividade.
 *
 * Usa `Dimensions` do React Native para calcular proporções seguras
 * para diferentes tamanhos de tela e densidades de pixel.
 *
 * Breakpoints adaptados para o contexto mobile:
 *  - small:  largura < 360px (dispositivos compactos antigos)
 *  - medium: 360px – 414px (maioria dos Android midrange)
 *  - large:  > 414px (iPhones Plus, Android flagships)
 *
 * @usage
 *   import { useTheme } from '@/theme/useTheme';
 *   const { layout } = useTheme();
 *   <View style={{ paddingHorizontal: layout.screenPaddingH }} />
 */

import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// ─── Breakpoints ──────────────────────────────────────────────────────────────

export const breakpoints = {
  small: 360,
  medium: 414,
  large: 768,
} as const;

export type ScreenSize = 'small' | 'medium' | 'large';

export function getScreenSize(): ScreenSize {
  if (SCREEN_W < breakpoints.small) return 'small';
  if (SCREEN_W < breakpoints.medium) return 'medium';
  return 'large';
}

// ─── Dimensões da tela ────────────────────────────────────────────────────────

export const screen = {
  width: SCREEN_W,
  height: SCREEN_H,
  isSmall: SCREEN_W < breakpoints.small,
  isMedium: SCREEN_W >= breakpoints.small && SCREEN_W < breakpoints.medium,
  isLarge: SCREEN_W >= breakpoints.medium,
} as const;

// ─── Layout da grade de mesas ─────────────────────────────────────────────────
// O mapa de mesas usa um grid de 3 colunas.
// Calculamos o tamanho do card dinamicamente para nunca quebrar o layout.

const GRID_COLUMNS = 3;
const GRID_H_PADDING = 16; // padding horizontal de cada lado da tela
const GRID_GAP = 8; // espaço entre cards

/** Largura de cada card de mesa em pixels */
export const tableCardWidth = Math.floor(
  (SCREEN_W - GRID_H_PADDING * 2 - GRID_GAP * (GRID_COLUMNS - 1)) /
    GRID_COLUMNS,
);

/** Altura do card de mesa (proporção fixa) */
export const tableCardHeight = Math.floor(tableCardWidth * 1.15);

// ─── Padding horizontal padrão de tela ───────────────────────────────────────

export const screenPaddingH = screen.isSmall ? 12 : 16;
export const screenPaddingV = 16;

// ─── Alturas fixas de componentes ────────────────────────────────────────────

export const componentHeights = {
  /** Header da tela (título + botão voltar) */
  header: screen.isSmall ? 52 : 56,
  /** Barra de busca */
  searchBar: 48,
  /** Tabs de filtro */
  filterTabs: 40,
  /** Linha de status bar (compensação manual se necessário) */
  statusBar: Platform.OS === 'ios' ? 44 : 24,
  /** Bottom sheet handle area */
  sheetHandle: 24,
  /** Altura mínima do bottom sheet de novo pedido */
  sheetMinH: 200,
} as const;

// ─── Hit slop padrão (área de toque) ─────────────────────────────────────────
// Garante área mínima de 44x44pt como recomendado por Apple/Google.

export const hitSlop = {
  top: 8,
  bottom: 8,
  left: 8,
  right: 8,
} as const;

// ─── Z-index stack ────────────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  card: 10,
  header: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
} as const;
