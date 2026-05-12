import { getPlatformStats, getRecentActivity, getTopViewedContent } from '@/services/statsService';
import { DashboardPageClient } from './DashboardPageClient';

export default async function DashboardPage() {
  const stats = await getPlatformStats();
  const recentActivity = await getRecentActivity();
  const topViewedContent = await getTopViewedContent();

  return (
    <DashboardPageClient 
      stats={stats} 
      recentActivity={recentActivity} 
      topViewedContent={topViewedContent} 
    />
  );
}
