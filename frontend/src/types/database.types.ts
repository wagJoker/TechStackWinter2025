export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      artworks: {
        Row: {
          id: string
          title: string
          artist: string
          type: 'painting' | 'sculpture' | 'photography' | 'digital' | 'mixed_media'
          price: number
          availability: boolean
          created_at: string
          updated_at: string
          imageUrl: string
        }
        Insert: {
          id?: string
          title: string
          artist: string
          type: 'painting' | 'sculpture' | 'photography' | 'digital' | 'mixed_media'
          price: number
          availability?: boolean
          created_at?: string
          updated_at?: string
          imageUrl: string
        }
        Update: {
          id?: string
          title?: string
          artist?: string
          type?: 'painting' | 'sculpture' | 'photography' | 'digital' | 'mixed_media'
          price?: number
          availability?: boolean
          created_at?: string
          updated_at?: string
          imageUrl?: string
        }
      }
    }
  }
}