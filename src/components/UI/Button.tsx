import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex justify-center items-center py-3 px-6 rounded-lg font-semibold text-base transition-all w-full shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-light hover:-translate-y-px hover:shadow-md',
    secondary:
      'bg-secondary text-primary hover:bg-blue-200 hover:-translate-y-px hover:shadow-md',
    accent:
      'bg-accent text-white hover:bg-accent-dark hover:-translate-y-px hover:shadow-md',
    outline:
      'bg-transparent border border-slate-300 text-text hover:bg-slate-50',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
