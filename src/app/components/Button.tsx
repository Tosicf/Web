import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200';

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-[var(--accent-hover)] shadow-sm hover:shadow-md',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-opacity-90 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
