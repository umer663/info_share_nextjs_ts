import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = 'md',
      elevation = 'sm',
      interactive = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const paddings = {
      none: '',
      sm: 'p-[var(--space-4)]',
      md: 'p-[var(--space-6)]',
      lg: 'p-[var(--space-8)]',
    };

    const elevations = {
      none: '',
      sm: 'shadow-[var(--shadow-sm)]',
      md: 'shadow-[var(--shadow-md)]',
      lg: 'shadow-[var(--shadow-lg)]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--surface-primary)] rounded-[var(--radius-xl)] border border-[var(--color-neutral-200)]",
          paddings[padding],
          elevations[elevation],
          interactive && "transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-md)] cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
