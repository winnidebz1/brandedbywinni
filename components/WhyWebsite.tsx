import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { usePricing } from '../context/PricingContext';

const WhyWebsite: React.FC = () => {
  const { getServicePrice, formatPrice } = usePricing();
  // Show only the first 3 services as a featured teaser
  const featured = servicesData.slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-brand-ivory overflow-hidden" id="services">
      <div className="container mx-auto px-6 md:px-12">

        {/* Blair-style section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-[4.8rem] font-sans font-black text-brand-charcoal uppercase tracking-tight leading-[0.9]">
            Choose Your <br className="hidden md:block"/>
            <span className="font-serif italic text-brand-pink lowercase font-medium tracking-normal text-3xl md:text-4xl lg:text-5xl block -mt-1 md:-mt-2">next move</span>
          </h2>
        </div>

        {/* Service Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 max-w-5xl mx-auto mb-20">
          {featured.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center text-center max-w-[320px] w-full mx-auto"
            >
              {/* Image */}
              <div className="w-full aspect-square overflow-hidden relative group/image mb-5">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {/* Quick View Overlay */}
                <Link
                  to={`/services/${service.slug}`}
                  className="absolute inset-0 bg-white/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
                >
                  <span className="text-brand-dark font-medium uppercase tracking-widest text-xs bg-white px-6 py-3 rounded-full hover:bg-brand-dark hover:text-white transition-colors shadow-sm">
                    Quick View
                  </span>
                </Link>
              </div>

              <h3 className="text-[17px] text-brand-dark font-medium tracking-wide mb-1">{service.title}</h3>
              <p className="text-[14px] text-brand-dark/70 mb-5">
                {formatPrice(getServicePrice(service.id, service.basePrice))}
              </p>

              <Link
                to={`/services/${service.slug}`}
                className="px-8 py-[10px] border border-brand-dark text-brand-dark text-xs uppercase tracking-widest rounded-full hover:bg-brand-dark hover:text-white transition-colors font-medium"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>

        {/* See All Services CTA */}
        <div className="text-center">
          <Link
            to="/services"
            className="inline-block px-10 py-4 border-2 border-brand-dark text-brand-dark font-bold uppercase tracking-wider rounded-full hover:bg-brand-pink hover:border-brand-pink hover:text-white transition-all duration-300 text-sm md:text-base"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WhyWebsite;
