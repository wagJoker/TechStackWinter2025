import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArtworkStore } from '../store/artworkStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddArtworkPageProps {
  onClose?: () => void;
}

const AddArtworkPage: React.FC<AddArtworkPageProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { addArtwork } = useArtworkStore();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    type: 'painting',
    price: '',
    imageUrl: '',
    availability: true  // Новое поле, по умолчанию true (на продажу)
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const artwork = {
        ...formData,
        price: parseFloat(formData.price) || 0
      };

      await addArtwork(artwork);
      toast.success(`Artwork "${formData.title}" has been created successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Close modal or navigate as needed...
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ToastContainer />
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                navigate('/');
              }
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Add New Artwork</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Artist</label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="painting">Painting</option>
                <option value="sculpture">Sculpture</option>
                <option value="photography">Photography</option>
                <option value="digital">Digital</option>
                <option value="mixed_media">Mixed Media</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                id="availability"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="availability" className="ml-2 block text-sm text-gray-700">
                Available for sale
              </label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Artwork
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArtworkPage;