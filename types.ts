
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

export interface NavItem {
  id: string;
  label: string;
  path: string;
}
