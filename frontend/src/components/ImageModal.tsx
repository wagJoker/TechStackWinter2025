import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
    imageUrl: string;
    alt: string;
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, alt, onClose }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative bg-white p-2 rounded-lg max-w-4xl max-h-[90vh]">
                <button
                    className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>
                <img
                    src={imageUrl}
                    alt={alt}
                    className="max-h-[85vh] object-contain rounded"
                />
            </div>
        </div>
    );
};