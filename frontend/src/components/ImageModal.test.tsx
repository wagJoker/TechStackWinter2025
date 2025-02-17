import { render, fireEvent, screen } from '@testing-library/react';
import { ImageModal } from './ImageModal';

describe('ImageModal', () => {
    it('renders correctly and handles close events', () => {
        const onClose = jest.fn();
        render(
            <ImageModal
                imageUrl="test.jpg"
                alt="Test image"
                onClose={onClose}
            />
        );

        expect(screen.getByRole('img')).toBeInTheDocument();
        
        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalled();
    });

    it('closes on backdrop click', () => {
        const onClose = jest.fn();
        render(
            <ImageModal
                imageUrl="test.jpg"
                alt="Test image"
                onClose={onClose}
            />
        );

        const backdrop = screen.getByRole('dialog');
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalled();
    });
});