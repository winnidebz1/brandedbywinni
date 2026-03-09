import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

/**
 * Featured Work Component
 * 
 * Visual-first portfolio showcase
 * Displays best work with context (client, industry, goal)
 * 
 * Performance: Lazy-loaded images below fold
 * Design: Image-first, minimal text
 * Conversion: CTA to full portfolio
 */

const featuredProjects = [
    {
        title: 'Terra Bite',
        client: 'Restaurant & Delivery',
        industry: 'Food & Beverage',
        goal: 'Launch brand identity & marketing campaign',
        image: '/projects/terra-bite-flyer-final.png',
        tags: ['Brand Identity', 'Marketing'],
    },
    {
        title: 'Jollof Empire',
        client: 'Food Business',
        industry: 'Food & Beverage',
        goal: 'Create memorable visual identity',
        image: '/projects/jollof-empire-identity.png',
        tags: ['Logo Design', 'Branding'],
    },
    {
        title: 'Buernix Tech',
        client: 'Technology Startup',
        industry: 'Technology',
        goal: 'Modern tech brand identity',
        image: '/projects/buernix-tech-identity.png',
        tags: ['Brand Identity', 'Digital'],
    },
    {
        title: 'Portia Martey',
        client: 'Personal Brand',
        industry: 'Professional Services',
        goal: 'Sophisticated personal branding',
        image: '/logos/portia-martey-updated.png',
        tags: ['Personal Brand', 'Logo'],
    },
    {
        title: 'Cynde Luxe',
        client: 'Luxury Brand',
        industry: 'Fashion & Lifestyle',
        goal: 'Premium luxury branding',
        image: '/logos/cynde-luxe.png',
        tags: ['Luxury', 'Visual Identity'],
    },
    {
        title: 'Terra Bite Packaging',
        client: 'Restaurant & Delivery',
        industry: 'Food & Beverage',
        goal: 'Branded packaging design',
        image: '/projects/terra-bite-packaging.png',
        tags: ['Packaging', 'Branding'],
    },
];

const FeaturedWork: React.FC = () => {
    return (
        <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-ivory" id="portfolio">
            <div className="container mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6 font-semibold">
                        Featured Work
                    </h2>
                    <p className="text-xl text-brand-text font-light leading-relaxed">
                        Real brands. Real results. See how we've helped businesses like yours stand out and succeed.
                    </p>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featuredProjects.map((project, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                                <OptimizedImage
                                    src={project.image}
                                    alt={`${project.client} - ${project.title}`}
                                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    width={600}
                                    height={450}
                                    priority={index < 3} // Prioritize first 3 images
                                    objectFit="cover"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        View Project
                                        <ExternalLink className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-serif text-2xl text-brand-dark mb-2 font-semibold">
                                    {project.title}
                                </h3>

                                <div className="space-y-2 mb-4">
                                    <p className="text-sm text-brand-muted">
                                        <span className="font-medium text-brand-dark">Client:</span> {project.client}
                                    </p>
                                    <p className="text-sm text-brand-muted">
                                        <span className="font-medium text-brand-dark">Industry:</span> {project.industry}
                                    </p>
                                    <p className="text-sm text-brand-muted">
                                        <span className="font-medium text-brand-dark">Goal:</span> {project.goal}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 bg-brand-pink/10 text-brand-pink text-xs font-medium rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <a
                        href="/portfolio"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-brand-dark text-white font-medium rounded-md hover:bg-brand-pink transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                        View Full Portfolio
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="mt-4 text-sm text-brand-muted">
                        50+ projects delivered | Ghana and International clients
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;

