/**
 * @file useTheme.ts
 * @description Hook principal de acesso ao tema.
 *
 * Detecta automaticamente o modo do sistema (light/dark) via
 * `useColorScheme` do React Native e retorna o tema correto.
 *
 * @example Uso básico
 *   import { useTheme } from '@/theme/useTheme';
 *
 *   function MyComponent() {
 *     const { colors, spacing, typography, layout } = useTheme();
 *
 *     return (
 *       <View style={{
 *         backgroundColor: colors.background.primary,
 *         padding: spacing.lg,
 *         borderRadius: radii.md,
 *       }}>
 *         <Text style={[
 *           typography.styles.bodyMd,
 *           { color: colors.text.primary }
 *         ]}>
 *           Olá!
 *         </Text>
 *       </View>
 *     );
 *   }
 *
 * @example Status de mesa
 *   const { colors } = useTheme();
 *   const statusColor = colors.tableStatus.active.background;
 *
 * @example Dimensão de card
 *   const { layout } = useTheme();
 *   <View style={{ width: layout.tableCardWidth }} />
 */

import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, type Theme } from './theme';

/**
 * Retorna o tema completo de acordo com o modo de cor do sistema.
 * Todas as propriedades são tipadas — o IntelliSense guia o uso.
 */
export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}
