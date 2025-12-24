import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const techStack = [
    "Google Search Console",
    "Google Analytics 4",
    "SEMrush & Ahrefs",
    "ChatGPT & Gemini (AI)",
    "Perplexity AI",
    "Google Ads Manager",
    "Meta Business Suite",
    "Rank Tracker"
];

const Tools: React.FC = () => {
    return (
        <section className="py-20 bg-brand-ivory border-t border-brand-pink/10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="font-serif text-3xl md:text-4xl text-brand-dark mb-6"
                        >
                            Powered by Industry-Leading Tools
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-brand-muted text-lg mb-8"
                        >
                            We leverage the best technology and AI platforms to ensure your website is data-driven, searchable, and prepared for the future of digital marketing.
                        </motion.p>
                    </div>

                    <div className="md:w-1/2 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {techStack.map((tool, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-brand-dark/5"
                                >
                                    <CheckCircle2 className="text-brand-pink w-5 h-5 shrink-0" />
                                    <span className="text-brand-dark font-medium">{tool}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tools;
