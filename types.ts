
export interface ColorSwatch {
  name: string;
  hex: string;
  description: string;
  textColor?: string;
}

export interface TypographyStyle {
  label: string;
  size: string;
  weight: string;
  leading: string;
  tracking: string;
  usage: string;
}

export interface LandingModule {
  id: string;
  title: string;
  category: 'how-to' | 'why-use' | 'features';
  thumbnail: string;
  figmaNodeId?: string;
  figmaUrl?: string;
  componentName?: string; // To dynamically load the component
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  children?: NavItem[];
}
