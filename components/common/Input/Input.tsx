import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col space-y-[var(--space-1)]", fullWidth && "w-full", className)}>
        {label && (
          <label htmlFor={id} className="text-[var(--text-sm)] font-medium text-[var(--text-primary)]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-[var(--space-3)] text-[var(--text-muted)] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              "flex h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-neutral-300)] bg-[var(--surface-primary)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-sm)] transition-colors",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-[var(--text-muted)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:border-[var(--color-primary-500)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-[var(--color-error)] focus-visible:ring-[var(--color-error)]",
              leftIcon && "pl-[calc(var(--space-3)*2+1rem)]",
              rightIcon && "pr-[calc(var(--space-3)*2+1rem)]"
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-[var(--space-3)] text-[var(--text-muted)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-[var(--text-xs)] text-[var(--color-error)] mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
