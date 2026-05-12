"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { cn } from '@/utils/cn';
import { dashboardNavItems } from '@/config/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  // In a real app, you would check user roles from your auth store
  // For this UI implementation, we'll assume the user has access to all links
  const allowedNavItems = dashboardNavItems;

  return (
    <aside className="hidden md:flex w-[var(--sidebar-width)] flex-col border-r border-[var(--color-neutral-200)] bg-[var(--surface-primary)] h-full overflow-y-auto">
      {/* Branding */}
      <div className="flex h-[var(--header-height)] items-center px-[var(--space-6)] border-b border-[var(--color-neutral-200)]">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-primary-600)] text-white font-bold text-xl">
            I
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            Dashboard
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-[var(--space-6)] px-[var(--space-4)] space-y-[var(--space-1)]">
        {allowedNavItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center space-x-3 px-[var(--space-3)] py-[var(--space-3)] rounded-[var(--radius-md)] transition-colors text-sm font-medium",
              pathname === item.path
                ? "bg-[var(--color-primary-50)] text-[var(--color-primary-700)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--text-primary)]"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Action */}
      <div className="p-[var(--space-4)] border-t border-[var(--color-neutral-200)]">
        <button className="flex w-full items-center space-x-3 px-[var(--space-3)] py-[var(--space-3)] rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-light)] transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};
