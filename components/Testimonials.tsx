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
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setHasError(false);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'Approved')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        throw error;
      }

      if (data) {
        setReviews(data);
      }
    } catch (error) {
      console.error('Failed to load testimonials:', error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white">
        <div className="container mx-auto text-center">
          <p className="text-brand-text">Loading reviews...</p>
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white">
        <div className="container mx-auto text-center">
          <p className="text-brand-text mb-4">We could not load reviews right now.</p>
          <button
            onClick={fetchReviews}
            className="px-6 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-pink transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[360px] h-[360px] md:w-[500px] md:h-[500px] bg-brand-pink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-serif text-3xl md:text-5xl text-brand-dark">Word on the streets</h2>
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {reviews.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="p-6 md:p-10 bg-brand-ivory rounded-2xl relative group hover:bg-white hover:shadow-xl hover:shadow-brand-pink/10 transition-all duration-500 border border-transparent hover:border-brand-pink/10 flex flex-col justify-between"
              >
                <div>
                  <Quote className="text-brand-pink mb-5 md:mb-6 opacity-50" size={28} />
                  <p className="text-brand-text italic font-light leading-relaxed mb-5 md:mb-6 text-sm md:text-base">"{t.content}"</p>
                </div>

                <div>
                  <div className="mb-5 md:mb-6"></div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-12 h-12 rounded-full bg-brand-pink/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {t.profile_image ? (
                        <img src={t.profile_image} alt={t.client_name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-brand-dark font-bold text-lg">{t.client_name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-base md:text-lg text-brand-dark">{t.client_name}</h4>
                      <p className="text-xs uppercase tracking-widest text-brand-muted">{t.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        className={idx < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 italic">
            No reviews yet. Be the first to <a href="/review-us" className="text-brand-pink underline">leave a review</a>!
          </div>
        )}
      </div>

      {/* Brand Logos Strip */}
      <div className="mt-16 md:mt-24 pt-10 md:pt-12 border-t border-gray-100 container mx-auto px-4 sm:px-6">
        <p className="text-center text-xs text-brand-muted uppercase tracking-widest mb-8 md:mb-10">Trusted By</p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-16">
          {[
            { name: 'Buernix Tech', src: '/logos/buernix-tech.png' },
            { name: 'Cynde Luxe', src: '/logos/cynde-luxe.png' },
            { name: 'Jollof Empire', src: '/logos/jollof-empire.png' },
            { name: 'Portia Martey', src: '/logos/portia-martey-updated.png' }
          ].map((logo, idx) => (
            <div key={idx} className="h-12 sm:h-14 md:h-28 flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="h-full w-auto object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};

export default Testimonials;
