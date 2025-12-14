import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ZoomIn } from "lucide-react";
import Lightbox from "../components/LightBox";
import { supabase } from "../db/SupabaseClient";
import { Play } from 'lucide-react'; 
/* ================= TYPES ================= */

interface PortfolioItem {
  id?: string;
  url: string;
  title: string;
  category: string;
}

/* ================= HELPERS ================= */

const createSlug = (category: string) =>
  "/" + category.toLowerCase().replace(/\s+/g, "-");

/* ================= COMPONENT ================= */

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"photo" | "video">("photo");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [dbPhotos, setDbPhotos] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* ================= DEFAULT PHOTOS ================= */

  const defaultPhotoGallery: PortfolioItem[] = [
    {
      url: "https://images.pexels.com/photos/1755685/pexels-photo-1755685.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Urban Landscapes",
      category: "Editorial",
    },
    {
      url: "https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Fashion Forward",
      category: "Fashion",
    },
    {
      url: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Natural Beauty",
      category: "Portrait",
    },
  ];

  /* ================= VIDEO DATA ================= */

  const videoProjects = [
    {
      thumbnail:
        "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Brand Story",
      duration: "2:30",
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/1035650/pexels-photo-1035650.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Fashion Film",
      duration: "1:45",
    },
  ];

  /* ================= FETCH SUPABASE IMAGES ================= */

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("portfolio_images")
        .select("id, title, category, image_url")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        setLoading(false);
        return;
      }

      if (data) {
        const mapped: PortfolioItem[] = data.map((item: any) => ({
          id: item.id,
          url: item.image_url,
          title: item.title,
          category: item.category,
        }));

        setDbPhotos(mapped);
      }

      setLoading(false);
    };

    fetchImages();
  }, []);

  /* ================= FINAL GALLERY (DEFAULT → DB) ================= */

  const finalGallery: PortfolioItem[] = [
    ...defaultPhotoGallery,
    ...dbPhotos.filter(
      (db) =>
        !defaultPhotoGallery.some((def) => def.url === db.url)
    ),
  ];

  /* ================= LIGHTBOX HANDLERS ================= */

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = (dir: "prev" | "next") => {
    if (lightboxIndex === null) return;

    const total = finalGallery.length;

    setLightboxIndex((prev) =>
      dir === "next"
        ? (prev! + 1) % total
        : (prev! - 1 + total) % total
    );
  };

  /* ================= RENDER ================= */

  return (
    <section id="portfolio" className="bg-white py-24 md:py-32">
      {/* ================= FIXED HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-b shadow-sm px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <Link
            to="/#contact"
            className="bg-black text-white px-4 py-2 rounded-full"
          >
            Contact
          </Link>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="pt-24 max-w-7xl mx-auto px-6">
        {/* ================= TITLE & TABS ================= */}
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-4">
            Portfolio
          </p>
          <h2 className="text-5xl md:text-6xl font-bold mb-10">
            Selected <span className="italic font-light">Work</span>
          </h2>

          <div className="inline-flex bg-gray-100 p-1 rounded-full">
            {["photo", "video"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-8 py-3 rounded-full transition ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {tab === "photo" ? "Photography" : "Videography"}
              </button>
            ))}
          </div>
        </div>

        {/* ================= PHOTO GRID ================= */}
        {activeTab === "photo" && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finalGallery.map((item, index) => (
                <div
                  key={item.id ?? index}
                  className="group relative aspect-[4/5] overflow-hidden"
                >
                  <div
                    role="button"
                    onClick={() => openLightbox(index)}
                    className="absolute inset-0 z-10"
                  />

                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-sm tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-2xl font-bold">
                        {item.title}
                      </h3>
                    </div>

                    <Link
                      to={createSlug(item.category)}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-6 right-6 p-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
                    >
                      <ZoomIn size={22} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {loading && (
              <p className="text-center text-gray-500 mt-10">
                Loading more images...
              </p>
            )}
          </>
        )}

        {/* ================= VIDEO GRID ================= */}
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

      {/* ================= LIGHTBOX ================= */}
      {lightboxIndex !== null && (
        <Lightbox
          images={finalGallery.map((p) => ({
            url: p.url,
            title: p.title,
          }))}
          selectedIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  );
};

export default Portfolio;
