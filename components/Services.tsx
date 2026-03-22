import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <section className="py-16 md:py-28 bg-brand-dark text-white overflow-hidden" id="about-us">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">

          {/* Left: Big text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[2.1rem] sm:text-4xl md:text-6xl lg:text-[4.8rem] font-sans font-black uppercase tracking-tight leading-[0.95] md:leading-[0.9] mb-5 md:mb-6">
              We Make<br className="hidden md:block"/>
              <span className="font-serif italic text-brand-pink lowercase font-medium tracking-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl block -mt-0.5 md:-mt-2">brands sell.</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-lg mb-8 md:mb-10">
              Branded By Winni is a premium branding and graphic design studio built for Food/Beverage, Skincare, Beauty and Fashion brands. We create stunning visual identities, logos, marketing materials, and conversion-focused websites that command attention and convert customers.
            </p>
            <Link
              to="/about"
              className="inline-block w-full sm:w-auto text-center px-8 py-3.5 md:py-4 border-2 border-white text-white font-bold uppercase tracking-wider rounded-full hover:bg-brand-pink hover:border-brand-pink transition-all duration-300 text-xs md:text-sm"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Right: Stats / Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {[
              { number: '6+', label: 'Years of Experience' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors">
                <div className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">{stat.number}</div>
                <div className="text-white/50 text-sm uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Services;
