// filepath: /frontend/frontend/src/types/index.ts
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  type: string; // e.g., painting, sculpture
  price: number;
  availability: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type ArtworkListResponse = ApiResponse<Artwork[]>;

export type ArtworkDetailResponse = ApiResponse<Artwork>;