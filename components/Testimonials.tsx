import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Testimonial = {
  id: string;
  client_name: string;
  role: string;
  content: string;
  rating: number;
  profile_image?: string;
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (data) setTestimonials(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="container mx-auto text-center">
          <p className="text-brand-text">Loading testimonials...</p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark">Word on the streets</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="p-8 md:p-10 bg-brand-ivory rounded-2xl relative group hover:bg-white hover:shadow-xl hover:shadow-brand-pink/10 transition-all duration-500 border border-transparent hover:border-brand-pink/10"
            >
              <Quote className="text-brand-pink mb-6 opacity-50" size={32} />
              <p className="text-brand-text italic font-light leading-relaxed mb-8">"{t.content}"</p>

              {/* Client info with profile picture */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-pink/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {t.profile_image ? (
                    <img src={t.profile_image} alt={t.client_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-brand-dark font-bold text-lg">{t.client_name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-serif text-lg text-brand-dark">{t.client_name}</h4>
                  <p className="text-xs uppercase tracking-widest text-brand-muted">{t.role}</p>
                </div>
              </div>

              {/* Star rating at the bottom */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className={idx < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Brand Logos Strip */}
      <div className="mt-24 pt-12 border-t border-gray-100 container mx-auto px-6">
        <p className="text-center text-xs text-brand-muted uppercase tracking-widest mb-10">Trusted By</p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-20">
          {/* Client Logos - Replaced text with uploaded images */}
          {[
            { name: 'Buernix Tech', src: '/logos/buernix-tech.png' },
            { name: 'Cynde Luxe', src: '/logos/cynde-luxe.png' },
            { name: 'Jollof Empire', src: '/logos/jollof-empire.png' },
            { name: 'Portia Martey', src: '/logos/portia-martey-updated.png' }
          ].map((logo, idx) => (
            <div key={idx} className="h-20 md:h-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="h-full w-auto object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};

export default Testimonials;