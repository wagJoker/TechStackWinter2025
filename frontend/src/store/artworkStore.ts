import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Artwork = {
  id: string;
  title: string;
  artist: string;
  type: "painting" | "sculpture" | "photography" | "digital" | "mixed_media";
  price: number;
  availability: boolean;
  created_at: string;
  updated_at: string;
  imageUrl: string;
};

export type NewArtworkInput = Omit<Artwork, 'id' | 'created_at' | 'updated_at'>;

interface ArtworkState {
  artworks: Artwork[];
  filters: {
    search: string | null;
    sortBy: string | null;
    type: string | null;
  };
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  getFilteredAndPaginatedArtworks: () => {
    artworks: Artwork[];
    totalPages: number;
  };
  setFilters: (filters: any) => void;
  clearStorage: () => void;
  addArtwork: (artwork: NewArtworkInput) => Promise<Artwork>;
}

const generateId = () => crypto.randomUUID();
const now = new Date().toISOString();

const defaultArtworks: Artwork[] = [
  // ... your existing default artworks ...
];

export const useArtworkStore = create<ArtworkState>()(
  persist(
    (set, get) => ({
      artworks: defaultArtworks,
      filters: {
        search: null,
        sortBy: null,
        type: null,
      },
      currentPage: 1,
      itemsPerPage: 9,

      setCurrentPage: (page: number) => {
        set({ currentPage: page });
      },

      getFilteredAndPaginatedArtworks: () => {
        const { artworks, filters, currentPage, itemsPerPage } = get();
        let filtered = [...artworks];

        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filtered = filtered.filter(
            (artwork) =>
              artwork.title.toLowerCase().includes(searchTerm) ||
              artwork.artist.toLowerCase().includes(searchTerm)
          );
        }

        if (filters.type) {
          filtered = filtered.filter(
            (artwork) => artwork.type === filters.type
          );
        }

        if (filters.sortBy) {
          filtered.sort((a, b) => {
            if (filters.sortBy === 'price-asc') return a.price - b.price;
            if (filters.sortBy === 'price-desc') return b.price - a.price;
            return 0;
          });
        }

        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const paginatedArtworks = filtered.slice(start, start + itemsPerPage);

        return {
          artworks: paginatedArtworks,
          totalPages,
        };
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          currentPage: 1,
        }));
      },

      clearStorage: () => {
        set({
          artworks: defaultArtworks,
          filters: { search: null, sortBy: null, type: null },
          currentPage: 1,
        });
      },

      addArtwork: async (artwork: NewArtworkInput): Promise<Artwork> => {
        // Create a new artwork object with generated fields
        const newArtwork: Artwork = {
          ...artwork,
          id: generateId(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        try {
          // Try to send to backend first
          const response = await fetch('http://localhost:5000/api/artworks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artwork),
          });

          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }

          const savedArtwork = await response.json();
          set({ artworks: [...get().artworks, savedArtwork] });
          return savedArtwork;

        } catch (error) {
          console.warn('Backend connection failed, saving locally:', error);
          
          // Fallback to local storage if backend is unavailable
          set({ artworks: [...get().artworks, newArtwork] });
          return newArtwork;
        }
      },
    }),
    {
      name: 'artwork-store',
    }
  )
);

