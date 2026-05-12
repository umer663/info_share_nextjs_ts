import { getPlatformStats } from '@/services/statsService';
import { getFeaturedContent } from '@/services/contentService';
import { HomePageClient } from './HomePageClient';

export default async function HomePage() {
  const stats = await getPlatformStats();
  const featuredContent = await getFeaturedContent(3);

  return <HomePageClient stats={stats} featuredContent={featuredContent} />;
}
