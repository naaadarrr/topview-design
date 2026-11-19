
import React from 'react';
import { ColorSwatch, NavItem } from './types';
import lockedSystem from './contracts/locked-system.json';

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
  { name: 'Purple 400', hex: '#9452FF', description: 'Slider / Switch / Secondary Actions' },
  { name: 'Purple 500', hex: '#731DFB', description: 'Brand Primary' },
  { name: 'Purple 600', hex: '#6819E3', description: 'Primary Hover' },
  { name: 'Purple 700', hex: '#5114B1', description: 'Primary Pressed' },
  { name: 'Purple 800', hex: '#3F0F8A', description: 'Deep Accents' },
  { name: 'Purple 900', hex: '#300C69', description: 'Text Overlays' },
  { name: 'Purple 950', hex: '#1A0638', description: 'Grounding' },
];

export type SupportingColor = {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
};

export const TOPVIEW_SUPPORTING_COLORS: SupportingColor[] = [
  { name: 'Team Sky', hex: '#3D7AE8', rgb: '61 / 122 / 232', usage: 'Team plan CTA' },
  { name: 'Accent Blue', hex: '#2F6BFF', rgb: '47 / 107 / 255', usage: 'Accent badge / blue CTA' },
  { name: 'Credits Lilac', hex: '#D4B5FF', rgb: '212 / 181 / 255', usage: 'Credits icon / status text' },
  { name: 'Promo Pink', hex: '#F0B7FF', rgb: '240 / 183 / 255', usage: 'Strikethrough / promo' },
  { name: 'Credits Magenta', hex: '#ED1572', rgb: '237 / 21 / 114', usage: 'Credits badge' },
  { name: 'Enterprise Gold', hex: '#FFD666', rgb: '255 / 214 / 102', usage: 'Enterprise CTA stop' },
  { name: 'Codex Lavender', hex: '#DED0FF', rgb: '222 / 208 / 255', usage: 'Codex plugin banner' },
  { name: 'Codex Yellow', hex: '#FFF36D', rgb: '255 / 243 / 109', usage: 'Codex offer badge' },
  { name: 'Codex Coral', hex: '#FF795F', rgb: '255 / 121 / 95', usage: 'Codex banner accent' },
  { name: 'Codex Lime', hex: '#C9F75E', rgb: '201 / 247 / 94', usage: 'Codex banner accent' },
];

export type GradientSwatch = {
  name: string;
  css: string;
  from: string;
  to: string;
  type: string;
  angle: string;
  description: string;
};

export const TOPVIEW_GRADIENTS: GradientSwatch[] = [
  {
    name: 'Home Title',
    css: 'linear-gradient(90deg, #AEB4BE 0%, #F2F4F7 28%, #FFFFFF 50%, #F2F4F7 72%, #AEB4BE 100%)',
    from: '#AEB4BE',
    to: '#FFFFFF',
    type: 'Linear',
    angle: '90deg',
    description: 'Homepage hero title',
  },
  {
    name: 'Home Accent',
    css: 'linear-gradient(150deg, #C9A4FF 0%, #9B4DFF 45%, #731DFB 100%)',
    from: '#C9A4FF',
    to: '#731DFB',
    type: 'Linear',
    angle: '150deg',
    description: 'Homepage title hover / highlight',
  },
  {
    name: 'Fill Gradient',
    css: 'linear-gradient(180deg, #731DFB 0%, #A873FF 100%)',
    from: '#731DFB',
    to: '#A873FF',
    type: 'Linear',
    angle: '180deg',
    description: 'Primary fill',
  },
  {
    name: 'Text Gradient',
    css: 'linear-gradient(90deg, #A873FF 0.04%, #E2CCFF 99.93%)',
    from: '#A873FF',
    to: '#E2CCFF',
    type: 'Linear',
    angle: '90deg',
    description: 'Headings and emphasis',
  },
  {
    name: 'Business Ribbon',
    css: 'linear-gradient(94deg, #A78BFA 0%, #E879F9 35%, #FB7185 65%, #FDE047 100%)',
    from: '#A78BFA',
    to: '#FDE047',
    type: 'Linear',
    angle: '94deg',
    description: 'Business plan banner',
  },
  {
    name: 'Trial Ribbon',
    css: 'linear-gradient(94deg, #FF7A2F 0%, #FF3B5C 50%, #FF6BB5 100%)',
    from: '#FF7A2F',
    to: '#FF6BB5',
    type: 'Linear',
    angle: '94deg',
    description: 'Pro trial banner',
  },
  {
    name: 'Enterprise CTA',
    css: 'linear-gradient(90deg, #FFFFFF 0%, #FFF3D6 50%, #FFD666 100%)',
    from: '#FFFFFF',
    to: '#FFD666',
    type: 'Linear',
    angle: '90deg',
    description: 'Contact sales button',
  },
  {
    name: 'Credits Badge',
    css: 'radial-gradient(32.86% 208.82% at 50% 45.45%, #F920D1 0%, #ED1572 100%)',
    from: '#F920D1',
    to: '#ED1572',
    type: 'Radial',
    angle: '—',
    description: 'Buy credits chip',
  },
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

/**
 * HIDDEN_SECTIONS: the one switch for hiding a section without deleting it.
 * A listed id (and every id under it, e.g. `components-rules/<lock>`) is left out of the
 * left nav, the Landing catalog and the page content. Its hashes redirect (App.tsx
 * resolveHiddenTarget): a hidden top-level section goes to the catalog, a hidden child
 * goes to the first visible child of its parent. Pages, translation keys and
 * contracts/locked-system.json stay in place.
 * To restore a section, delete its line below.
 */
export const HIDDEN_SECTIONS: ReadonlySet<string> = new Set([
  'motion', // mem647: Motion with Principles / Incorrect / Specs
  'components-rules', // mem648: Components › Rules and the lock rule pages
]);

export const isHiddenSection = (id: string): boolean =>
  [...HIDDEN_SECTIONS].some((hidden) => id === hidden || id.startsWith(`${hidden}/`));

const withoutHidden = (items: NavItem[]): NavItem[] =>
  items
    .filter((item) => !isHiddenSection(item.id))
    .map((item) => (item.children ? { ...item, children: withoutHidden(item.children) } : item));

/** Full tree, hidden sections included. Use NAV_ITEMS for anything shown. */
export const ALL_NAV_ITEMS: NavItem[] = [
  {
    id: 'logo',
    label: 'Logo',
    path: '/logo',
    children: [
      { id: 'logo-horizontal', label: 'Horizontal', path: '/logo/horizontal' },
      { id: 'logo-horizontal-reverse', label: 'Horizontal Reverse', path: '/logo/horizontal-reverse' },
      { id: 'logo-horizontal-purple', label: 'Horizontal Purple', path: '/logo/horizontal-purple' },
      { id: 'logo-vertical', label: 'Vertical', path: '/logo/vertical' },
      { id: 'logo-symbol', label: 'Symbol', path: '/logo/symbol' },
      { id: 'logo-animation', label: 'Animation', path: '/logo/animation' },
      { id: 'logo-favicon', label: 'Favicon', path: '/logo/favicon' },
      { id: 'logo-japan', label: 'Japan', path: '/logo/japan' },
      { id: 'logo-download', label: 'Download all', path: '/logo/download' },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    path: '/foundations',
    // Nav-only group. Color, Spacing, Radius, Typography, and Glass stay separate pages and keep their hashes.
    group: true,
    children: [
      {
        id: 'colors',
        label: 'Color',
        path: '/colors',
        children: [
          { id: 'colors-purple', label: 'Purple', path: '/colors/purple' },
          { id: 'colors-supporting', label: 'Supporting', path: '/colors/supporting' },
          { id: 'colors-layers', label: 'Layers', path: '/colors/layers' },
          { id: 'colors-gray', label: 'Gray', path: '/colors/gray' },
          { id: 'colors-gradients', label: 'Gradients', path: '/colors/gradients' },
          { id: 'colors-accessibility', label: 'Accessibility', path: '/colors/accessibility' },
          { id: 'colors-incorrect', label: 'Incorrect', path: '/colors/incorrect' },
        ],
      },
      {
        id: 'spacing',
        label: 'Spacing',
        path: '/spacing',
      },
      {
        id: 'radius',
        label: 'Radius',
        path: '/radius',
      },
      {
        id: 'typography',
        label: 'Typography',
        path: '/typography',
        children: [
          { id: 'typography-families', label: 'Families', path: '/typography/families' },
          { id: 'typography-text-styles', label: 'Text Styles', path: '/typography/text-styles' },
        ],
      },
      { id: 'glass', label: 'Glass', path: '/glass' },
    ],
  },
  {
    id: 'motion',
    label: 'Motion',
    path: '/motion',
    children: [
      { id: 'motion-principles', label: 'Principles', path: '/motion/principles' },
      { id: 'motion-incorrect', label: 'Incorrect', path: '/motion/incorrect' },
      { id: 'motion-spec', label: 'Specs', path: '/motion/spec' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    path: '/components',
    children: [
      // Same order as ComponentsPage content: Rules, Forms, Buttons, Overlays, Display, Feedback.
      // Rule children follow the Rules list on the page (lockedSystem.locks order).
      {
        id: 'components-rules',
        label: 'Rules',
        path: '/components/rules',
        children: lockedSystem.locks.map((lock) => ({
          id: `components-rules/${lock.id}`,
          label: lock.title.en || lock.id,
          path: `/components/rules/${lock.id}`,
        })),
      },
      { id: 'components-controls', label: 'Forms', path: '/components/controls' },
      { id: 'components-button', label: 'Buttons', path: '/components/button' },
      { id: 'components-overlays', label: 'Overlays', path: '/components/overlays' },
      { id: 'components-display', label: 'Display', path: '/components/display' },
      { id: 'components-feedback', label: 'Feedback', path: '/components/feedback' },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = withoutHidden(ALL_NAV_ITEMS);

export const JUHUO_NAV_ITEMS: NavItem[] = [
  {
    id: 'juhuo-colors',
    label: 'Color',
    path: '/juhuo/colors',
    children: [
      { id: 'juhuo-colors-primary', label: 'Primary', path: '/juhuo/colors/primary' },
      { id: 'juhuo-colors-supporting', label: 'Supporting', path: '/juhuo/colors/supporting' },
      { id: 'juhuo-colors-explorations', label: 'Explorations', path: '/juhuo/colors/explorations' },
      { id: 'juhuo-colors-accessibility', label: 'Accessibility', path: '/juhuo/colors/accessibility' },
    ],
  },
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
