import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const Credentials: React.FC = () => {
  const countRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(countRef, { once: true });

  useEffect(() => {
    if (inView && countRef.current) {
      const controls = animate(0, 205, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (countRef.current) {
            countRef.current.textContent = value.toFixed(0) + "+";
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView]);

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 max-w-5xl mx-auto"
        >
          <div className="text-center md:text-left">
            <h2 className="font-serif text-6xl md:text-8xl text-brand-pink opacity-80 mb-2">
              <span ref={countRef}>0+</span>
            </h2>
          </div>
          <div className="h-[1px] w-24 bg-brand-dark/20 md:h-24 md:w-[1px] hidden md:block"></div>
          <div className="text-center md:text-left max-w-lg">
             <p className="text-2xl font-serif text-brand-dark mb-2">Brands Served Globally</p>
             <p className="text-brand-muted font-light">
               Partnering with visionaries worldwide to define their digital presence across industries from Beauty to Corporate Finance.
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Credentials;