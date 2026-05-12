import { ReactNode } from 'react';
import { DashboardLayoutWrapper } from '@/components/layout/DashboardLayout/DashboardLayoutWrapper';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
