import { useState } from 'react';
// FIX 1: Import Link from react-router-dom, not lucide-react. 
// Note: lucide-react should be imported separately for icons.
import { Link } from 'react-router-dom'; 
import { Play } from 'lucide-react'; // Link icon removed, Play remains

// --- CATEGORY SLUG HELPER FUNCTION ---
// This function ensures the links match the paths in your App.tsx: 
// /editorial, /fashion, /portrait, /architecture, /documentary, /wedding
const createSlug = (categoryName: string): string => {
    return '/' + categoryName
        .toLowerCase()
        .replace(/ /g, '-');
};

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');

    // NOTE: I've kept your original category names (Editorial, Fashion, etc.). 
    // You should ensure these align with the category paths you defined in App.tsx.
    const photoGallery = [
        {
            url: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Urban Landscapes',
            category: 'Editorial',
        },
        {
            url: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Fashion Forward',
            category: 'Fashion',
        },
        {
            url: 'https://images.pexels.com/photos/1405963/pexels-photo-1405963.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Natural Beauty',
            category: 'Portrait',
        },
        {
            url: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Architectural Lines',
            category: 'Architecture',
        },
        {
            url: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Street Stories',
            category: 'Documentary',
        },
        {
            url: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Intimate Moments',
            category: 'Wedding',
        },
    ];

    const videoProjects = [
        // ... video projects array (unchanged)
        {
            thumbnail: 'https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Brand Story',
            duration: '2:30',
        },
        {
            thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Fashion Film',
            duration: '1:45',
        },
        {
            thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Documentary Short',
            duration: '5:20',
        },
        {
            thumbnail: 'https://images.pexels.com/photos/1415268/pexels-photo-1415268.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Commercial Spot',
            duration: '0:30',
        },
    ];

    return (
        <section id="portfolio" className="bg-white py-24 md:py-32">
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
                            // FIX 2 & 3: Use Link from react-router-dom and the 'to' prop with the slug.
                            <Link 
                                to={createSlug(item.category)} 
                                key={index} 
                                className="group relative aspect-[4/5] overflow-hidden cursor-pointer block"
                            >
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="text-sm tracking-wider mb-1">{item.category}</p>
                                        <h3 className="text-2xl font-bold">{item.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

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
        </section>
    );
};

export default Portfolio;