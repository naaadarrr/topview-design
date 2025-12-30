
import React from 'react';
import { ColorSwatch, NavItem } from './types';

export const CORE_COLORS: ColorSwatch[] = [
  { name: 'TopView Blue', hex: '#3643FF', description: 'Our signature brand color. Vibrant, digital, and authoritative.', textColor: '#FFFFFF' },
  { name: 'Deep Night', hex: '#0B1020', description: 'The darkest foundation for our interface and typography.', textColor: '#FFFFFF' },
  { name: 'Pure White', hex: '#FFFFFF', description: 'Clean slate for clarity and focus.', textColor: '#000000' },
  { name: 'Soft Gray', hex: '#F9FAFB', description: 'Subtle contrast for secondary surfaces.', textColor: '#000000' },
];

export const TOPVIEW_BLUE_SCALE: ColorSwatch[] = [
  { name: 'Blue 50', hex: '#EBECFF', description: 'Subtle Backgrounds' },
  { name: 'Blue 100', hex: '#C1C5FF', description: 'Disabled States' },
  { name: 'Blue 200', hex: '#A3A9FF', description: 'Light Borders' },
  { name: 'Blue 300', hex: '#7881FF', description: 'Accent Hover' },
  { name: 'Blue 400', hex: '#5E69FF', description: 'Secondary Actions' },
  { name: 'Blue 500', hex: '#3643FF', description: 'Brand Primary' },
  { name: 'Blue 600', hex: '#313DE8', description: 'Primary Hover' },
  { name: 'Blue 700', hex: '#2630B5', description: 'Primary Pressed' },
  { name: 'Blue 800', hex: '#1E258C', description: 'Deep Accents' },
  { name: 'Blue 900', hex: '#171C6B', description: 'Text Overlays' },
  { name: 'Blue 950', hex: '#0B1020', description: 'Grounding' },
];

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
