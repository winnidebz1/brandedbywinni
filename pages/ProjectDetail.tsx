import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet-async';

type Project = {
    id: string;
    title: string;
    slug: string;
    category: string;
    problem: string;
    solution: string;
    cover_image: string;
    images: string[];
    project_url: string;
    client_industry: string;
    seo_keywords: string[];
    created_at: string;
};

const ProjectDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProject();
    }, [slug]);

    const fetchProject = async () => {
        const { data } = await supabase
            .from('projects')
            .select('*')
            .eq('slug', slug)
            .single();

        if (data) setProject(data);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
                <div className="text-center">
                    <h1 className="font-serif text-4xl text-brand-dark mb-4">Project Not Found</h1>
                    <Link to="/" className="text-brand-pink hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{project.title} - Branded By Winni</title>
                <meta name="description" content={project.problem || `View ${project.title} project by Branded By Winni`} />
                {project.seo_keywords && <meta name="keywords" content={project.seo_keywords.join(', ')} />}
            </Helmet>

            <div className="min-h-screen bg-brand-ivory">
                {/* Header */}
                <div className="container mx-auto px-6 md:px-12 py-12">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-pink transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-brand-pink text-sm uppercase tracking-widest mb-4">{project.category}</p>
                        <h1 className="font-serif text-5xl md:text-6xl text-brand-dark mb-6">{project.title}</h1>
                        {project.client_industry && (
                            <p className="text-brand-muted text-lg mb-8">{project.client_industry}</p>
                        )}
                        {project.project_url && (
                            <a
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-brand-ivory rounded-full hover:bg-brand-pink transition-all"
                            >
                                <span>View Live Project</span>
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* Cover Image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="container mx-auto px-6 md:px-12 mb-16"
                >
                    <div className="w-full md:w-3/4 mx-auto rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={project.cover_image || 'https://picsum.photos/1200/800'}
                            alt={project.title}
                            className="w-full h-auto"
                        />
                    </div>
                </motion.div>

                {/* Problem & Solution */}
                {(project.problem || project.solution) && (
                    <div className="container mx-auto px-6 md:px-12 mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {project.problem && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="font-serif text-3xl text-brand-dark mb-4">The Challenge</h2>
                                    <p className="text-brand-text leading-relaxed">{project.problem}</p>
                                </motion.div>
                            )}
                            {project.solution && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="font-serif text-3xl text-brand-dark mb-4">The Solution</h2>
                                    <p className="text-brand-text leading-relaxed">{project.solution}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}

                {/* Additional Images Gallery */}
                {project.images && project.images.length > 0 && (
                    <div className="container mx-auto px-6 md:px-12 pb-20 max-w-6xl">
                        <h2 className="font-serif text-3xl text-brand-dark mb-12 text-center">Project Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {project.images.map((image, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} - Image ${idx + 1}`}
                                        className="w-full h-auto"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                <div className="bg-white py-20">
                    <div className="container mx-auto px-6 md:px-12 text-center">
                        <h2 className="font-serif text-4xl text-brand-dark mb-6">Ready to start your project?</h2>
                        <p className="text-brand-text mb-8 max-w-2xl mx-auto">
                            Let's create something beautiful together. Get in touch to discuss your vision.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-4 bg-brand-dark text-brand-ivory rounded-full hover:bg-brand-pink transition-all font-medium"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetail;
