
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet-async';
import FinalCTA from '../components/FinalCTA';

type Project = {
    id: string;
    title: string;
    slug: string;
    category: string;
    cover_image: string;
    client_industry: string;
    problem: string;
};

const PortfolioPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        // Set initial category based on URL param
        if (categoryParam === 'websites') {
            setActiveCategory('Web Design');
        } else if (categoryParam === 'branding') {
            setActiveCategory('Branding');
        }
    }, [categoryParam]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const { data } = await supabase
            .from('projects')
            .select('id, title, slug, category, cover_image, client_industry, problem, created_at')
            .order('created_at', { ascending: false });

        if (data) setProjects(data);
        setLoading(false);
    };

    const categories = ["All", "Web Design", "Branding", "Packaging Design", "Social Media"];

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => {
            if (activeCategory === 'Web Design') {
                return p.category === 'Web Design' || p.category === 'Website Design';
            }
            if (activeCategory === 'Branding') {
                return p.category === 'Brand Identity' || p.category === 'Branding';
            }
            return p.category === activeCategory;
        });

    const getPageTitle = () => {
        if (categoryParam === 'websites') return 'Website Design Projects';
        if (categoryParam === 'branding') return 'Branding & Graphic Design';
        return 'Selected Works';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{getPageTitle()} - Branded By Winni</title>
                <meta name="description" content="Explore our portfolio of stunning website designs and creative branding projects" />
            </Helmet>

            <div className="pt-24 bg-brand-ivory min-h-screen">
                {/* Header */}
                <div className="container mx-auto px-6 md:px-12 mb-16">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-pink transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-serif text-brand-dark mb-6">
                            {getPageTitle()}
                        </h1>
                        <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-12">
                            A showcase of digital products crafted with passion and precision.
                        </p>

                        {/* Filters */}
                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-brand-dark text-white shadow-lg'
                                        : 'bg-white text-brand-muted hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="container mx-auto px-6 md:px-12 mb-32">
                    {filteredProjects.length > 0 ? (
                        <motion.div
                            layout
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence>
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        key={project.id}
                                    >
                                        <Link
                                            to={`/project/${project.slug}`}
                                            className="group cursor-pointer block"
                                        >
                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative bg-gray-200">
                                                <img
                                                    src={project.cover_image || 'https://picsum.photos/800/600'}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

                                                {/* Overlay on hover */}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                        <button className="px-6 py-3 bg-white text-brand-dark rounded-full font-medium flex items-center gap-2 hover:bg-brand-pink hover:text-white transition-colors">
                                                            View Project <ArrowRight size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-serif text-brand-dark mb-1 group-hover:text-brand-pink transition-colors">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-brand-muted text-sm">
                                                        {project.client_industry || project.problem?.substring(0, 80) + '...' || 'View project details'}
                                                    </p>
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-pink/60 border border-brand-pink/20 px-2 py-1 rounded">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-brand-muted text-lg mb-8">
                                No projects found in this category yet.
                            </p>
                            <button
                                onClick={() => setActiveCategory('All')}
                                className="px-8 py-4 bg-brand-dark text-brand-ivory rounded-full hover:bg-brand-pink transition-all font-medium"
                            >
                                View All Projects
                            </button>
                        </div>
                    )}
                </div>

                <FinalCTA />
            </div>
        </>
    );
};

export default PortfolioPage;

