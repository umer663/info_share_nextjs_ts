import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      description,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <label 
        htmlFor={id} 
        className={cn(
          "relative inline-flex items-center cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          type="checkbox"
          id={id}
          ref={ref}
          className="sr-only peer"
          disabled={disabled}
          {...props}
        />
        <div className="w-11 h-6 bg-[var(--color-neutral-200)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary-300)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary-600)]"></div>
        {(label || description) && (
          <div className="ml-3 flex flex-col">
            {label && <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>}
            {description && <span className="text-xs text-[var(--text-muted)]">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
