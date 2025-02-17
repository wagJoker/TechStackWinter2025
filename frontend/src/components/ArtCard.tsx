import React, { useState } from 'react';

interface ArtCardProps {
  artwork: Artwork;
}

const ArtCard: React.FC<ArtCardProps> = ({ artwork }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    // Generate fallback image URL if the original fails
    artwork.imageUrl = `https://source.unsplash.com/random/800x600?artwork&${Date.now()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 
      hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 
      cursor-pointer">
      <img 
        src={artwork.imageUrl}
        alt={artwork.title}
        className="w-full h-48 object-cover"
        onError={handleImageError}
        key={imageError ? 'fallback' : 'original'}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{artwork.title}</h3>
        <p className="text-sm text-gray-600">By: {artwork.artist}</p>
        <p className="text-sm text-gray-500">{artwork.type}</p>
        <p className="text-lg font-bold mt-2">${artwork.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ArtCard;