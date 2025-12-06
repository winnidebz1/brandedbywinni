import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, TrendingUp, PenTool, Database, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Monitor strokeWidth={1.5} />,
    title: "Website Design",
  },
  {
    icon: <TrendingUp strokeWidth={1.5} />,
    title: "SEO Ranking",
  },
  {
    icon: <PenTool strokeWidth={1.5} />,
    title: "Branding",
  },
  {
    icon: <Database strokeWidth={1.5} />,
    title: "CRM",
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Our Expertise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-10 border border-brand-dark/10 hover:border-brand-pink rounded-lg transition-all duration-500 hover:shadow-lg hover:shadow-brand-pink/5 flex flex-col items-center text-center bg-white cursor-pointer"
            >
              <div className="w-16 h-16 bg-brand-ivory text-brand-pink rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:bg-brand-pink group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl text-brand-dark group-hover:text-brand-pink transition-colors mb-6">{service.title}</h3>
              <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="flex items-center gap-2 text-sm text-brand-pink font-medium uppercase tracking-wider">
                      Learn more <ArrowRight size={14} />
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