export const brand = {
  washi: '#FAF6F0',
  sumi: '#1E1E24',
  matcha: '#5F7256',
  vermilion: '#D35A47',
  tokiwa: '#28382C',
  card: '#FFFFFF',
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

export const themes = {
  washi: {
    bg: brand.washi,
    card: brand.card,
    text: brand.sumi,
    muted: 'rgba(30,30,36,0.55)',
    line: 'rgba(30,30,36,0.1)',
    soft: '#F3EDE4',
  },
  sepia: {
    bg: '#F1E5D2',
    card: '#FBF4E6',
    text: '#3A2C1C',
    muted: 'rgba(58,44,28,0.56)',
    line: 'rgba(58,44,28,0.14)',
    soft: '#E8D8BE',
  },
  dark: {
    bg: '#1B1B21',
    card: '#27272F',
    text: '#ECE6DA',
    muted: 'rgba(236,230,218,0.58)',
    line: 'rgba(236,230,218,0.14)',
    soft: '#202027',
  },
} as const;
