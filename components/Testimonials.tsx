import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    brand: "Glow Botanics",
    text: "Branded By Winni completely transformed our online presence. The design is elegant, functional, and our sales increased by 40% in the first month."
  },
  {
    name: "Kwame Asante",
    brand: "Asante Architecture",
    text: "Professional, timely, and incredibly talented. They understood our vision for a high-end corporate site perfectly. Highly recommended."
  },
  {
    name: "Elise Dubois",
    brand: "Maison De Mode",
    text: "The branding strategy provided was invaluable. Our new identity feels premium and confident, exactly what we needed to scale globally."
  }
];

const Testimonials: React.FC = () => {
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
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="p-8 md:p-10 bg-brand-ivory rounded-2xl relative group hover:bg-white hover:shadow-xl hover:shadow-brand-pink/10 transition-all duration-500 border border-transparent hover:border-brand-pink/10"
            >
              <Quote className="text-brand-pink mb-6 opacity-50" size={32} />
              <p className="text-brand-text italic font-light leading-relaxed mb-8">"{t.text}"</p>
              <div>
                <h4 className="font-serif text-lg text-brand-dark">{t.name}</h4>
                <p className="text-xs uppercase tracking-widest text-brand-muted">{t.brand}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Brand Logos Strip */}
      <div className="mt-24 pt-12 border-t border-gray-100 container mx-auto px-6">
        <p className="text-center text-xs text-brand-muted uppercase tracking-widest mb-10">Trusted By</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {/* Client Logos - Replaced text with uploaded images */}
          {[
            { name: 'Buernix Tech', src: '/logos/buernix-tech.png' },
            { name: 'Cynde Luxe', src: '/logos/cynde-luxe.png' },
            { name: 'Jollof Empire', src: '/logos/jollof-empire.png' },
            { name: 'Portia Martey', src: '/logos/portia-martey.png' }
          ].map((logo, idx) => (
            <div key={idx} className="h-16 md:h-20 flex items-center justify-center">
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="h-full w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300 contrast-0 grayscale hover:grayscale-0 hover:contrast-100" // Added contrast-0/grayscale filtering to make them blend in initially
              />
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};

export default Testimonials;