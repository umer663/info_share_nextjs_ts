import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export const Badge = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    primary: "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
    secondary: "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]",
    success: "bg-[var(--color-success-light)] text-[var(--color-success-dark)]",
    warning: "bg-[var(--color-warning-light)] text-[var(--color-warning-dark)]",
    error: "bg-[var(--color-error-light)] text-[var(--color-error-dark)]",
    info: "bg-[var(--color-info-light)] text-[var(--color-info-dark)]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[0.65rem]",
    md: "px-2.5 py-0.5 text-xs",
  };

  return (
    <span
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};
