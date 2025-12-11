import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 md:px-12 bg-soft-gradient">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-brand-dark mb-8">
            Elevating Brands with Elegant Strategy for Maximum <span className="italic text-brand-pink/90">Efficiency</span> & Profit
          </h1>
          <p className="text-lg md:text-xl text-brand-muted max-w-2xl font-light leading-relaxed mb-10">
            We build modern, conversion-focused websites and branding systems that help businesses communicate beautifully, sell seamlessly and scale globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <a href="#portfolio" className="group flex items-center gap-3 text-brand-dark font-medium pb-1 border-b border-brand-dark hover:border-brand-pink hover:text-brand-pink transition-all duration-300 w-fit">
              View Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://wa.me/233202326851" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 bg-brand-dark text-white font-light tracking-wide rounded-sm hover:bg-brand-pink transition-colors duration-300 w-fit">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </motion.div>

        {/* Abstract / Minimal Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-4 relative block h-[500px] lg:h-[600px] w-full mt-12 lg:mt-0"
        >
          {/* Decorative collage using simple divs and images */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:top-10 lg:right-0 w-64 h-80 bg-gray-200 overflow-hidden rounded-lg shadow-xl rotate-3 hover:rotate-0 transition-transform duration-700">
            <img src="/hero-1.jpg" alt="Team Collaboration" className="w-full h-full object-cover opacity-90" />
          </div>
          <div className="hidden lg:block absolute bottom-10 left-10 lg:bottom-20 lg:left-10 w-48 h-64 lg:w-56 lg:h-72 bg-gray-300 overflow-hidden rounded-lg shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-700 z-10">
            <img src="/hero-2.jpg" alt="Creative Meeting" className="w-full h-full object-cover opacity-90" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-brand-pink/20 blur-3xl z-0"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;