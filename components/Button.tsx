import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'ghostMuted';
export type ButtonSize = 'mini' | 'small' | 'regular' | 'large';
export type ButtonShape = 'default' | 'rounded' | 'round';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'regular',
  shape = 'default',
  iconLeft,
  iconRight,
  iconOnly,
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#731DFB] text-white hover:bg-[#6819E3] active:bg-[#5114B1] focus:ring-[#731DFB]",
    secondary: "bg-white text-black hover:bg-neutral-100 active:bg-neutral-200 focus:ring-white",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 active:bg-white/10 focus:ring-white",
    ghost: "bg-transparent text-white hover:bg-white/5 active:bg-white/10 focus:ring-white",
    destructive: "bg-[#FF3B30] text-white hover:bg-[#E0352B] active:bg-[#C22E25] focus:ring-[#FF3B30]",
    ghostMuted: "bg-transparent text-neutral-500 hover:text-white hover:bg-white/5 active:bg-white/10 focus:ring-white",
  };

  const sizes = {
    mini: iconOnly ? "p-1" : "px-2 py-1 text-[11px]",
    small: iconOnly ? "p-1.5" : "px-3 py-1.5 text-[12px]",
    regular: iconOnly ? "p-2.5" : "px-4 py-2.5 text-[14px]",
    large: iconOnly ? "p-3.5" : "px-6 py-3.5 text-[16px]",
  };

  const shapes = {
    default: "rounded-[4px]",
    rounded: "rounded-[8px]",
    round: "rounded-full",
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];
  const currentShape = shapes[shape];

  return (
    <button
      className={`${baseStyles} ${currentVariant} ${currentSize} ${currentShape} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && iconLeft && <span className={`${iconOnly ? "" : "mr-2"}`}>{iconLeft}</span>}
      {iconOnly ? iconOnly : children}
      {!isLoading && iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button;
