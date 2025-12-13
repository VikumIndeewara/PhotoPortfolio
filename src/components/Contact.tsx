import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-gray-500 uppercase mb-4">Contact</p>
          <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight">
            Let's Create
            <br />
            <span className="italic font-light">Together</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-xl text-gray-600 leading-relaxed">
              Have a project in mind? I'd love to hear about your vision and explore how we can
              bring it to life together.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="text-black mt-1" size={24} />
                <div>
                  <p className="font-bold text-black">Email</p>
                  <p className="text-gray-600">hello@lens.studio</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="text-black mt-1" size={24} />
                <div>
                  <p className="font-bold text-black">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="text-black mt-1" size={24} />
                <div>
                  <p className="font-bold text-black">Location</p>
                  <p className="text-gray-600">Los Angeles, California</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-4">Follow</p>
              <div className="flex space-x-6">
                {['Instagram', 'Vimeo', 'Behance'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="text-black hover:text-gray-600 transition-colors font-medium"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 focus:border-black focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 focus:border-black focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Project Type"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 focus:border-black focus:outline-none transition-colors"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 focus:border-black focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-4 font-medium tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 group"
            >
              <span>SEND MESSAGE</span>
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>


    </section>
  );
};

export default Contact;
