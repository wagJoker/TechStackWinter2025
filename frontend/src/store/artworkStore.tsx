import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultArtworks } from '../data/defaultArtworks';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  type: string;
  price: number;
  availability: boolean;
  imageUrl: string;
}

interface ArtworkState {
  artworks: Artwork[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string | null;
    sortBy: string | null;
    type: string | null;
  };
  addArtwork: (artwork: Artwork) => Promise<void>;
  fetchArtworks: () => Promise<void>;
  setFilters: (filters: Partial<{ search: string | null; sortBy: string | null; type: string | null; }>) => void;
}

export const useArtworkStore = create<ArtworkState>()(
  persist(
    (set, get) => ({
      artworks: defaultArtworks, // Initialize with default artworks
      loading: false,
      error: null,
      filters: {
        search: null,
        sortBy: null,
        type: null
      },

      addArtwork: async (artwork: Artwork) => {
        try {
          const response = await fetch('http://localhost:3000/artworks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(artwork),
          });
          if (!response.ok) throw new Error('Failed to add artwork');
          const newArtwork = await response.json();
          set((state) => ({
            artworks: [...state.artworks, newArtwork]
          }));
        } catch (error) {
          console.error('Error adding artwork:', error);
          throw error;
        }
      },

      fetchArtworks: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('http://localhost:3000/artworks');
          if (!response.ok) throw new Error('Failed to fetch artworks');
          const data = await response.json();
          set({ artworks: data });
        } catch (error) {
          set({ error: 'Failed to fetch artworks' });
          console.error('Error fetching artworks:', error);
        } finally {
          set({ loading: false });
        }
      },

      setFilters: (newFilters) => 
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        })),
    }),
    {
      name: 'artwork-storage',
    }
  )
);