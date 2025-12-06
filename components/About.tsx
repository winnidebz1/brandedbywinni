import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-brand-ivory">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Images Grid */}
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="col-span-2 aspect-[16/9] overflow-hidden rounded-lg shadow-sm"
              >
                <img src="/image1.jpeg" alt="Workspace" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="aspect-square overflow-hidden rounded-lg shadow-sm"
              >
                <img src="https://picsum.photos/400/400?random=4" alt="Designer working" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="aspect-square bg-brand-pink/10 flex items-center justify-center rounded-lg"
              >
                <div className="p-6 text-center">
                  <span className="block font-serif text-5xl font-bold text-brand-pink mb-2">5+</span>
                  <span className="text-xs uppercase tracking-widest text-brand-dark">Years of Excellence</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-serif text-4xl text-brand-dark mb-6 tracking-wide">ABOUT</h2>
            <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-8 leading-tight">
              We design with <span className="text-brand-pink italic">intention</span> and strategy.
            </h3>
            <div className="space-y-6 text-brand-text font-light leading-relaxed text-lg">
              <p>
                Branded By Winni is a Ghanaian-based creative agency partnering with Beauty, Skincare, Food/Beverage, Ecommerce and lifestyle brands that want to stand out and scale profitably. We don’t just design websites, we build high-converting digital assets that become the engine of your brand’s growth and profitability.
              </p>
              <p>
                Our work sits at the intersection of aesthetic brilliance and efficient performance. We believe your website should feel like luxury, function with clarity and work overtime to boost <span className="text-brand-pink font-medium">visibility</span>, <span className="text-brand-pink font-medium">conversions</span> and <span className="text-brand-pink font-medium">profit</span>. Clean layouts, intuitive user flows, fast load speeds and SEO-driven structure in every detail is crafted with strategy, intention and results in mind.
              </p>
              <p>
                With 205+ brands served across Africa, the U.S, U.K and beyond, we bring a polished global perspective while staying deeply committed to elevating African businesses to world-class status. Whether you’re launching a bold Beauty line, scaling a Food/Beverage brand or refreshing your digital identity, we create online experiences designed to help you grow smarter, faster and more profitably.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;