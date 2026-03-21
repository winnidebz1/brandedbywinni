import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <section className="py-28 bg-brand-dark text-white overflow-hidden" id="about-us">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

          {/* Left: Big text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black uppercase leading-none tracking-tight mb-8">
              We Make<br />
              <span className="font-serif italic text-brand-pink lowercase font-medium text-5xl sm:text-6xl md:text-7xl">brands sell.</span>
            </h2>
            <p className="text-white/70 text-lg font-light leading-relaxed max-w-lg mb-10">
              Branded By Winni is a premium branding and graphic design studio built for Food/Beverage, Skincare, Beauty and Fashion brands. We create stunning visual identities, logos, marketing materials, and conversion-focused websites that command attention and convert customers.
            </p>
            <Link
              to="/about"
              className="inline-block px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider rounded-full hover:bg-brand-pink hover:border-brand-pink transition-all duration-300 text-sm"
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
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: '6+', label: 'Years of Experience' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{stat.number}</div>
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
