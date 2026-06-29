import type { ThemeMode } from '../types';

export const brand = {
  washi: '#FAF6F0',
  sumi: '#1E1E24',
  matcha: '#5F7256',
  vermilion: '#D35A47',
  tokiwa: '#28382C',
  card: '#FFFFFF',
} as const;

export const themes: Record<
  ThemeMode,
  {
    bg: string;
    card: string;
    text: string;
    muted: string;
    line: string;
    soft: string;
    inverse: string;
  }
> = {
  washi: {
    bg: '#FAF6F0',
    card: '#FFFFFF',
    text: '#1E1E24',
    muted: 'rgba(30,30,36,0.55)',
    line: 'rgba(30,30,36,0.1)',
    soft: '#F3EDE4',
    inverse: '#FAF6F0',
  },
  sepia: {
    bg: '#F1E5D2',
    card: '#FBF4E6',
    text: '#3A2C1C',
    muted: 'rgba(58,44,28,0.56)',
    line: 'rgba(58,44,28,0.14)',
    soft: '#E8D8BE',
    inverse: '#FBF4E6',
  },
  dark: {
    bg: '#1B1B21',
    card: '#27272F',
    text: '#ECE6DA',
    muted: 'rgba(236,230,218,0.58)',
    line: 'rgba(236,230,218,0.14)',
    soft: '#202027',
    inverse: '#1E1E24',
  },
};

export const semantic = {
  primary: brand.matcha,
  secondary: brand.tokiwa,
  accent: brand.vermilion,
  known: brand.matcha,
  learning: brand.vermilion,
  locked: 'rgba(30,30,36,0.28)',
} as const;

export const fonts = {
  serif: 'Lora_500Medium',
  serifRegular: 'Lora_400Regular',
  serifItalic: 'Lora_400Regular_Italic',
  sans: 'PlusJakartaSans_400Regular',
  sansMedium: 'PlusJakartaSans_500Medium',
  sansSemiBold: 'PlusJakartaSans_600SemiBold',
  sansBold: 'PlusJakartaSans_700Bold',
  jp: 'NotoSerifJP_500Medium',
  jpRegular: 'NotoSerifJP_400Regular',
  jpBold: 'NotoSerifJP_700Bold',
} as const;

export const colors = {
  bg: themes.washi.bg,
  surface: themes.washi.card,
  surfaceSoft: themes.washi.soft,
  text: themes.washi.text,
  muted: themes.washi.muted,
  accent: brand.matcha,
  accent2: brand.tokiwa,
  accentSoft: 'rgba(95,114,86,0.16)',
  border: themes.washi.line,
  danger: brand.vermilion,
  dangerSoft: 'rgba(211,90,71,0.12)',
} as const;

export const type = {
  serif: 'Lora_500Medium',
  serifRegular: 'Lora_400Regular',
  serifItalic: 'Lora_400Regular_Italic',
  sans: 'PlusJakartaSans_400Regular',
  sansMedium: 'PlusJakartaSans_500Medium',
  sansSemiBold: 'PlusJakartaSans_600SemiBold',
  sansBold: 'PlusJakartaSans_700Bold',
  jp: 'NotoSerifJP_500Medium',
  jpRegular: 'NotoSerifJP_400Regular',
  jpBold: 'NotoSerifJP_700Bold',
} as const;
