"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export const DashboardLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--surface-secondary)] text-[var(--text-primary)]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-[var(--space-4)] md:p-[var(--space-8)]">
          <div className="mx-auto max-w-[var(--max-content-width)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
