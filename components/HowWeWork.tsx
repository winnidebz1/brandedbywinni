import React from 'react';
import { MessageSquare, Palette, Rocket } from 'lucide-react';

/**
 * How We Work Component
 * 
 * Simple 3-step process explanation
 * Reduces friction, builds confidence
 * 
 * Design: Clear, numbered steps
 * Copy: Action-oriented
 */

const steps = [
    {
        number: '01',
        icon: MessageSquare,
        title: 'Discover & Strategy',
        description: 'We start with a detailed consultation to understand your business, goals, target audience, and brand vision. This ensures we're aligned from day one.',
    duration: '1-2 days'
  },
    {
        number: '02',
        icon: Palette,
        title: 'Design & Refine',
        description: 'Our team creates initial concepts based on our strategy session. You review, provide feedback, and we refine until it's perfect—unlimited revisions included.',
    duration: '3-7 days'
  },
    {
        number: '03',
        icon: Rocket,
        title: 'Deliver & Launch',
        description: 'You receive all final files in multiple formats, ready to use across all platforms. Plus, we provide brand guidelines and ongoing support.',
        duration: '1-2 days'
    },
];

const HowWeWork: React.FC = () => {
    return (
        <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-ivory">
            <div className="container mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6 font-semibold">
                        How We Work
                    </h2>
                    <p className="text-xl text-brand-text font-light leading-relaxed">
                        A simple, proven 3-step process that delivers results—no complexity, just excellence.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                {/* Step Number */}
                                <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-pink rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-2xl font-bold text-white">{step.number}</span>
                                </div>

                                {/* Icon */}
                                <div className="w-14 h-14 bg-brand-pink/10 rounded-xl flex items-center justify-center mb-6 mt-4">
                                    <Icon className="w-7 h-7 text-brand-pink" />
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-xl text-brand-dark mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-brand-text leading-relaxed mb-4">
                                    {step.description}
                                </p>

                                {/* Duration */}
                                <div className="inline-block px-4 py-2 bg-brand-ivory rounded-full text-sm font-medium text-brand-dark">
                                    ⏱️ {step.duration}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Timeline Indicator */}
                <div className="text-center">
                    <p className="text-brand-text mb-6">
                        <span className="font-semibold text-brand-dark">Total timeline:</span> 5-11 days from start to finish
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-brand-dark">Ready to start your project today</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowWeWork;
