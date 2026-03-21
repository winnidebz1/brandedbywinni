import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "What services do you offer?",
        answer: "We offer brand identity design, logo design, social media design, marketing materials, website design, and strategic creative support for growing brands."
    },
    {
        question: "How long does a typical project take?",
        answer: "Timelines depend on the service and scope. Smaller design tasks can be completed in a few days, while full brand or web projects may take a few weeks."
    },
    {
        question: "Do you offer payment plans?",
        answer: "Yes. Most projects start with a 50% deposit and the balance on completion. For larger scopes, we can structure payments by milestone."
    },
    {
        question: "How many revisions are included?",
        answer: "Most packages include revision rounds so we can refine your direction before final delivery. The exact number depends on the service you select."
    },
    {
        question: "Do you work with clients outside Ghana?",
        answer: "Absolutely. We work with clients across Ghana and internationally, with clear communication and structured timelines from kickoff to delivery."
    },
    {
        question: "Can I combine multiple services in one package?",
        answer: "Yes. Many clients combine services like brand identity, social media assets, and web design for a consistent brand experience across every touchpoint."
    },
    {
        question: "Do you help with content and messaging too?",
        answer: "Yes. We can guide your messaging and content structure so your visuals and words align and speak clearly to your ideal audience."
    },
    {
        question: "What happens after my project is completed?",
        answer: "You receive final files and handoff guidance. If needed, you can also continue with us for updates, ongoing design support, or future campaigns."
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
