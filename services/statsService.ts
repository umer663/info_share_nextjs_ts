import { dashboardStats, recentActivity, topViewedContent } from '@/data/mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getPlatformStats() {
  await delay(50);
  return dashboardStats;
}

export async function getRecentActivity() {
  await delay(50);
  return recentActivity;
}

export async function getTopViewedContent() {
  await delay(50);
  return topViewedContent;
}
