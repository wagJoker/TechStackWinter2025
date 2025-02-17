"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImageUrl = void 0;
const searchTerms = {
    'painting': 'painting,art',
    'sculpture': 'sculpture,art',
    'photography': 'photography,art',
    'digital': 'digital-art',
    'mixed_media': 'mixed-media,art'
};
const generateImageUrl = (type) => {
    const searchTerm = searchTerms[type] || 'artwork';
    const uniqueId = Math.random().toString(36).substring(7);
    return `https://source.unsplash.com/random/800x600?${searchTerm}&${uniqueId}`;
};
exports.generateImageUrl = generateImageUrl;
