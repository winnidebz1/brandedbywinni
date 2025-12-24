import React from 'react';
import { motion } from 'framer-motion';
import { Search, Monitor, Rocket, Smartphone, MapPin, Bot, BarChart3, Layout } from 'lucide-react';

const benefits = [
    {
        icon: <Monitor size={32} />,
        title: "Conversion-Focused Design",
        description: "Built to turn visitors into customers. We focus on user journeys that drive sales and inquiries."
    },
    {
        icon: <Bot size={32} />,
        title: "Advanced SEO Strategy",
        description: "Optimized for Google & major search engines. We structure content for maximizing organic reach and visibility."
    },
    {
        icon: <Search size={32} />,
        title: "Ghana-Targeted Keywords",
        description: "Dominate search in Accra, Kumasi, Takoradi & nationwide with localized keyword strategies."
    },
    {
        icon: <Layout size={32} />,
        title: "Structured Content",
        description: "Website content organized and tagged for maximum visibility in search engines."
    },
    {
        icon: <MapPin size={32} />,
        title: "Local SEO Integration",
        description: "Expert optimization of Google Business Profile to rank higher in local Maps and search results."
    },
    {
        icon: <BarChart3 size={32} />,
        title: "Data-Driven Decisions",
        description: "We use Google Search Console, Analytics & Rank Trackers to continually refine and improve performance."
    }
];

const WhyWebsite: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-brand-dark mb-6"
                    >
                        Our Web-First Approach
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-brand-muted"
                    >
                        We deliver results through a web design–first strategy, ensuring every website is designed to rank, convert, and scale.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-brand-ivory rounded-2xl border border-brand-pink/10 hover:border-brand-pink/40 transition-colors group cursor-default flex flex-col items-center text-center h-full hover:shadow-lg hover:shadow-brand-pink/5"
                        >
                            <div className="w-14 h-14 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink mb-6 group-hover:scale-110 transition-transform duration-300">
                                {React.cloneElement(item.icon as React.ReactElement, { size: undefined, className: "w-8 h-8" })}
                            </div>
                            <h3 className="text-xl font-serif text-brand-dark mb-4">{item.title}</h3>
                            <p className="text-brand-muted text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyWebsite;
