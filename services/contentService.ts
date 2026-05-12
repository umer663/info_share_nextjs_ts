import { contentData } from '@/data/mock';

// Simulate network delay for realistic async behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllContent() {
  await delay(50);
  return contentData;
}

export async function getFeaturedContent(limit = 3) {
  await delay(50);
  // Just grabbing the first few items as featured for now
  return contentData.slice(0, limit);
}
