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
            Ghana’s Web Design Studio for High-Converting, <span className="italic text-brand-pink/90">SEO-Optimized</span> Websites
          </h1>
          <p className="text-lg md:text-xl text-brand-muted max-w-2xl font-light leading-relaxed mb-6">
            Grow your brand with conversion-focused web design and AI-powered SEO strategies tailored for Ghanaian and international businesses.
          </p>

          <p className="text-base text-brand-dark font-medium mb-10 bg-brand-pink/10 px-4 py-2 rounded-full border border-brand-pink/20">
            Helping Ghana-based brands increase traffic, credibility, and online sales in under 90 days.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSffhowT-hhYtbkTPll8hDwopZrNitJf9GqQchwEn6XTwSbMDg/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 bg-brand-dark text-white font-light tracking-wide rounded-sm hover:bg-brand-pink transition-colors duration-300 w-fit">
              Request a Free Website & SEO Audit
            </a>
            <a href="#portfolio" className="group flex items-center gap-3 text-brand-dark font-medium pb-1 border-b border-brand-dark hover:border-brand-pink hover:text-brand-pink transition-all duration-300 w-fit">
              View Case Studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            <img
              src="/hero-1.jpg"
              alt="Team Collaboration"
              className="w-full h-full object-cover opacity-90"
              fetchPriority="high"
            />
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