import React from 'react';
import { motion } from 'framer-motion';
import { Search, Monitor, Rocket, Smartphone } from 'lucide-react';

const benefits = [
    {
        icon: <Monitor size={32} />,
        title: "Digital Credibility",
        description: "75% of consumers judge a company's credibility based on their website design. Make a powerful first impression."
    },
    {
        icon: <Search size={32} />,
        title: "SEO Optimized",
        description: "Get found on Google. We build with best-in-class SEO practices to ensure organic traffic flows to your business."
    },
    {
        icon: <Smartphone size={32} />,
        title: "Mobile First",
        description: "Over 50% of web traffic is mobile. Your site will look stunning and function perfectly on every device."
    },
    {
        icon: <Rocket size={32} />,
        title: "Conversion Focused",
        description: "Beautiful isn't enough. We design with psychology in mind to turn visitors into paying customers."
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
                        Why You Need a Professional Website
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-brand-muted"
                    >
                        Your website is your 24/7 salesperson. It never sleeps, never takes a day off, and is always there to showcase your value to the world.
                    </motion.p>
                </div>

                <div className="grid grid-cols-4 gap-2 md:gap-8">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-2 md:p-8 bg-brand-ivory rounded-xl md:rounded-2xl border border-brand-pink/10 hover:border-brand-pink/40 transition-colors group cursor-default flex flex-col items-center text-center"
                        >
                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                {React.cloneElement(item.icon as React.ReactElement, { size: undefined, className: "w-5 h-5 md:w-8 md:h-8" })}
                            </div>
                            <h3 className="text-xs md:text-xl font-serif text-brand-dark">{item.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyWebsite;
