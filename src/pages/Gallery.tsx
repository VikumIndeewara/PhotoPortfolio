import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Play, ZoomIn, ArrowLeft } from 'lucide-react'; // Added ArrowLeft icon
import Lightbox from '../components/LightBox'; 

// --- CATEGORY SLUG HELPER FUNCTION ---
const createSlug = (categoryName: string): string => {
    return '/' + categoryName
        .toLowerCase()
        .replace(/ /g, '-');
};

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // --- PHOTO GALLERY DATA (omitted for brevity) ---
    const photoGallery = [
        // ... your photoGallery array ...
        { url: 'https://images.pexels.com/photos/1755685/pexels-photo-1755685.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Urban Landscapes', category: 'Editorial' },
        { url: 'https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Fashion Forward', category: 'Fashion' },
        { url: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Natural Beauty', category: 'Portrait' },
        { url: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Architectural Lines', category: 'Architecture' },
        { url: 'https://images.pexels.com/photos/4030026/pexels-photo-4030026.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Street Stories', category: 'Documentary' },
        { url: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Intimate Moments', category: 'Wedding' },
        { url: 'https://images.pexels.com/photos/1755685/pexels-photo-1755685.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Urban Landscapes', category: 'Editorial' },
        { url: 'https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Fashion Forward', category: 'Fashion' },
        { url: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Natural Beauty', category: 'Portrait' },
        { url: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Architectural Lines', category: 'Architecture' },
        { url: 'https://images.pexels.com/photos/4030026/pexels-photo-4030026.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Street Stories', category: 'Documentary' },
        { url: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Intimate Moments', category: 'Wedding' },
        { url: 'https://images.pexels.com/photos/1755685/pexels-photo-1755685.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Urban Landscapes', category: 'Editorial' },
        { url: 'https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Fashion Forward', category: 'Fashion' },
        { url: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Natural Beauty', category: 'Portrait' },
        { url: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Architectural Lines', category: 'Architecture' },
        { url: 'https://images.pexels.com/photos/4030026/pexels-photo-4030026.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Street Stories', category: 'Documentary' },
        { url: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Intimate Moments', category: 'Wedding' },
    ];
    // --- VIDEO PROJECTS DATA (omitted for brevity) ---
    const videoProjects = [
        { thumbnail: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Brand Story', duration: '2:30' },
        { thumbnail: 'https://images.pexels.com/photos/1035650/pexels-photo-1035650.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Fashion Film', duration: '1:45' },
        { thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Documentary Short', duration: '5:20' },
        { thumbnail: 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Commercial Spot', duration: '0:30' },
    ];
    // --- LIGHTBOX HANDLERS (omitted for brevity) ---
    const openLightbox = (index: number) => { setLightboxIndex(index); };
    const closeLightbox = () => { setLightboxIndex(null); };
    const navigateLightbox = (direction: 'prev' | 'next') => {
        if (lightboxIndex === null) return;
        const totalImages = photoGallery.length;
        let newIndex = lightboxIndex;
        if (direction === 'next') {
            newIndex = (lightboxIndex + 1) % totalImages;
        } else {
            newIndex = (lightboxIndex - 1 + totalImages) % totalImages;
        }
        setLightboxIndex(newIndex);
    };

    return (
        <section id="portfolio" className="bg-white py-24 md:py-32">
            
            {/* --- NEW: FIXED HEADER BAR --- */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 px-6 shadow-md">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    
                    {/* 1. Back Button (Link to Homepage) */}
                    <Link 
                        to="/" 
                        className="flex items-center text-black font-medium tracking-wide hover:text-gray-700 transition-colors"
                        aria-label="Back to Homepage"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Home
                    </Link>

                    {/* 2. Contact Button (Link to Contact Page/Section) */}
                    {/* Assuming you have a route '/contact' or an ID link */}
                    <Link 
                        to="/#contact" 
                        className="px-4 py-2 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                        aria-label="Contact Us"
                    >
                        Contact
                    </Link>
                </div>
            </header>
            
            {/* Add padding to account for the fixed header so content doesn't hide underneath */}
            <div className="pt-20"> 
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-sm tracking-[0.3em] text-gray-500 uppercase mb-4">Portfolio</p>
                        <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight mb-12">
                            Selected <span className="italic font-light">Work</span>
                        </h2>

                        <div className="inline-flex bg-gray-100 p-1 rounded-full">
                            <button
                                onClick={() => setActiveTab('photo')}
                                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                                    activeTab === 'photo'
                                        ? 'bg-black text-white'
                                        : 'text-gray-600 hover:text-black'
                                }`}
                            >
                                Photography
                            </button>
                            <button
                                onClick={() => setActiveTab('video')}
                                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                                    activeTab === 'video'
                                        ? 'bg-black text-white'
                                        : 'text-gray-600 hover:text-black'
                                }`}
                            >
                                Videography
                            </button>
                        </div>
                    </div>

                    {activeTab === 'photo' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {photoGallery.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="group relative aspect-[4/5] overflow-hidden cursor-pointer block"
                                >
                                    {/* Lightbox Click Area (Priority) */}
                                    <div
                                        onClick={() => openLightbox(index)}
                                        className="absolute inset-0 z-10" 
                                        aria-label={`View ${item.title} full screen`}
                                    >
                                    </div>

                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                    />

                                    {/* Overlay for Title/Category/Link */}
                                    <div className="absolute inset-0  duration-500 z-20 pointer-events-none">
                                    
                                        
                                        {/* Link to Category Page (Uses e.stopPropagation to prevent lightbox click) */}
                                        <Link 
                                            to={createSlug(item.category)} 
                                            onClick={(e) => e.stopPropagation()} 
                                            className="absolute top-6 right-6 text-white p-2 rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto"
                                            aria-label={`Go to ${item.category} gallery`}
                                        >
                                            <ZoomIn size={24} /> 
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ... (Video tab JSX remains unchanged) ... */}
                    {activeTab === 'video' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {videoProjects.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative aspect-video overflow-hidden cursor-pointer"
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                                            <Play size={32} className="text-black ml-1" fill="black" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                                        <p className="text-sm tracking-wider">{item.duration}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div> {/* End of pt-20 div */}

            <Lightbox
                images={photoGallery.map(p => ({ url: p.url, title: p.title }))}
                selectedIndex={lightboxIndex}
                onClose={closeLightbox}
                onNavigate={navigateLightbox}
            />
        </section>
    );
};

export default Portfolio;