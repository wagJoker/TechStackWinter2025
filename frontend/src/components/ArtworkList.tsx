import React, { useEffect, useState } from 'react';
import { Artwork } from '../types';
import { fetchArtworks } from '../services/api';
import ArtworkItem from './ArtworkItem';

const ArtworkList: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getArtworks = async () => {
            try {
                const data = await fetchArtworks();
                setArtworks(data);
            } catch (err) {
                setError('Failed to fetch artworks');
            } finally {
                setLoading(false);
            }
        };

        getArtworks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Artwork List</h2>
            <ul>
                {artworks.map((artwork) => (
                    <ArtworkItem key={artwork.id} artwork={artwork} />
                ))}
            </ul>
        </div>
    );
};

export default ArtworkList;