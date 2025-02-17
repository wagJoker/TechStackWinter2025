import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useArtworkStore } from '../store/artworkStore'
import { useValidation } from '../hooks/useValidation'
import Upload from './Upload'
import type { Database } from '../types/database.types'

type ArtworkType = Database['public']['Tables']['artworks']['Row']['type']

const artworkTypes: ArtworkType[] = [
  'painting',
  'sculpture',
  'photography',
  'digital',
  'mixed_media',
]

const defaultArtwork = {
  title: '',
  artist: '',
  type: 'painting' as ArtworkType,
  price: 0,
  availability: true,
  imageUrl: '',
}

export default function ArtworkForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { validate, errors } = useValidation()
  const { artworks, addArtwork, updateArtwork } = useArtworkStore()
  const [formData, setFormData] = useState(defaultArtwork)

  useEffect(() => {
    if (id) {
      const artwork = artworks.find(a => a.id === id)
      if (artwork) {
        setFormData({
          title: artwork.title,
          artist: artwork.artist,
          type: artwork.type,
          price: artwork.price,
          availability: artwork.availability,
          imageUrl: artwork.imageUrl,
        })
      }
    }
  }, [id, artworks])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validate(formData)
    if (!validation.isValid || !validation.data) return

    try {
      if (id) {
        await updateArtwork(id, validation.data)
      } else {
        await addArtwork(validation.data)
      }
      navigate('/')
    } catch (error) {
      console.error('Error saving artwork:', error)
    }
  }

  const handleImageUpload = (imageData: string) => {
    setFormData(prev => ({ ...prev, imageUrl: imageData }))
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">
          {id ? 'Edit Artwork' : 'Add New Artwork'}
        </h2>

        <div className="space-y-6">
          <Upload onUpload={handleImageUpload} currentImage={formData.imageUrl} />

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Artist</label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.artist && (
              <p className="mt-1 text-sm text-red-600">{errors.artist}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ArtworkType })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {artworkTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Available</span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {id ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}