"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { dashboardNavItems } from '@/config/navigation';

export const Sidebar = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [pathname]);

  // In a real app, you would check user roles from your auth store
  // For this UI implementation, we'll assume the user has access to all links
  const allowedNavItems = dashboardNavItems;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--surface-overlay)] md:hidden backdrop-blur-sm" 
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed inset-y-0 left-0 z-[var(--z-modal)] flex w-[var(--sidebar-width)] flex-col border-r border-[var(--color-neutral-200)] bg-[var(--surface-primary)] h-full overflow-y-auto transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Branding */}
        <div className="flex h-[var(--header-height)] items-center justify-between px-[var(--space-6)] border-b border-[var(--color-neutral-200)]">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-primary-600)] text-white font-bold text-xl">
              I
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Dashboard
            </span>
          </Link>
          {onClose && (
            <button onClick={onClose} className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <X className="h-5 w-5" />
            </button>
          )}
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
          <button 
            onClick={() => router.push('/login')}
            className="flex w-full items-center space-x-3 px-[var(--space-3)] py-[var(--space-3)] rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-light)] transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
