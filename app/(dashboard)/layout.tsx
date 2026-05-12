import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/DashboardLayout/Sidebar';
import { TopBar } from '@/components/layout/DashboardLayout/TopBar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--surface-secondary)] text-[var(--text-primary)]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-[var(--space-4)] md:p-[var(--space-8)]">
          <div className="mx-auto max-w-[var(--max-content-width)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
