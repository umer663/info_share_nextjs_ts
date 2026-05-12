import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Simple range generation
  const getPageNumbers = () => {
    const range = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }
    return range;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav className={cn("flex items-center justify-center space-x-2", className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-neutral-200)] bg-[var(--surface-primary)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--color-neutral-50)] disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((page, idx) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${idx}`} className="flex h-9 w-9 items-center justify-center text-[var(--text-muted)]">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm transition-colors",
              isActive
                ? "bg-[var(--color-primary-600)] text-[var(--text-inverse)] font-medium"
                : "border border-[var(--color-neutral-200)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--color-neutral-50)]"
            )}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-neutral-200)] bg-[var(--surface-primary)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--color-neutral-50)] disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};
