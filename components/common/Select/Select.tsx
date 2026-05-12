import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
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
          <select
            ref={ref}
            id={id}
            className={cn(
              "flex h-10 w-full appearance-none rounded-[var(--radius-md)] border border-[var(--color-neutral-300)] bg-[var(--surface-primary)] px-[var(--space-3)] pr-[var(--space-8)] py-[var(--space-2)] text-[var(--text-sm)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:border-[var(--color-primary-500)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-[var(--color-error)] focus-visible:ring-[var(--color-error)]"
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-[var(--space-3)] text-[var(--text-muted)] pointer-events-none">
            <ChevronDown className="h-4 w-4" />
          </div>
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

Select.displayName = 'Select';
