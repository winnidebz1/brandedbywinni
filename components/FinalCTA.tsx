import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12 bg-brand-ivory overflow-hidden relative">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(232,155,167,0.2),transparent_60%)]"></div>

      <div className="container mx-auto text-center relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-brand-pink font-medium mb-6">Ready To Glow Up?</p>

          <h2 className="text-5xl md:text-6xl lg:text-[4.8rem] font-sans font-black text-brand-charcoal uppercase tracking-tight leading-[0.9] mb-6">
            Let's Build<br className="hidden md:block"/>
            <span className="font-serif italic text-brand-pink lowercase font-medium tracking-normal text-3xl md:text-4xl lg:text-5xl block -mt-1 md:-mt-2">your brand.</span>
          </h2>

          <p className="text-lg text-brand-muted font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Stop blending in. Start commanding attention. Your premium brand is a few clicks away.
          </p>

          <div className="flex justify-center items-center">
            <Link
              to="/services"
              className="px-10 py-4 bg-brand-dark text-white font-bold uppercase tracking-wider rounded-full hover:bg-brand-pink transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-sm md:text-base"
            >
              Shop Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
