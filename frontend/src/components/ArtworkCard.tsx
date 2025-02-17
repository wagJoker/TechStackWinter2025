import React, { useState } from 'react';
import { Artwork } from '../types/artwork';
import { ImageModal } from './ImageModal';

interface ArtworkCardProps {
    artwork: Artwork;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
    const [showModal, setShowModal] = useState(false);
    const imageUrl = artwork.imageUrl ? `http://localhost:3000${artwork.imageUrl}` : 'https://via.placeholder.com/150';

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
                <div 
                    className="cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    <img
                        src={imageUrl}
                        alt={artwork.title}
                        className="w-full h-48 object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{artwork.title}</h3>
                    <p className="text-sm text-gray-600">By: {artwork.artist}</p>
                    <p className="text-lg font-bold mt-2">${artwork.price.toFixed(2)}</p>
                </div>
            </div>

            {showModal && (
                <ImageModal
                    imageUrl={artwork.imageUrl}
                    alt={artwork.title}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};