import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "An absolute master of their craft. The attention to detail and artistic vision transformed our brand campaign beyond expectations.",
      author: "Sarah Chen",
      role: "Creative Director, Luxury Brand Co.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      quote: "Working together was seamless. The final images captured the essence of our story in ways we never imagined possible.",
      author: "Marcus Johnson",
      role: "CEO, Tech Innovations",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      quote: "Exceptional talent with an eye for capturing genuine emotion. Our wedding video is a cinematic masterpiece we'll treasure forever.",
      author: "Elena & David Rodriguez",
      role: "Wedding Clients",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section id="testimonials" className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-gray-400 uppercase mb-4">Testimonials</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Client <span className="italic font-light">Stories</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-white/30 transition-all duration-500 group"
            >
              <Quote size={40} className="text-white/30 mb-6 group-hover:text-white/50 transition-colors duration-500" />
              <p className="text-gray-300 leading-relaxed mb-8 text-lg italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover grayscale"
                />
                <div>
                  <p className="text-white font-bold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
