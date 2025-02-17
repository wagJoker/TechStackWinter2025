import React, { useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';

interface UploadProps {
  onUpload: (imageData: string) => void;
  currentImage?: string;
}

export default function Upload({ onUpload, currentImage }: UploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <label
              htmlFor="image-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg"
            >
              <div className="text-white text-center">
                <UploadIcon className="w-8 h-8 mx-auto mb-2" />
                <span>Change Image</span>
              </div>
            </label>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
          >
            <UploadIcon className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Click to upload image</span>
            <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
          </label>
        )}
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}