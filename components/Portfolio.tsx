import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const projects = [
  { id: 1, title: "Lumina Skin", category: "Ecommerce", image: "/Lumina.jpeg", url: "https://lumina-skin-flax.vercel.app/" },
  { id: 2, title: "Vogue Interiors", category: "Web Design", image: "https://picsum.photos/800/600?random=11" },
  { id: 3, title: "Apex Capital", category: "Corporate", image: "https://picsum.photos/600/800?random=12" },
  { id: 4, title: "Silk & Sage", category: "Branding", image: "https://picsum.photos/800/600?random=13" },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 bg-brand-ivory">
      <div className="container mx-auto">
        <div className="mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark">Selected Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {projects.map((project, index) => {
            const ProjectWrapper = project.url ? 'a' : 'div';
            const wrapperProps = project.url ? { href: project.url, target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`${index % 2 === 0 ? 'md:mt-0' : 'md:mt-24'}`}
              >
                <ProjectWrapper
                  {...wrapperProps}
                  className="group relative overflow-hidden rounded-lg cursor-pointer block"
                >
                  <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-gray-200">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Tap to view overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                    <span className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-sm font-medium tracking-wide shadow-lg">Tap to view</span>
                  </div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-brand-pink text-xs uppercase tracking-widest mb-2">{project.category}</p>
                    <h3 className="font-serif text-3xl text-white">{project.title}</h3>
                  </div>
                </ProjectWrapper>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <a href="#" className="group flex items-center gap-2 border-b border-brand-dark pb-1 text-brand-dark hover:text-brand-pink hover:border-brand-pink transition-all text-lg font-medium">
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;