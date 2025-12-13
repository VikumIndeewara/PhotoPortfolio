import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// --- ARRAY OF SLIDER IMAGES (Same as before) ---
const sliderImages: string[] = [
    "https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=1920",
];

const HeroSlider: React.FC = () => {
    // --- States & Refs ---
    const [scrollY, setScrollY] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);
    const [timerId, setTimerId] = useState<number | null>(null);

    // --- CONSTANTS ---
    const parallaxOffset = scrollY * 0.25;
    const AUTO_SLIDE_DURATION = 7000;
    const REVEAL_RADIUS = 1000;

    // --- SLIDER & AUTOPLAY LOGIC (Unchanged) ---
    const resetAutoSlideTimer = () => {
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        const newTimerId = window.setTimeout(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % sliderImages.length);
        }, AUTO_SLIDE_DURATION);
        setTimerId(newTimerId);
    };

    const goToNext = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % sliderImages.length);
        resetAutoSlideTimer();
    };

    const goToPrev = () => {
        setCurrentImageIndex(prevIndex => 
            (prevIndex - 1 + sliderImages.length) % sliderImages.length
        );
        resetAutoSlideTimer();
    };

    // --- useEffect Hooks (Unchanged) ---
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        resetAutoSlideTimer();
        return () => {
            if (timerId !== null) {
                clearTimeout(timerId);
            }
        };
    }, [sliderImages.length]);

    // --- CURSOR EFFECT LOGIC (Unchanged) ---
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setCursorPos({ x, y });
        }
    };

    const scrollToAbout = () => {
        const element = document.getElementById('about');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- NEW: CSS Gradient Mask Logic ---
    const isMouseActive = cursorPos.x !== 0 || cursorPos.y !== 0;

    // Use a radial gradient for the clip-path style to create the soft edge.
    // The gradient goes from 100% opacity (center, fully revealed) to 0% opacity (edge, fully grayscale).
    const radialGradientStyle = isMouseActive
        ? {
            // This mask-image is applied to the FULL-COLOR layer (Layer B)
            maskImage: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, 
                black ${REVEAL_RADIUS * 0.5}px, // Solid black center (full color)
                transparent ${REVEAL_RADIUS}px)`, // Fade out to transparent (grayscale)
            WebkitMaskImage: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, 
                black ${REVEAL_RADIUS * 0.5}px, 
                transparent ${REVEAL_RADIUS}px)`,
            // The clip-path is now unnecessary if mask-image is used correctly, but we keep it simple for cross-browser
            // clipPath: `circle(${REVEAL_RADIUS}px at ${cursorPos.x}px ${cursorPos.y}px)`,
        }
        : {
            maskImage: `radial-gradient(circle at 50% 50%, black 0px, transparent 0px)`,
            WebkitMaskImage: `radial-gradient(circle at 50% 50%, black 0px, transparent 0px)`,
            // clipPath: `circle(0% at 50% 50%)`,
        };


    return (
        <section 
            id="hero" 
            className="relative h-screen w-full overflow-hidden" 
            ref={heroRef} 
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setCursorPos({ x: 0, y: 0 })}
        >
            {/* 1. SLIDER CONTAINER (Background Layer) */}
            <div
                className="absolute inset-0 transition-transform duration-500 ease-out"
                style={{
                    transform: `translateY(${parallaxOffset}px)`,
                }}
            >
                {/* Layer A (BOTTOM): Grayscale Base Layer (Default view) */}
                <div className="absolute inset-0 z-0">
                    {sliderImages.map((link, index) => (
                        <div
                            key={'gray-' + link}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
                            style={{
                                backgroundImage: `url(${link})`,
                                filter: 'grayscale(100%)', // Base grayscale look
                                opacity: index === currentImageIndex ? 1 : 0,
                                zIndex: index === currentImageIndex ? 1 : 0, 
                            }}
                            aria-hidden={index !== currentImageIndex}
                        />
                    ))}
                </div>

                {/* Layer B (TOP): Full-Color Reveal Layer (Masked with Gradient) */}
                <div 
                    className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out pointer-events-none"
                    style={{
                        ...radialGradientStyle, // Apply the gradient mask styles
                        transform: `translateY(${parallaxOffset}px)`, // Parallax alignment
                        
                        // Ensure the image underneath is full color
                        backgroundColor: 'transparent',
                    }}
                >
                    {sliderImages.map((link, index) => (
                        <div
                            key={'color-' + link}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
                            style={{
                                backgroundImage: `url(${link})`,
                                // NO filter: This is the full-color layer revealed by the mask
                                opacity: index === currentImageIndex ? 1 : 0,
                                zIndex: index === currentImageIndex ? 1 : 0,
                            }}
                            aria-hidden={index !== currentImageIndex}
                        />
                    ))}
                </div>
                
                {/* Gradient Overlay (Sits on top of image layers) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-20"></div>
            </div>

            {/* 2. FOREGROUND CONTENT & CONTROLS (Z-30 and Z-40 ensure they are on top) */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-30">
                
                {/* LEFT ARROW */}
                <button
                    onClick={goToPrev} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/30 rounded-full hover:bg-black/60 transition-colors z-40"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* RIGHT ARROW */}
                <button
                    onClick={goToNext} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/30 rounded-full hover:bg-black/60 transition-colors z-40"
                    aria-label="Next image"
                >
                    <ChevronRight size={24} />
                </button>

                {/* HERO TEXT BLOCK */}
                <div className="max-w-4xl animate-fade-in">
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
                        CAPTURE THE
                        <br />
                        <span className="italic font-light">Extraordinary</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 tracking-wide font-light">
                        Cinematic Photography & Videography
                    </p>
                    <button
                        onClick={scrollToAbout}
                        className="px-10 py-4 bg-white text-black font-medium tracking-wider hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                    >
                        EXPLORE WORK
                    </button>
                </div>

                {/* SCROLL DOWN ARROW */}
                <button
                    onClick={scrollToAbout}
                    className="absolute bottom-12 animate-bounce text-white opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Scroll down to About section"
                >
                    <ChevronDown size={32} />
                </button>
            </div>
        </section>
    );
};

export default HeroSlider;