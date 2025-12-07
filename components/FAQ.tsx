import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How long does a typical website project take?",
        answer: "Timeline varies based on complexity. A standard 5-page business site usually takes 2-4 weeks from concept to launch, provided we have all your content ready."
    },
    {
        question: "Do you offer payment plans?",
        answer: "Yes! We understand a website is an investment. Typically, we require a 50% deposit to start, with the remaining 50% due upon completion. For larger projects, we can discuss a milestone-based payment schedule."
    },
    {
        question: "Will I look good on mobile phones?",
        answer: "Absolutely. We design with a 'Mobile-First' approach. This means your website will be fully responsive and optimized for smartphones, tablets, and desktops."
    },
    {
        question: "Do you write the content for the site?",
        answer: "We can assist with copywriting as an add-on service. However, nobody knows your business better than you! We usually recommend you provide the core text, and we tweak it for SEO and flow."
    },
    {
        question: "What happens after the site launches?",
        answer: "You won't be left alone! We offer post-launch support packages to keep your site updated, secure, and running smoothly. We also provide a training session so you can make minor edits yourself."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Frequently Asked Questions</h2>
                    <p className="text-brand-muted">Everything you need to know about working with us.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-brand-ivory/30">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-brand-ivory transition-colors"
                            >
                                <span className="text-lg font-medium text-brand-dark font-serif">{faq.question}</span>
                                <span className="text-brand-pink ml-4">
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 pt-0 text-brand-muted leading-relaxed border-t border-gray-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
