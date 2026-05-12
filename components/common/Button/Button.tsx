import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

// ─── Prop Interface ───────────────────────────────
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

// ─── Component ────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // We use regular class names mapping back to our theme CSS variables
    const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-[var(--color-primary-600)] text-[var(--text-inverse)] hover:bg-[var(--color-primary-700)] active:bg-[var(--color-primary-800)] focus:ring-[var(--color-primary-500)]",
      secondary: "bg-[var(--color-neutral-100)] text-[var(--text-primary)] hover:bg-[var(--color-neutral-200)] focus:ring-[var(--color-neutral-200)]",
      outline: "bg-transparent text-[var(--color-primary-600)] border border-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] focus:ring-[var(--color-primary-500)]",
      ghost: "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--color-neutral-100)] focus:ring-[var(--color-neutral-200)]",
      danger: "bg-[var(--color-error)] text-[var(--text-inverse)] hover:bg-[var(--color-error-dark)] focus:ring-[var(--color-error)]",
    };

    const sizes = {
      sm: "px-[var(--space-3)] py-[var(--space-1)] text-[var(--text-sm)] rounded-[var(--radius-md)]",
      md: "px-[var(--space-4)] py-[var(--space-2)] text-[var(--text-sm)] rounded-[var(--radius-md)]",
      lg: "px-[var(--space-6)] py-[var(--space-3)] text-[var(--text-base)] rounded-[var(--radius-lg)]",
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
