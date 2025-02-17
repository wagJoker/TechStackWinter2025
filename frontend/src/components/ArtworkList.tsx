import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useArtworkStore } from '../store/artworkStore';
import Footer from './Footer'; // Импортируем Footer
import Header from './Header';
import Pagination from './Pagination';
import { defaultArtworks } from '../data/defaultArtworks';
import TypeWriter from './TypeWriter';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl?: string;
  type?: string;
}

// Modify the ArtCard component to include delete button
const ArtCard: React.FC<{ artwork: Artwork }> = ({ artwork }) => (
  <div 
    className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 
    hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 
    cursor-pointer"
    onClick={() => console.log('Artwork clicked:', artwork.title)}
  >
    <img 
      src={artwork.imageUrl}
      alt={artwork.title} 
      className="w-full h-48 object-cover"
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.src = "https://via.placeholder.com/400x250";
        console.log(`Image failed to load for artwork: ${artwork.title}`);
      }}
    />
    <div className="p-4 transition-colors duration-300 hover:bg-gray-50">
      <h3 className="text-lg font-semibold">{artwork.title}</h3>
      <p className="text-sm text-gray-600">By: {artwork.artist}</p>
      <p className="text-sm text-gray-500">{artwork.type}</p>
      <p className="text-lg font-bold mt-2">${artwork.price.toLocaleString()}</p>
    </div>
  </div>
);

const UploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('File uploaded:', data.url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded-lg bg-white">
      <div className="flex items-center gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
        />
        <button
          onClick={uploadFile}
          disabled={!file || uploading}
          className={`px-4 py-2 rounded-lg ${
            !file || uploading
              ? 'bg-gray-300'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="max-w-xs rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default function ArtworkListPage() {
  const { 
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    getFilteredAndPaginatedArtworks,
    clearStorage
  } = useArtworkStore();

  const { artworks: paginatedArtworks, totalPages } = getFilteredAndPaginatedArtworks();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
        {/* TypeWriter Title */}
        <div className="text-left mb-12">
          <TypeWriter text="Explore Our Collection" />
        </div>

        {/* Search and Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => setFilters({ search: e.target.value || null })}
              className="p-2 border rounded-md"
              placeholder="Search artworks..."
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Sort by
            </label>
            <select
              value={filters.sortBy || ''}
              onChange={(e) => setFilters({ sortBy: e.target.value || null })}
              className="p-2 border rounded-md"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Filter by Type
            </label>
            <select
              value={filters.type || ''}
              onChange={(e) => setFilters({ type: e.target.value || null })}
              className="p-2 border rounded-md"
            >
              <option value="">All Types</option>
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="photography">Photography</option>
              <option value="digital">Digital</option>
              <option value="mixed_media">Mixed Media</option>
            </select>
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedArtworks.map((artwork) => (
            <ArtCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 mb-6 flex justify-start gap-4 px-4">
          <Link 
            to="/add-artwork"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Create New Artwork
          </Link>

          <button 
            onClick={() => console.log('Remove artwork clicked')}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Remove Artwork
          </button>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}