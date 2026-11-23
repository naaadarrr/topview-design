import './button.css';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'white' | 'neutral' | 'outline' | 'ghost' | 'danger' | 'link';
type Size = 'sm' | 'md' | 'lg' | 'xl';

const variantClass: Record<Variant, string> = {
  primary: 'product-cta cta-primary',
  white: 'product-cta cta-white',
  neutral: 'product-button board-type neutral-board',
  outline: 'cancel-board',
  ghost: 'product-button board-type ghost-board',
  danger: 'product-button board-type danger-board',
  link: 'product-button auth-link',
};

const sizeClass: Record<Size, string> = {
  sm: 'size-h32',
  md: 'size-h36',
  lg: 'size-h40',
  xl: 'size-h48',
};

export function Button({
  variant = 'primary',
  size,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  const classes = [variantClass[variant], size ? sizeClass[size] : '', className]
    .filter(Boolean)
    .join(' ');
  return <button type={type} className={classes} {...props} />;
}
