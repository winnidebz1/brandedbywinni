
import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Heart, Globe, Zap, Instagram, Twitter } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';

// Custom TikTok Icon
const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const values = [
    {
        icon: <Heart size={24} />,
        title: "Passion Driven",
        text: "We don't just build websites; we craft experiences. Every pixel is placed with purpose and love for the craft."
    },
    {
        icon: <Globe size={24} />,
        title: "Global Perspective",
        text: "Based in Ghana, but working with clients worldwide. We bring a diverse cultural understanding to every project."
    },
    {
        icon: <Zap size={24} />,
        title: "Fast & Efficient",
        text: "We respect your time. Our workflow is optimized to deliver high-quality results without unnecessary delays."
    }
];

const AboutPage: React.FC = () => {
    const countRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(countRef, { once: true });

    useEffect(() => {
        if (inView && countRef.current) {
            const controls = animate(0, 205, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(value) {
                    if (countRef.current) {
                        countRef.current.textContent = value.toFixed(0) + "+";
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView]);

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
                            Hello, We're <span className="text-brand-pink">Branded By Winni</span>. <br />
                            Your Digital Growth Partner.
                        </h1>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            We help visionaries and businesses translate their ideas into stunning digital reality. Our mission is to empower brands with websites that don't just look good—they convert, engage, and grow your business.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-6 py-4 bg-white rounded-xl shadow-sm border border-brand-pink/10">
                                <div className="text-3xl font-bold text-brand-pink mb-1">5+</div>
                                <div className="text-xs uppercase tracking-wider text-brand-muted">Years Exp</div>
                            </div>
                            <div className="px-6 py-4 bg-white rounded-xl shadow-sm border border-brand-pink/10">
                                <div className="text-3xl font-bold text-brand-pink mb-1">
                                    <span ref={countRef}>0+</span>
                                </div>
                                <div className="text-xs uppercase tracking-wider text-brand-muted">Brands Served</div>
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
                                alt="Branded By Winni Team"
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
                        <h3 className="text-sm uppercase tracking-widest text-brand-pink mb-3 font-semibold">Our Journey</h3>
                        <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">More Than Just Code</h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-lg mx-auto text-brand-muted"
                    >
                        <p className="mb-6">
                            It all started with a curiosity for how things work on the internet. That curiosity quickly turned into an obsession with digital design and development. We realized that a website is more than just information; it's a digital home, a brand ambassador, and a storytelling platform.
                        </p>
                        <p className="mb-6">
                            Over the years, we've honed our skills in <strong>React, TypeScript, Modern UI Design, SEO, and Conversion Optimization</strong>. We don't just write code; we solve problems. Whether it's a small portfolio for a creative or a complex e-commerce platform for a growing brand, we approach every project with the same level of dedication and detail.
                        </p>
                        <p>
                            Our philosophy is simple: <strong>Your success is our success</strong>. We believe in building long-term partnerships with our clients, helping them grow their digital presence and achieve their business goals. When you work with us, you're not just getting a website—you're getting a strategic partner invested in your growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-brand-ivory">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h3 className="text-sm uppercase tracking-widest text-brand-pink mb-3 font-semibold">What Drives Us</h3>
                        <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">Our Core Values</h2>
                    </div>
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

            {/* Connect Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-6">Let's Connect</h2>
                        <p className="text-lg text-brand-muted mb-8">
                            Follow our journey and stay updated with our latest projects, tips, and insights on building powerful digital experiences.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <a
                                href="https://instagram.com/brandedbywinni_"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full border-2 border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all hover:scale-110"
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                href="https://tiktok.com/@brandedbywinnistudioo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full border-2 border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all hover:scale-110"
                            >
                                <TikTokIcon size={24} />
                            </a>
                            <a
                                href="https://x.com/brandedbywinni"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full border-2 border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all hover:scale-110"
                            >
                                <Twitter size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <FinalCTA />
        </div>
    );
};

export default AboutPage;

