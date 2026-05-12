import { getAllContent } from '@/services/contentService';
import { ContentHubClient } from './ContentHubClient';

export default async function ContentHubPage() {
  const contentData = await getAllContent();

  return <ContentHubClient contentData={contentData} />;
}
