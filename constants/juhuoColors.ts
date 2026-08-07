import { ColorSwatch } from '../types';

/** Juhuo brand primary — sampled from logo flame gradient anchor */
export const JUHUO_PRIMARY = {
  name: 'JUHUO FLAME',
  hex: '#E83028',
  rgb: '232 / 48 / 40',
  cmyk: '0 / 79 / 83 / 9',
  pms: '172 C',
} as const;

export const JUHUO_FLAME_SCALE: ColorSwatch[] = [
  { name: 'Flame 50',  hex: '#FFF5EE', description: 'Subtle Backgrounds',    wcagWhite: 1.07, wcagBlack: 19.55 },
  { name: 'Flame 100', hex: '#FFD18E', description: 'Disabled States',       wcagWhite: 1.42, wcagBlack: 14.76 },
  { name: 'Flame 200', hex: '#F0A868', description: 'Light Borders',         wcagWhite: 2.00, wcagBlack: 10.51 },
  { name: 'Flame 300', hex: '#F09060', description: 'Accent Hover',          wcagWhite: 2.37, wcagBlack: 8.86  },
  { name: 'Flame 400', hex: '#FF7E47', description: 'Secondary Actions',     wcagWhite: 2.52, wcagBlack: 8.33  },
  { name: 'Flame 500', hex: '#E83028', description: 'Brand Primary',         wcagWhite: 4.30, wcagBlack: 4.88  },
  { name: 'Flame 600', hex: '#C6281A', description: 'Primary Hover',         wcagWhite: 5.65, wcagBlack: 3.72  },
  { name: 'Flame 700', hex: '#A62220', description: 'Primary Pressed',       wcagWhite: 7.31, wcagBlack: 2.87  },
  { name: 'Flame 800', hex: '#911D1B', description: 'Deep Accents',          wcagWhite: 8.77, wcagBlack: 2.40  },
  { name: 'Flame 900', hex: '#6B1410', description: 'Text Overlays',         wcagWhite: 12.12, wcagBlack: 1.73 },
] as ColorSwatch[];

export const JUHUO_GRADIENTS = {
  brand: {
    name: 'Brand Gradient',
    from: '#E83028',
    to: '#FFD18E',
    css: 'linear-gradient(135deg, #E83028 0%, #FF7E47 50%, #FFD18E 100%)',
    type: 'Linear Gradient',
    angle: '135deg',
    description: 'Logo flame gradient — diagonal from deep red-orange to warm peach',
  },
  fill: {
    name: 'Fill Gradient',
    from: '#C6281A',
    to: '#F0A868',
    css: 'linear-gradient(180deg, #C6281A 0%, #F0A868 100%)',
    type: 'Linear Gradient',
    angle: '180deg',
    description: 'Primary fill gradient for surfaces and CTAs',
  },
  text: {
    name: 'Text Gradient',
    from: '#FF7E47',
    to: '#FFD18E',
    css: 'linear-gradient(90deg, #FF7E47 0%, #FFD18E 100%)',
    type: 'Linear Gradient',
    angle: '90deg',
    description: 'Used for headings and emphasis on dark backgrounds',
  },
  cyanSpark: {
    name: 'Cyan Spark',
    from: '#E83028',
    to: '#00E5FF',
    css: 'linear-gradient(135deg, #E83028 0%, #FF7E47 42%, #FFD18E 70%, #00E5FF 100%)',
    type: 'Linear Gradient',
    angle: '135deg',
    description: 'Flame meets electric tech — cold/warm contrast',
  },
  limeEnergy: {
    name: 'Lime Energy',
    from: '#E83028',
    to: '#B6FF2E',
    css: 'linear-gradient(135deg, #E83028 0%, #FF7E47 45%, #E6E85C 75%, #B6FF2E 100%)',
    type: 'Linear Gradient',
    angle: '135deg',
    description: 'Flame meets viral growth — fresh/warm contrast',
  },
  pinkPulse: {
    name: 'Pink Pulse',
    from: '#FFD18E',
    to: '#FF2A6D',
    css: 'linear-gradient(135deg, #FFD18E 0%, #FF7E47 25%, #E83028 60%, #FF2A6D 100%)',
    type: 'Linear Gradient',
    angle: '135deg',
    description: 'Orange-Yellow to Red to Pink — smooth transition from logo warmth to creator neon',
  }
} as const;

export const JUHUO_ACCENTS = [
  { name: 'Electric Cyan', hex: '#00E5FF', description: 'Tech, energy, cold contrast', wcagWhite: 1.25, wcagBlack: 16.7 },
  { name: 'Energy Lime', hex: '#B6FF2E', description: 'Growth, viral, fresh contrast', wcagWhite: 1.18, wcagBlack: 17.7 },
  { name: 'Signal Green', hex: '#38F26B', description: 'Success, data up, active', wcagWhite: 1.5, wcagBlack: 13.9 },
  { name: 'Neon Pink', hex: '#FF2A6D', description: 'Entertainment, creator, playful', wcagWhite: 3.2, wcagBlack: 6.5 },
];
