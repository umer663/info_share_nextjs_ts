import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
}

export interface TableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading,
  className,
  ...props
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-neutral-200)] bg-[var(--surface-primary)] shadow-[var(--shadow-sm)]">
      <table className={cn("w-full text-left text-sm", className)} {...props}>
        <thead className="border-b border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] text-[var(--text-secondary)]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 font-medium tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-neutral-200)] bg-[var(--surface-primary)]">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-[var(--text-muted)]">
                Loading data...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-[var(--text-muted)]">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick && onRowClick(item)}
                className={cn(
                  "transition-colors hover:bg-[var(--color-neutral-50)]",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className="whitespace-nowrap px-6 py-4 text-[var(--text-primary)]">
                    {col.render ? col.render(item) : String((item as any)[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
