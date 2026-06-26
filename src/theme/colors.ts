/**
 * @file colors.ts
 * @description Paleta de cores do aplicativo.
 *
 * Organizada em três camadas:
 *  1. `palette`   — valores brutos (hex), nunca usados diretamente nas telas
 *  2. `lightColors` / `darkColors` — tokens semânticos mapeados para cada modo
 *  3. `tableStatus` — cores específicas para os cards de mesa
 *
 * @usage
 *   import { useTheme } from '@/theme/useTheme';
 *   const { colors } = useTheme();
 *   <View style={{ backgroundColor: colors.background.primary }} />
 */

// ─── 1. Paleta base (raw values) ────────────────────────────────────────────

const palette = {
  // Marca
  brand: {
    primary: '#E8610A',
    primaryLight: '#F28440',
    primaryDark: '#B54A07',
  },

  // Neutros
  neutral: {
    0: '#FFFFFF',
    50: '#F7F7F5',
    100: '#EFEFEC',
    200: '#E0E0DB',
    300: '#C8C8C2',
    400: '#A0A09A',
    500: '#787872',
    600: '#5A5A55',
    700: '#3D3D3A',
    800: '#222220',
    900: '#111110',
  },

  // Verde — mesa em atendimento
  green: {
    50: '#EAF7EE',
    100: '#C3EACE',
    300: '#5DC87A',
    500: '#28A44A',
    700: '#1A6E31',
    900: '#0D3919',
  },

  // Vermelho — mesa aguardando / alerta
  red: {
    50: '#FDECEA',
    100: '#F9C5C0',
    300: '#F07068',
    500: '#E03030',
    700: '#9E1F1F',
    900: '#4F1010',
  },

  // Âmbar — mesa ociosa
  amber: {
    50: '#FEF8E7',
    100: '#FDEDB8',
    300: '#F9CC5C',
    500: '#E6A817',
    700: '#9E7010',
    900: '#4F3808',
  },

  // Azul — informações / destaques
  blue: {
    50: '#E8F1FD',
    100: '#BDD5F9',
    300: '#6AAAF0',
    500: '#2176D9',
    700: '#154F96',
    900: '#0A274B',
  },
} as const;

// ─── 2. Interface explícita de tokens ────────────────────────────────────────
// Descreve a FORMA dos tokens, não os valores literais.
// Isso permite que lightColors e darkColors tenham valores diferentes
// sem conflito de tipos.

export type ColorTokens = {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  surface: {
    default: string;
    raised: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
    link: string;
  };
  brand: {
    default: string;
    light: string;
    dark: string;
  };
  border: {
    default: string;
    strong: string;
    focus: string;
  };
  icon: {
    default: string;
    muted: string;
    inverse: string;
    brand: string;
  };
  feedback: {
    success: string;
    successLight: string;
    error: string;
    errorLight: string;
    warning: string;
    warningLight: string;
    info: string;
    infoLight: string;
  };
  tableStatus: {
    active: { background: string; text: string; border: string };
    waiting: { background: string; text: string; border: string };
    idle: { background: string; text: string; border: string };
    available: { background: string; text: string; border: string };
  };
  overlay: string;
};

// ─── 3. Tokens semânticos ────────────────────────────────────────────────────

export const lightColors: ColorTokens = {
  // Backgrounds
  background: {
    primary: palette.neutral[0], // tela principal
    secondary: palette.neutral[50], // cards, inputs
    tertiary: palette.neutral[100], // separadores, hover states
    inverse: palette.neutral[900],
  },

  // Superfícies
  surface: {
    default: palette.neutral[0],
    raised: palette.neutral[0],
    overlay: palette.neutral[50],
  },

  // Textos
  text: {
    primary: palette.neutral[900],
    secondary: palette.neutral[600],
    tertiary: palette.neutral[400],
    disabled: palette.neutral[300],
    inverse: palette.neutral[0],
    link: palette.blue[500],
  },

  // Marca
  brand: {
    default: palette.brand.primary,
    light: palette.brand.primaryLight,
    dark: palette.brand.primaryDark,
  },

  // Bordas
  border: {
    default: palette.neutral[200],
    strong: palette.neutral[300],
    focus: palette.brand.primary,
  },

  // Ícones
  icon: {
    default: palette.neutral[700],
    muted: palette.neutral[400],
    inverse: palette.neutral[0],
    brand: palette.brand.primary,
  },

  // Feedback
  feedback: {
    success: palette.green[500],
    successLight: palette.green[50],
    error: palette.red[500],
    errorLight: palette.red[50],
    warning: palette.amber[500],
    warningLight: palette.amber[50],
    info: palette.blue[500],
    infoLight: palette.blue[50],
  },

  // Status das mesas
  tableStatus: {
    // Em atendimento — verde
    active: {
      background: palette.green[100],
      text: palette.green[700],
      border: palette.green[300],
    },
    // Aguardando / sem pedido recente — vermelho
    waiting: {
      background: palette.red[100],
      text: palette.red[700],
      border: palette.red[300],
    },
    // Ociosa (aberta mas sem consumo) — âmbar
    idle: {
      background: palette.amber[100],
      text: palette.amber[700],
      border: palette.amber[300],
    },
    // Disponível / livre — neutro
    available: {
      background: palette.neutral[0],
      text: palette.neutral[700],
      border: palette.neutral[200],
    },
  },

  // Overlay / modal
  overlay: 'rgba(0, 0, 0, 0.45)',
};

export const darkColors: ColorTokens = {
  background: {
    primary: palette.neutral[900],
    secondary: palette.neutral[800],
    tertiary: palette.neutral[700],
    inverse: palette.neutral[0],
  },

  surface: {
    default: palette.neutral[800],
    raised: palette.neutral[700],
    overlay: palette.neutral[800],
  },

  text: {
    primary: palette.neutral[50],
    secondary: palette.neutral[300],
    tertiary: palette.neutral[500],
    disabled: palette.neutral[600],
    inverse: palette.neutral[900],
    link: palette.blue[300],
  },

  brand: {
    default: palette.brand.primaryLight,
    light: palette.brand.primary,
    dark: palette.brand.primaryDark,
  },

  border: {
    default: palette.neutral[700],
    strong: palette.neutral[600],
    focus: palette.brand.primaryLight,
  },

  icon: {
    default: palette.neutral[200],
    muted: palette.neutral[500],
    inverse: palette.neutral[900],
    brand: palette.brand.primaryLight,
  },

  feedback: {
    success: palette.green[300],
    successLight: palette.green[900],
    error: palette.red[300],
    errorLight: palette.red[900],
    warning: palette.amber[300],
    warningLight: palette.amber[900],
    info: palette.blue[300],
    infoLight: palette.blue[900],
  },

  tableStatus: {
    active: {
      background: palette.green[700],
      text: palette.green[100],
      border: palette.green[500],
    },
    waiting: {
      background: palette.red[700],
      text: palette.red[100],
      border: palette.red[500],
    },
    idle: {
      background: palette.amber[700],
      text: palette.amber[100],
      border: palette.amber[500],
    },
    available: {
      background: palette.neutral[800],
      text: palette.neutral[200],
      border: palette.neutral[600],
    },
  },

  overlay: 'rgba(0, 0, 0, 0.65)',
};
