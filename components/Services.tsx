import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, TrendingUp, PenTool, Settings, ArrowRight, ChevronUp } from 'lucide-react';

const services = [
  {
    icon: <Monitor strokeWidth={1.5} />,
    title: "Website Design",
    description: "Your website is often the first interaction a potential client has with your business. If it's clunky, outdated, or hard to navigate, you're losing money. We create bespoke, user-friendly websites that not only look incredible but are built to convert. We focus on storytelling and intuitive user flows to ensure your visitors stay longer and take action.",
    whatYouGet: "A fully responsive, custom-designed website that elevates your credibility and turns visitors into clients.",
    components: ["Strategic UI/UX Design", "Mobile & Tablet Responsiveness", "Conversion-Focused Layouts", "CMS Integration"]
  },
  {
    icon: <Settings strokeWidth={1.5} />,
    title: "Website Maintenance & Optimization",
    description: "Nothing kills a sale faster than a broken link or a slow-loading page. But keeping up with technical updates, security patches, and backups is a headache you don't have time for. We handle all the technical details—keeping your site secure, fast, and glitch-free—so you can focus on running your business.",
    whatYouGet: "Total peace of mind with a website that is always secure, up-to-date, and running at lightning speed.",
    components: ["24/7 Security Monitoring", "Regular Software Updates", "Performance Speed Tuning", "Daily Cloud Backups"]
  },
  {
    icon: <TrendingUp strokeWidth={1.5} />,
    title: "SEO Ranking",
    description: "You have an amazing business, but does Google know that? Being buried on page 2 (or 10) means your ideal clients never find you. Invisibility is costing you growth. We implement data-driven SEO strategies to help your business climb the search rankings and dominate your local market. Stop being the best-kept secret in your industry.",
    whatYouGet: "Increased visibility and a steady stream of organic traffic from people actively searching for your services.",
    components: ["Advanced Keyword Research", "On-Page Optimization", "Technical SEO Audits", "Competitor Analysis"]
  },
  {
    icon: <PenTool strokeWidth={1.5} />,
    title: "Branding",
    description: "First impressions stick. If your visual identity looks amateurish or inconsistent, customers will trust you less. A logo is not a brand; a brand is a feeling. We craft unique brand identities that resonate with your target audience and tell your unique story. From logos to color palettes, we ensure every touchpoint communicates professionalism and trust.",
    whatYouGet: "A polished, professional brand identity that commands authority and builds immediate trust with your audience.",
    components: ["Logo Design & Variations", "Curated Color Palettes", "Typography Systems", "Brand Style Guidelines"]
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 items-start">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => toggleService(index)}
              className={`group p-4 md:p-8 border border-brand-dark/10 hover:border-brand-pink rounded-lg transition-all duration-500 hover:shadow-lg hover:shadow-brand-pink/5 flex flex-col items-center text-center bg-white cursor-pointer ${expandedIndex === index ? 'border-brand-pink shadow-lg shadow-brand-pink/5' : ''}`}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-ivory text-brand-pink rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:bg-brand-pink group-hover:text-white">
                {React.cloneElement(service.icon as React.ReactElement, { size: undefined, className: "w-6 h-6 md:w-8 md:h-8" })}
              </div>
              <h3 className="font-serif text-base md:text-2xl text-brand-dark group-hover:text-brand-pink transition-colors mb-2 md:mb-4 leading-tight">{service.title}</h3>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, paddingBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', paddingBottom: 16 }}
                    exit={{ opacity: 0, height: 0, paddingBottom: 0 }}
                    className="overflow-hidden w-full text-left"
                  >
                    <div className="space-y-4">
                      <p className="text-brand-muted text-xs md:text-sm leading-relaxed">
                        {service.description}
                      </p>

                      <div>
                        <h4 className="font-semibold text-brand-dark text-xs md:text-sm mb-1">What You Get:</h4>
                        <p className="text-brand-muted text-xs md:text-sm">{service.whatYouGet}</p>
                      </div>

                      <div className="hidden md:block">
                        <h4 className="font-semibold text-brand-dark text-xs md:text-sm mb-1">Components:</h4>
                        <ul className="text-brand-muted text-xs md:text-sm space-y-1">
                          {service.components.map((c, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-brand-pink mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-auto transition-opacity duration-300 transform">
                <span className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-brand-pink font-medium uppercase tracking-wider">
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