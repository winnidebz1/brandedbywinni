
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, TrendingUp, PenTool, Database, ArrowRight, ChevronUp } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';

const services = [
    {
        icon: <Monitor strokeWidth={1.5} />,
        title: "Website Design",
        details: "Custom, responsive, and aesthetic website designs that capture your brand identity and convert visitors into loyal clients."
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
    },
    {
        icon: <Database strokeWidth={1.5} />,
        title: "CRM",
        details: "Customer Relationship Management solutions to streamline your interactions, improve customer service, and boost sales efficiency."
    }
];

const ServicesPage: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleService = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="pt-24 bg-brand-ivory min-h-screen">

            {/* Header */}
            <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-serif text-brand-dark mb-6"
                >
                    Our Expertise
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-brand-muted max-w-2xl mx-auto"
                >
                    Comprehensive digital solutions designed to elevate your brand and grow your business.
                </motion.p>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-6 md:px-12 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            {/* Get Quote Section */}
            <div className="bg-white py-24">
                <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-serif text-brand-dark mb-6">Ready to Get Started?</h2>
                        <p className="text-lg text-brand-muted mb-10">
                            Every project is unique. Let's discuss your specific needs and create a custom solution that fits your budget and goals.
                        </p>
                        <a
                            href="https://wa.me/233202326851"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-12 py-4 bg-brand-pink text-white font-medium tracking-wide rounded-full hover:bg-brand-dark transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            Get a Quote
                        </a>
                    </motion.div>
                </div>
            </div>

            <FinalCTA />
        </div>
    );
};

export default ServicesPage;

