import React, { useState } from 'react';
import { Artwork } from '../types';
import { addArtwork } from '../services/api';

const ArtworkForm: React.FC<{ onArtworkAdded: (artwork: Artwork) => void }> = ({ onArtworkAdded }) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [availability, setAvailability] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title || !artist || !type || price <= 0) {
            setError('Please fill in all fields correctly.');
            return;
        }

        const newArtwork = { title, artist, type, price: Number(price), availability };

        try {
            const addedArtwork = await addArtwork(newArtwork);
            onArtworkAdded(addedArtwork);
            resetForm();
        } catch (err) {
            setError('Failed to add artwork. Please try again.');
        }
    };

    const resetForm = () => {
        setTitle('');
        setArtist('');
        setType('');
        setPrice('');
        setAvailability(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Artwork</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={99} required />
            </div>
            <div>
                <label>Artist:</label>
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
            </div>
            <div>
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="">Select type</option>
                    <option value="painting">Painting</option>
                    <option value="sculpture">Sculpture</option>
                    {/* Add more types as needed */}
                </select>
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" required />
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
                    Available for Sale
                </label>
            </div>
            <button type="submit">Add Artwork</button>
        </form>
    );
};

export default ArtworkForm;