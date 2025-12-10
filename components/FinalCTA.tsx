import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-brand-pink text-brand-dark relative overflow-hidden">
      {/* Removed texture overlay to ensure exact color match with brand pink */}
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight text-brand-dark">
            Let's Build Something <br /> <span className="text-brand-ivory italic">Powerful.</span>
          </h2>
          <p className="text-lg md:text-xl text-brand-dark/80 font-light max-w-2xl mx-auto mb-12">
            Get a modern website that speaks for your brand. Stop competing and starting dominating your niche with a custom digital presence.
          </p>
          <a
            href="https://calendly.com/brandedbywinni/45min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-brand-ivory text-brand-pink font-medium tracking-wide rounded-sm hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-xl shadow-brand-dark/10 hover:shadow-2xl hover:-translate-y-1"
          >
            Book a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;