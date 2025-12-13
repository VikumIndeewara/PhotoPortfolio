import { Camera, Film, Image, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: 'Editorial Photography',
      description: 'High-end fashion, lifestyle, and portrait photography for magazines and brands.',
    },
    {
      icon: Film,
      title: 'Cinematic Videography',
      description: 'Story-driven video production for commercials, documentaries, and narratives.',
    },
    {
      icon: Image,
      title: 'Commercial Content',
      description: 'Professional product photography and branded content for digital campaigns.',
    },
    {
      icon: Users,
      title: 'Event Coverage',
      description: 'Comprehensive photo and video coverage for weddings, corporate, and special events.',
    },
  ];

  return (
    <section id="services" className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-gray-400 uppercase mb-4">Services</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            What I <span className="italic font-light">Offer</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/30"
            >
              <div className="mb-6">
                <service.icon
                  size={48}
                  className="text-white group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
