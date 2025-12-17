import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
    {
        icon: <MessageSquare size={24} />,
        step: "01",
        title: "Discovery",
        description: "We dive deep into your brand, goals, and audience to build a strategy that sets you apart."
    },
    {
        icon: <PenTool size={24} />,
        step: "02",
        title: "Design",
        description: "Crafting visual concepts and high-fidelity mockups that align with your unique brand identity."
    },
    {
        icon: <Code2 size={24} />,
        step: "03",
        title: "Development",
        description: "Turning designs into pixel-perfect, responsive code using the latest web technologies."
    },
    {
        icon: <Rocket size={24} />,
        step: "04",
        title: "Launch",
        description: "Testing, optimization, and liftoff. We ensure everything is perfect before your big reveal."
    }
];

const Process: React.FC = () => {
    return (
        <section className="py-24 bg-brand-ivory relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">

                    <div className="w-full md:w-1/3 md:sticky md:top-32">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-brand-dark mb-6"
                        >
                            Our Creative Process
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-brand-muted mb-8"
                        >
                            From a simple idea to a fully functioning masterpiece, we guide you through every step of the journey with transparency and expertise.
                        </motion.p>
                        <motion.a
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            href="https://docs.google.com/forms/d/e/1FAIpQLSffhowT-hhYtbkTPll8hDwopZrNitJf9GqQchwEn6XTwSbMDg/viewform?usp=header"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-pink transition-colors duration-300"
                        >
                            Start Your Project
                        </motion.a>
                    </div>

                    <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-8">
                        {steps.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col md:flex-row gap-3 md:gap-6 p-4 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-brand-pink/5"
                            >
                                <div className="shrink-0 flex md:block items-center gap-2">
                                    <div className="text-3xl md:text-5xl font-serif text-brand-pink/20 font-bold -mt-2 md:mb-2">{item.step}</div>
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-ivory flex items-center justify-center text-brand-dark">
                                        {React.cloneElement(item.icon as React.ReactElement, { size: undefined, className: "w-4 h-4 md:w-6 md:h-6" })}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base md:text-2xl font-serif text-brand-dark mb-1 md:mb-3">{item.title}</h3>
                                    <p className="text-brand-muted text-xs md:text-base leading-relaxed">{item.description}</p>
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
