export interface Artwork {
  id: string;  // Changed from number to string
  title: string;
  artist: string;
  type: "painting" | "sculpture" | "photography" | "digital" | "mixed_media";
  price: number;
  availability: boolean;
  created_at: string;
  updated_at: string;
  imageUrl: string;
}