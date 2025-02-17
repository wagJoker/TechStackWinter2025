export type ArtworkType = 'painting' | 'sculpture' | 'photography' | 'digital' | 'mixed_media';

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  type: ArtworkType;
  price: number;
  availability: boolean;
  imageUrl: string;
  created_at: Date;
  updated_at: Date;
}

export interface ArtworkCreateInput {
  title: string;
  artist: string;
  type: ArtworkType;
  price: number;
}