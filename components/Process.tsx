import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
    {
        icon: <MessageSquare size={24} />,
        step: "01",
        title: "Discovery",
        description: "We dive into your brand, goals, audience, and offers to define the right creative direction."
    },
    {
        icon: <PenTool size={24} />,
        step: "02",
        title: "Strategy & Concept",
        description: "We map ideas into a clear concept for your selected services, from identity to marketing assets."
    },
    {
        icon: <Code2 size={24} />,
        step: "03",
        title: "Creation",
        description: "We design and produce your deliverables with consistency, quality, and attention to detail."
    },
    {
        icon: <Rocket size={24} />,
        step: "04",
        title: "Delivery & Support",
        description: "You receive polished final files, rollout guidance, and support to help your brand perform."
    }
];

const Process: React.FC = () => {
    return (
        <section className="py-16 md:py-24 bg-brand-ivory relative">
            <div className="container mx-auto px-4 sm:px-6 md:px-12">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">

                    <div className="w-full md:w-1/3 md:sticky md:top-32">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-serif text-brand-dark mb-4 md:mb-6"
                        >
                            Our Creative Process
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-lg text-brand-muted mb-6 md:mb-8"
                        >
                            From brand identity and design assets to websites and campaigns, our process keeps every project strategic, smooth, and results-focused.
                        </motion.p>
                        <motion.a
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            href="/services"
                            className="inline-block w-full sm:w-auto text-center px-8 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-pink transition-colors duration-300"
                        >
                            Start Your Project
                        </motion.a>
                    </div>

                    <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:gap-8">
                        {steps.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col md:flex-row gap-3 md:gap-6 p-5 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-brand-pink/5"
                            >
                                <div className="shrink-0 flex md:block items-center gap-2">
                                    <div className="text-3xl md:text-5xl font-serif text-brand-pink/20 font-bold -mt-1.5 md:-mt-2 md:mb-2">{item.step}</div>
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-ivory flex items-center justify-center text-brand-dark">
                                        {React.cloneElement(item.icon as React.ReactElement, { size: undefined, className: "w-4 h-4 md:w-6 md:h-6" })}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-2xl font-serif text-brand-dark mb-1 md:mb-3">{item.title}</h3>
                                    <p className="text-brand-muted text-sm md:text-base leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Process;
