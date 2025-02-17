import { ArtworkType } from '../types/artwork';

const searchTerms: Record<ArtworkType, string> = {
  'painting': 'painting,art',
  'sculpture': 'sculpture,art',
  'photography': 'photography,art',
  'digital': 'digital-art',
  'mixed_media': 'mixed-media,art'
};

export const generateImageUrl = (type: ArtworkType): string => {
  const searchTerm = searchTerms[type] || 'artwork';
  const uniqueId = Math.random().toString(36).substring(7);
  return `https://source.unsplash.com/random/800x600?${searchTerm}&${uniqueId}`;
};