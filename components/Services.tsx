import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, TrendingUp, PenTool, Settings, ArrowRight, ChevronUp } from 'lucide-react';

const services = [
  {
    icon: <Monitor strokeWidth={1.5} />,
    title: "Website Design",
    details: "Custom, responsive, and aesthetic website designs that capture your brand identity and convert visitors into loyal clients."
  },
  {
    icon: <Settings strokeWidth={1.5} />,
    title: "Website Maintenance & Optimization",
    details: "Keep your website running smoothly with regular updates, performance optimization, security patches, and technical support to ensure peak performance."
  },
  {
    icon: <TrendingUp strokeWidth={1.5} />,
    title: "SEO Ranking",
    details: "Strategic search engine optimization to improve your visibility, drive organic traffic, and rank higher on Google search results."
  },
  {
    icon: <PenTool strokeWidth={1.5} />,
    title: "Branding",
    details: "Comprehensive branding services including logo design, color palettes, and typography to create a cohesive and memorable brand image."
  }
];

const Services: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Our Expertise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => toggleService(index)}
              className={`group p-8 border border-brand-dark/10 hover:border-brand-pink rounded-lg transition-all duration-500 hover:shadow-lg hover:shadow-brand-pink/5 flex flex-col items-center text-center bg-white cursor-pointer ${expandedIndex === index ? 'border-brand-pink shadow-lg shadow-brand-pink/5' : ''}`}
            >
              <div className="w-16 h-16 bg-brand-ivory text-brand-pink rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:bg-brand-pink group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl text-brand-dark group-hover:text-brand-pink transition-colors mb-4">{service.title}</h3>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, paddingBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', paddingBottom: 16 }}
                    exit={{ opacity: 0, height: 0, paddingBottom: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-brand-muted text-sm leading-relaxed">
                      {service.details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-auto transition-opacity duration-300 transform">
                <span className="flex items-center gap-2 text-sm text-brand-pink font-medium uppercase tracking-wider">
                  {expandedIndex === index ? (
                    <>Show less <ChevronUp size={14} /></>
                  ) : (
                    <>Learn more <ArrowRight size={14} /></>
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;