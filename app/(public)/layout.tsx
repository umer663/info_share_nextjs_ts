import { ReactNode } from 'react';
import { PublicHeader } from '@/components/layout/PublicLayout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicLayout/PublicFooter';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-secondary)] text-[var(--text-primary)]">
      <PublicHeader />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
