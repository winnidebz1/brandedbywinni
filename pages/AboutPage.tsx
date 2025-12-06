
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Zap, Coffee } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';

const values = [
    {
        icon: <Heart size={24} />,
        title: "Passion Driven",
        text: "I don't just build websites; I craft experiences. Every pixel is placed with purpose and love for the craft."
    },
    {
        icon: <Globe size={24} />,
        title: "Global Perspective",
        text: "Based in Ghana, but working with clients worldwide. I bring a diverse cultural understanding to every project."
    },
    {
        icon: <Zap size={24} />,
        title: "Fast & Efficient",
        text: "I respect your time. My workflow is optimized to deliver high-quality results without unnecessary delays."
    }
];

const AboutPage: React.FC = () => {
    return (
        <div className="pt-24 bg-brand-ivory min-h-screen">

            {/* Hero Section */}
            <div className="container mx-auto px-6 md:px-12 mb-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-serif text-brand-dark mb-6 leading-tight">
                            Hello, I'm <span className="text-brand-pink">Winni</span>. <br />
                            Creative Developer & Designer.
                        </h1>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            I help visionaries and businesses translate their ideas into stunning digital reality. My mission is to make the web more beautiful, one site at a time.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-6 py-4 bg-white rounded-xl shadow-sm border border-brand-pink/10">
                                <div className="text-3xl font-bold text-brand-pink mb-1">3+</div>
                                <div className="text-xs uppercase tracking-wider text-brand-muted">Years Exp</div>
                            </div>
                            <div className="px-6 py-4 bg-white rounded-xl shadow-sm border border-brand-pink/10">
                                <div className="text-3xl font-bold text-brand-pink mb-1">20+</div>
                                <div className="text-xs uppercase tracking-wider text-brand-muted">Projects</div>
                            </div>
                            <div className="px-6 py-4 bg-white rounded-xl shadow-sm border border-brand-pink/10">
                                <div className="text-3xl font-bold text-brand-pink mb-1">100%</div>
                                <div className="text-xs uppercase tracking-wider text-brand-muted">Satisfaction</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="/image1.jpeg"
                                alt="Cornelius Debpuur"
                                className="w-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 border-2 border-brand-pink rounded-2xl transform -rotate-3 translate-x-4 translate-y-4 z-0"></div>
                    </motion.div>
                </div>
            </div>

            {/* Story Section */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <div className="text-center mb-12">
                        <h3 className="text-sm uppercase tracking-widest text-brand-pink mb-3 font-semibold">My Journey</h3>
                        <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">More Than Just Code</h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-lg mx-auto text-brand-muted"
                    >
                        <p className="mb-6">
                            It all started with a curiosity for how things work on the internet. That curiosity quickly turned into an obsession with digital design and development. I realized that a website is more than just information; it's a digital home, a brand ambassador, and a storytelling platform.
                        </p>
                        <p className="mb-6">
                            Over the years, I've honed my skills in <strong>React, TypeScript, and Modern UI Design</strong>. I don't just write code; I solve problems. Whether it's a small portfolio for a creative or a complex e-commerce platform for a growing brand, I approach every project with the same level of dedication and detail.
                        </p>
                        <p>
                            When I'm not coding, you can find me exploring new design trends, sipping good coffee, or brainstorming the next big idea. I believe in continuous learning and pushing the boundaries of what's possible on the web.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-brand-ivory">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((val, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100"
                            >
                                <div className="w-16 h-16 mx-auto bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink mb-6">
                                    {val.icon}
                                </div>
                                <h3 className="text-xl font-serif text-brand-dark mb-4">{val.title}</h3>
                                <p className="text-brand-muted">{val.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <FinalCTA />
        </div>
    );
};

export default AboutPage;

