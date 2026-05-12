import { cn } from '@/utils/cn';
import { FileQuestion } from 'lucide-react';
import { ReactNode } from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center rounded-[var(--radius-xl)] border border-dashed border-[var(--color-neutral-300)] bg-[var(--color-neutral-50)]",
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)] mb-4">
        {icon || <FileQuestion className="h-8 w-8" />}
      </div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
