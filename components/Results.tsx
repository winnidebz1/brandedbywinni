import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award } from 'lucide-react';

const stats = [
    {
        icon: <TrendingUp className="w-8 h-8 text-brand-pink" />,
        value: "50%+",
        label: "Increase in Organic Traffic",
        detail: "in under 3 months for clients"
    },
    {
        icon: <Users className="w-8 h-8 text-brand-pink" />,
        value: "35%",
        label: "Boost in Conversions",
        detail: "after redesign & optimization"
    },
    {
        icon: <Award className="w-8 h-8 text-brand-pink" />,
        value: "Page 1",
        label: "Google Rankings",
        detail: "for competitive keywords"
    }
];

const Results: React.FC = () => {
    return (
        <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-5xl mb-4">Real Results for Real Businesses</h2>
                    <p className="text-brand-ivory/70 max-w-2xl mx-auto">We don't just design; we deliver measurable growth.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <div className="bg-brand-ivory/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                {stat.icon}
                            </div>
                            <h3 className="text-5xl font-serif font-bold mb-2 text-brand-pink">{stat.value}</h3>
                            <p className="text-xl font-medium mb-2">{stat.label}</p>
                            <p className="text-sm text-brand-ivory/60">{stat.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Results;
