
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';

const categories = ["All", "Web Design", "Development", "Branding"];

const projects = [
    {
        id: 1,
        title: "Luxe Interiors",
        category: "Web Design",
        description: "A minimalist portfolio for an interior design studio.",
        color: "bg-stone-200"
    },
    {
        id: 2,
        title: "TechFlow App",
        category: "Development",
        description: "SaaS landing page with complex animations and 3D elements.",
        color: "bg-blue-100"
    },
    {
        id: 3,
        title: "Organic Cafe",
        category: "Branding",
        description: "Full brand identity and website for a local coffee shop.",
        color: "bg-green-100"
    },
    {
        id: 4,
        title: "Urban Fashion",
        category: "Web Design",
        description: "E-commerce store design with a focus on high-fashion aesthetics.",
        color: "bg-orange-100"
    },
    {
        id: 5,
        title: "FinTech Dashboard",
        category: "Development",
        description: "User dashboard interface for a financial tracking application.",
        color: "bg-indigo-100"
    },
    {
        id: 6,
        title: "Artistry Gallery",
        category: "Web Design",
        description: "Digital art gallery showcasing NFT collections.",
        color: "bg-purple-100"
    }
];

const PortfolioPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="pt-24 bg-brand-ivory min-h-screen">

            {/* Header */}
            <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
                <h1 className="text-4xl md:text-6xl font-serif text-brand-dark mb-6">Selected Works</h1>
                <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-12">
                    A showcase of digital products crafted with passion and precision.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px - 6 py - 2 rounded - full text - sm uppercase tracking - wider transition - all duration - 300 ${activeCategory === cat
                                    ? 'bg-brand-dark text-white shadow-lg'
                                    : 'bg-white text-brand-muted hover:bg-gray-100 border border-gray-200'
                                } `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-6 md:px-12 mb-32">
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group cursor-pointer"
                            >
                                <div className={`aspect - [4 / 3] ${project.color} rounded - 2xl overflow - hidden mb - 6 relative`}>
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
                                        <h3 className="text-xl font-serif text-brand-dark mb-1 group-hover:text-brand-pink transition-colors">{project.title}</h3>
                                        <p className="text-brand-muted text-sm">{project.description}</p>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-brand-pink/60 border border-brand-pink/20 px-2 py-1 rounded">
                                        {project.category}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <FinalCTA />
        </div>
    );
};

export default PortfolioPage;

