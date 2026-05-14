"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useAuth } from "@/components/providers/AuthProvider";

function isRouteAllowed(allowedRoutes: string[], currentPath: string): boolean {
  return allowedRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(route + "/")
  );
}

export const DashboardLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const allowedRoutes = (user as Record<string, unknown>).allowedRoutes as string[] | undefined;
    if (allowedRoutes && !isRouteAllowed(allowedRoutes, pathname)) {
      router.push(user.role === "CUSTOMER" ? "/account" : "/dashboard");
    }
  }, [loading, user, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--surface-secondary)]">
        <div className="animate-spin h-8 w-8 border-4 border-[var(--color-primary-600)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

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
