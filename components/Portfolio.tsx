import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Project = {
  id: string;
  title: string;
  category: string;
  cover_image: string;
  slug: string;
};

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('id, title, category, cover_image, slug')
      .order('created_at', { ascending: false })
      .limit(12);

    if (data) setProjects(data);
    setLoading(false);
  };

  const websiteProjects = projects.filter(p =>
    p.category === 'Web Design' || p.category === 'Website Design'
  );

  const brandingProjects = projects.filter(p =>
    p.category === 'Brand Identity' || p.category === 'Branding' || p.category === 'Packaging Design'
  );

  if (loading) {
    return (
      <section id="portfolio" className="py-32 px-6 md:px-12 bg-brand-ivory">
        <div className="container mx-auto text-center">
          <p className="text-brand-text">Loading projects...</p>
        </div>
      </section>
    );
  }
  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 bg-brand-ivory">
      <div className="container mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark">Selected Works</h2>
        </div>

        {/* Website Designs Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 text-center md:text-left">
            <h3 className="font-serif text-3xl text-brand-dark">Website Designs</h3>
            <Link
              to="/portfolio?category=websites"
              className="group flex items-center gap-2 text-brand-pink hover:text-brand-dark transition-colors text-sm font-medium"
            >
              View All Websites
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={`/project/${project.slug}`} className="group relative overflow-hidden rounded-lg cursor-pointer block">
                  <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-gray-200">
                    <img
                      src={project.cover_image || 'https://picsum.photos/800/600'}
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
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Branding/Graphic Design Section */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 text-center md:text-left">
            <h3 className="font-serif text-3xl text-brand-dark">Branding & Graphic Design</h3>
            <Link
              to="/portfolio?category=branding"
              className="group flex items-center gap-2 text-brand-pink hover:text-brand-dark transition-colors text-sm font-medium"
            >
              View All Branding
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandingProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={`/project/${project.slug}`} className="group relative overflow-hidden rounded-lg cursor-pointer block">
                  <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-gray-200">
                    <img
                      src={project.cover_image || 'https://picsum.photos/800/600'}
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
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;