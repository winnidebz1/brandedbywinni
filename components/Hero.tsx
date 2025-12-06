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
          className="lg:col-span-8 flex flex-col justify-center"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-brand-dark mb-8">
            Elevating Brands with Elegant Strategy for Maximum <span className="italic text-brand-pink/90">Efficiency</span> & Profit
          </h1>
          <p className="text-lg md:text-xl text-brand-muted max-w-2xl font-light leading-relaxed mb-10">
            We build modern, conversion-focused websites and branding systems that help businesses communicate beautifully, sell seamlessly and scale globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#portfolio" className="group flex items-center gap-3 text-brand-dark font-medium pb-1 border-b border-brand-dark hover:border-brand-pink hover:text-brand-pink transition-all duration-300 w-fit">
              View Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-3 bg-brand-dark text-white font-light tracking-wide rounded-sm hover:bg-brand-pink transition-colors duration-300 w-fit">
              Let's Talk
            </a>
          </div>
        </motion.div>

        {/* Abstract / Minimal Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-4 relative hidden lg:block h-[600px] w-full"
        >
          {/* Decorative collage using simple divs and images */}
          <div className="absolute top-10 right-0 w-64 h-80 bg-gray-200 overflow-hidden rounded-lg shadow-xl rotate-3 hover:rotate-0 transition-transform duration-700">
            <img src="/hero-1.jpg" alt="Team Collaboration" className="w-full h-full object-cover opacity-90" />
          </div>
          <div className="absolute bottom-20 left-10 w-56 h-72 bg-gray-300 overflow-hidden rounded-lg shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-700 z-10">
            <img src="/hero-2.jpg" alt="Creative Meeting" className="w-full h-full object-cover opacity-90" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-brand-pink/20 blur-3xl z-0"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;