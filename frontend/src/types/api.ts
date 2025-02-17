export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export type ArtworksResponse = ApiResponse<Artwork[]>;