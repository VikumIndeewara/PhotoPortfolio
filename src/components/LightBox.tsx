import React, { useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
    images: { url: string; title: string }[];
    selectedIndex: number | null;
    onClose: () => void;
    onNavigate: (direction: 'prev' | 'next') => void;
}

const Lightbox: React.FC<LightboxProps> = ({
    images,
    selectedIndex,
    onClose,
    onNavigate,
}) => {

    const isOpen = selectedIndex !== null;
    const currentImage = isOpen ? images[selectedIndex] : null;

    // --- Keyboard Navigation ---
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!isOpen) return;

            if (event.key === 'Escape') onClose();
            if (event.key === 'ArrowRight') onNavigate('next');
            if (event.key === 'ArrowLeft') onNavigate('prev');
        },
        [isOpen, onClose, onNavigate]
    );

    // --- Effects ---
    useEffect(() => {
        if (!isOpen) return;

        document.addEventListener('keydown', handleKeyDown);

        const html = document.documentElement;
        html.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            html.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    // --- Render ---
    if (!isOpen || !currentImage) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={onClose}
        >
            <div className="relative w-full h-full flex items-center justify-center p-4">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-400 p-2 z-50"
                    aria-label="Close Lightbox"
                >
                    <X size={32} />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-3 hover:bg-black/60 z-50"
                >
                    <ChevronLeft size={28} />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-3 hover:bg-black/60 z-50"
                >
                    <ChevronRight size={28} />
                </button>

                <div
                    className="max-w-7xl max-h-[85vh] w-full h-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={currentImage.url}
                        alt={currentImage.title}
                        className="object-contain w-full h-full"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 text-center">
                        <h3 className="text-xl font-light text-white">
                            {currentImage.title}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lightbox;
