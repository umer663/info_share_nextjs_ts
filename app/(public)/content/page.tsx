import { getAllContent } from '@/services/contentService';
import { ContentPageClient } from './ContentPageClient';

export default async function ContentPage() {
  const contentData = await getAllContent();

  return <ContentPageClient contentData={contentData} />;
}
