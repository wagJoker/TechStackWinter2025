import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import type { Request, Response } from 'express';

const router = Router();
const prisma = new PrismaClient();

interface ArtworkRequest {
  title: string;
  artist: string;
  type: 'painting' | 'sculpture' | 'photography' | 'digital' | 'mixed_media';
  price: number;
}

router.post('/artworks', async (req: Request<{}, {}, ArtworkRequest>, res: Response) => {
  try {
    const { title, artist, type, price } = req.body;
    const uniqueId = uuidv4();
    const searchTermMap = {
      painting: 'painting,art',
      sculpture: 'sculpture,art',
      photography: 'photography,art',
      digital: 'digital-art',
      mixed_media: 'mixed-media,art'
    } as const;
    
    const searchTerm = searchTermMap[type] || 'artwork';
    
    const artwork = await prisma.artwork.create({
      data: {
        title,
        artist,
        type,
        price: parseFloat(price.toString()),
        imageUrl: `https://source.unsplash.com/random/800x600?${searchTerm}&${uniqueId}`,
        availability: true
      }
    });

    res.json(artwork);
  } catch (error) {
    console.error('Error creating artwork:', error);
    res.status(500).json({ error: 'Failed to create artwork' });
  }
});

export default router;