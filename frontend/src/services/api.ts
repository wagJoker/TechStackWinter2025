import axios from 'axios';

const API_URL = 'http://localhost:3000/artworks';

export const fetchArtworks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchArtworkById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addArtwork = async (artwork: { title: string; artist: string; type: string; price: number; availability: boolean; }) => {
    const response = await axios.post(API_URL, artwork);
    return response.data;
};

export const deleteArtwork = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateArtwork = async (id: string, artwork: { title: string; artist: string; type: string; price: number; availability: boolean; }) => {
    const response = await axios.put(`${API_URL}/${id}`, artwork);
    return response.data;
};