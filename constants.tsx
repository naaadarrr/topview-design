
import React from 'react';
import { ColorSwatch, NavItem } from './types';

export const CORE_COLORS: ColorSwatch[] = [
  { name: 'TopView Purple', hex: '#731DFB', description: 'Our signature brand color. Vibrant, digital, and authoritative.', textColor: '#FFFFFF' },
  { name: 'Deep Night', hex: '#0B1020', description: 'The darkest foundation for our interface and typography.', textColor: '#FFFFFF' },
  { name: 'Pure White', hex: '#FFFFFF', description: 'Clean slate for clarity and focus.', textColor: '#000000' },
  { name: 'Soft Gray', hex: '#F9FAFB', description: 'Subtle contrast for secondary surfaces.', textColor: '#000000' },
];

export const TOPVIEW_PURPLE_SCALE: ColorSwatch[] = [
  { name: 'Purple 50', hex: '#F4EBFF', description: 'Subtle Backgrounds' },
  { name: 'Purple 100', hex: '#E2CCFF', description: 'Disabled States' },
  { name: 'Purple 200', hex: '#CBA6FF', description: 'Light Borders' },
  { name: 'Purple 300', hex: '#A873FF', description: 'Accent Hover' },
  { name: 'Purple 400', hex: '#8F47FF', description: 'Secondary Actions' },
  { name: 'Purple 500', hex: '#731DFB', description: 'Brand Primary' },
  { name: 'Purple 600', hex: '#6819E3', description: 'Primary Hover' },
  { name: 'Purple 700', hex: '#5114B1', description: 'Primary Pressed' },
  { name: 'Purple 800', hex: '#3F0F8A', description: 'Deep Accents' },
  { name: 'Purple 900', hex: '#300C69', description: 'Text Overlays' },
  { name: 'Purple 950', hex: '#1A0638', description: 'Grounding' },
];

/** @deprecated Use TOPVIEW_PURPLE_SCALE */
export const TOPVIEW_BLUE_SCALE = TOPVIEW_PURPLE_SCALE;

export const ALPHA_SCALES = {
  white: [
    { p: '3%', hex: '#FFFFFF08' },
    { p: '5%', hex: '#FFFFFF0D' },
    { p: '8%', hex: '#FFFFFF14' },
    { p: '16%', hex: '#FFFFFF29' },
    { p: '24%', hex: '#FFFFFF3D' },
    { p: '36%', hex: '#FFFFFF5C' },
    { p: '48%', hex: '#FFFFFF7A' },
    { p: '64%', hex: '#FFFFFFA3' },
    { p: '80%', hex: '#FFFFFFCC' },
    { p: '92%', hex: '#FFFFFFEB' },
    { p: '95%', hex: '#FFFFFFF2' },
  ],
  black: [
    { p: '3%', hex: '#00000008' },
    { p: '5%', hex: '#0000000D' },
    { p: '8%', hex: '#00000014' },
    { p: '16%', hex: '#00000029' },
    { p: '24%', hex: '#0000003D' },
    { p: '36%', hex: '#0000005C' },
    { p: '48%', hex: '#0000007A' },
    { p: '64%', hex: '#000000A3' },
    { p: '80%', hex: '#000000CC' },
    { p: '92%', hex: '#000000EB' },
    { p: '95%', hex: '#000000F2' },
  ]
};

// Chakra UI style typography tokens
export const FONT_SIZES = [
  { token: '2xs', value: '10px' },
  { token: 'xs', value: '12px' },
  { token: 'sm', value: '14px' },
  { token: 'md', value: '16px' },
  { token: 'lg', value: '18px' },
  { token: 'xl', value: '20px' },
  { token: '2xl', value: '24px' },
  { token: '3xl', value: '30px' },
  { token: '4xl', value: '36px' },
  { token: '5xl', value: '48px' },
  { token: '6xl', value: '60px' },
  { token: '7xl', value: '72px' },
  { token: '8xl', value: '96px' },
  { token: '9xl', value: '128px' },
];

export const FONT_WEIGHTS = [
  { token: 'hairline', value: '100' },
  { token: 'thin', value: '200' },
  { token: 'light', value: '300' },
  { token: 'normal', value: '400' },
  { token: 'medium', value: '500' },
  { token: 'semibold', value: '600' },
  { token: 'bold', value: '700' },
  { token: 'extrabold', value: '800' },
  { token: 'black', value: '900' },
];

export const LINE_HEIGHTS = [
  { token: 'normal', value: 'normal' },
  { token: 'none', value: '1' },
  { token: 'shorter', value: '1.25' },
  { token: 'short', value: '1.375' },
  { token: 'base', value: '1.5' },
  { token: 'tall', value: '1.625' },
  { token: 'taller', value: '2' },
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'logo', label: 'Logo', path: '/logo' },
  { id: 'colors', label: 'Color', path: '/colors' },
  { id: 'typography', label: 'Typography', path: '/typography' },
  { id: 'motion', label: 'Motion', path: '/motion' },
];

export const JUHUO_NAV_ITEMS: NavItem[] = [
  { id: 'juhuo-colors', label: 'Color', path: '/juhuo/colors' },
];

export const LANDING_MODULES: import('./types').LandingModule[] = [
  // How to Series
  {
    id: 'how-to-01',
    title: 'How It Works (3 Steps)',
    category: 'how-to',
    thumbnail: '/landing/how-to-01.png', // Needs screenshot
    figmaNodeId: '6867:23533',
    figmaUrl: 'https://www.figma.com/design/nVMnG7HHhuaDazIbIRDevj/%E5%AE%98%E7%BD%91-Website?node-id=6867-23533&m=dev',
    componentName: 'HowToStep1'
  },
  {
    id: 'how-to-02',
    title: 'How it works - Step 02',
    category: 'how-to',
    thumbnail: '/landing/how-to-02.png',
    figmaNodeId: '123:457',
    figmaUrl: 'https://www.figma.com/design/your-file-id?node-id=123:457'
  },
  // Why use TopView
  {
    id: 'why-use-01',
    title: 'Value Proposition 01',
    category: 'why-use',
    thumbnail: '/landing/why-use-01.png',
    figmaNodeId: '123:458',
    figmaUrl: 'https://www.figma.com/design/your-file-id?node-id=123:458'
  },
  // Features
  {
    id: 'feature-01',
    title: 'Feature Showcase 01',
    category: 'features',
    thumbnail: '/landing/feature-01.png',
    figmaNodeId: '123:459',
    figmaUrl: 'https://www.figma.com/design/your-file-id?node-id=123:459'
  }
];
