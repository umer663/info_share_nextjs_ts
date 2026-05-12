import { cn } from '@/utils/cn';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'white' | 'neutral';
}

export const Spinner = ({ size = 'md', variant = 'primary', className, ...props }: SpinnerProps) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  const variants = {
    primary: 'border-[var(--color-primary-200)] border-t-[var(--color-primary-600)]',
    white: 'border-white/30 border-t-white',
    neutral: 'border-[var(--color-neutral-200)] border-t-[var(--color-neutral-600)]',
  };

  return (
    <div
      role="status"
      className={cn(
        'animate-spin rounded-full',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
