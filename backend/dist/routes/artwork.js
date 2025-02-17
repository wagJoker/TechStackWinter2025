"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/artworks', async (req, res) => {
    try {
        const { title, artist, type, price } = req.body;
        const uniqueId = (0, uuid_1.v4)();
        const searchTermMap = {
            painting: 'painting,art',
            sculpture: 'sculpture,art',
            photography: 'photography,art',
            digital: 'digital-art',
            mixed_media: 'mixed-media,art'
        };
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
    }
    catch (error) {
        console.error('Error creating artwork:', error);
        res.status(500).json({ error: 'Failed to create artwork' });
    }
});
exports.default = router;
