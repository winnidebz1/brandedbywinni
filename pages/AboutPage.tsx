
import React from 'react';
import SEO from '../components/seo/SEO';
import { motion } from 'framer-motion';
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
        text: "We don't just create designs; we craft unforgettable brand experiences. Every pixel, logo mark, and layout is placed with purpose to elevate your business."
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

    return (
        <div className="pt-20 md:pt-24 bg-brand-ivory min-h-screen">
            <SEO
                title="Premium Branding & Graphic Design Agency in Ghana | About Branded By Winni"
                description="Learn about Ghana's leading branding and graphic design studio. We specialize in brand identity, logo design, visual branding, and web design for beauty, fashion, and food brands."
                url="/about"
            />

            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-16 md:mb-24">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center md:text-left"
                    >
                        <h1 className="text-[2.1rem] sm:text-4xl md:text-6xl lg:text-[4.8rem] font-sans font-black uppercase tracking-tight leading-[0.95] md:leading-[0.9] text-brand-dark mb-5 md:mb-6">
                            BRANDED BY WINNI <br className="hidden md:block"/>
                            <span className="font-serif italic text-brand-pink lowercase font-medium tracking-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl block -mt-0.5 md:-mt-2">
                                is your digital growth partner.
                            </span>
                        </h1>
                        <p className="text-base md:text-xl text-brand-muted leading-relaxed mb-7 md:mb-8">
                            We help visionaries and businesses translate their ideas into stunning visual identities and digital experiences. Our mission is to empower brands with premium graphic design, branding, and websites that don't just look good, they convert, engage, and grow your business.
                        </p>
                        <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
                            <div className="px-4 md:px-6 py-3.5 md:py-4 bg-white rounded-xl shadow-sm border border-brand-pink/10">
                                <div className="text-2xl md:text-3xl font-bold text-brand-pink mb-1">6+</div>
                                <div className="text-xs uppercase tracking-wider text-brand-muted">Years Exp</div>
                            </div>
                            <div className="px-4 md:px-6 py-3.5 md:py-4 bg-white rounded-xl shadow-sm border border-brand-pink/10">
                                <div className="text-2xl md:text-3xl font-bold text-brand-pink mb-1">100%</div>
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
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-0 md:rotate-3 md:hover:rotate-0 transition-transform duration-500">
                            <img
                                src="/teamphoto.png"
                                alt="Branded By Winni Team"
                                className="w-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 border-2 border-brand-pink rounded-2xl transform -rotate-3 translate-x-4 translate-y-4 z-0"></div>
                    </motion.div>
                </div>
            </div>

            {/* Story Section */}
            <section className="bg-white py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl">
                    <div className="text-center mb-10 md:mb-12">
                        <h3 className="text-sm uppercase tracking-widest text-brand-pink mb-3 font-semibold">Our Journey</h3>
                        <h2 className="text-2xl md:text-4xl font-serif text-brand-dark">More Than Just Code and Colors</h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-base md:prose-lg mx-auto text-brand-muted"
                    >
                        <p className="mb-6">
                            It all started with a simple belief: great design should do more than just look pretty—it should drive real business results. We noticed too many brands settling for generic visuals and websites that failed to turn scrolling visitors into paying customers. We wanted to change that.
                        </p>
                        <p className="mb-6">
                            Over the last 6+ years, we've partnered with visionaries, startups, and established enterprises to build bold, unmistakable brand identities. Whether it's a memorable logo, premium packaging, or a high-converting e-commerce store, we focus entirely on your growth. We blend strategic thinking with striking visual design to ensure your business stands out and makes money.
                        </p>
                        <p>
                            Our philosophy is simple: <strong>Your success is our success</strong>. We believe in building long-term partnerships with our clients, helping them dominate their market and achieve their financial goals. When you work with us, you're not just getting a design service—you're getting a dedicated team invested in your brand's future.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24 bg-brand-ivory">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="text-center mb-10 md:mb-16">
                        <h3 className="text-sm uppercase tracking-widest text-brand-pink mb-3 font-semibold">What Drives Us</h3>
                        <h2 className="text-2xl md:text-4xl font-serif text-brand-dark">Our Core Values</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5 md:gap-8">
                        {values.map((val, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm text-center border border-gray-100"
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
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-4xl font-serif text-brand-dark mb-5 md:mb-6">Let's Connect</h2>
                        <p className="text-base md:text-lg text-brand-muted mb-8">
                            Follow our journey and stay updated with our latest projects, tips, and insights on building powerful digital experiences.
                        </p>
                        <div className="flex gap-3 md:gap-4 justify-center">
                            <a
                                href="https://instagram.com/brandedbywinni_"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all hover:scale-110"
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                href="https://tiktok.com/@brandedbywinnistudioo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all hover:scale-110"
                            >
                                <TikTokIcon size={24} />
                            </a>
                            <a
                                href="https://x.com/brandedbywinni"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all hover:scale-110"
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

