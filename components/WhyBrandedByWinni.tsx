import React from 'react';
import { Award, Zap, Heart, TrendingUp } from 'lucide-react';

/**
 * Why Branded By Winni Component
 * 
 * Trust-building section highlighting unique value propositions
 * Shows why clients choose us over competitors
 * 
 * Focus: Credibility, expertise, results
 */

const reasons = [
    {
        icon: Award,
        title: 'Premium Quality, Always',
        description: 'Every design is crafted with meticulous attention to detail. We don\'t do templates—only custom work that reflects your unique brand.',
        stat: '100% Custom Design'
    },
    {
        icon: Zap,
        title: 'Fast Turnaround',
        description: 'We understand deadlines matter. Get initial concepts within 48 hours and final deliverables in days, not weeks.',
        stat: '48-Hour First Draft'
    },
    {
        icon: Heart,
        title: 'Collaborative Process',
        description: 'Your vision, our expertise. We work closely with you at every step, ensuring the final result exceeds expectations.',
        stat: 'Unlimited Revisions'
    },
    {
        icon: TrendingUp,
        title: 'Results-Driven Approach',
        description: 'Beautiful design that works. Our strategic approach ensures your branding drives real business growth and conversions.',
        stat: '300% Avg. ROI'
    },
];

const WhyBrandedByWinni: React.FC = () => {
    return (
        <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
            <div className="container mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6 font-semibold">
                        Why Branded By Winni?
                    </h2>
                    <p className="text-xl text-brand-text font-light leading-relaxed">
                        We're not just designers—we're strategic partners invested in your brand's success.
                    </p>
                </div>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <div
                                key={index}
                                className="bg-brand-ivory/50 rounded-2xl p-8 hover:bg-brand-pink/5 transition-all duration-300 border border-brand-pink/10"
                            >
                                {/* Icon & Stat */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 bg-brand-pink/10 rounded-xl flex items-center justify-center">
                                        <Icon className="w-7 h-7 text-brand-pink" />
                                    </div>
                                    <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-brand-dark shadow-sm">
                                        {reason.stat}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-2xl text-brand-dark mb-3">
                                    {reason.title}
                                </h3>

                                {/* Description */}
                                <p className="text-brand-text leading-relaxed">
                                    {reason.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Social Proof */}
                <div className="bg-gradient-to-r from-brand-pink/10 via-brand-ivory to-brand-pink/10 rounded-2xl p-8 md:p-12 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">50+</div>
                            <div className="text-brand-text">Brands Transformed</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">98%</div>
                            <div className="text-brand-text">Client Satisfaction</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">5★</div>
                            <div className="text-brand-text">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyBrandedByWinni;
