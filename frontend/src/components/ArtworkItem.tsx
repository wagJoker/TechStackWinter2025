import React from 'react';
import { Artwork } from '../types';

interface ArtworkItemProps {
  artwork: Artwork;
  onDelete: (id: string) => void;
}

const ArtworkItem: React.FC<ArtworkItemProps> = ({ artwork, onDelete }) => {
  const handleDelete = () => {
    onDelete(artwork.id);
  };

  return (
    <div className="artwork-item">
      <h3>{artwork.title}</h3>
      <p>Artist: {artwork.artist}</p>
      <p>Type: {artwork.type}</p>
      <p>Price: ${artwork.price}</p>
      <p>Availability: {artwork.availability ? 'For Sale' : 'Exhibition Only'}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ArtworkItem;