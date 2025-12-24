import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How long does a typical website project take?",
        answer: "Project duration varies from 1 week to 4 weeks depending on the complexity of the project. Simple websites can be completed in about a week, while more complex projects with custom features may take up to 4 weeks."
    },
    {
        question: "Will my website be responsive on mobile phone?",
        answer: "Absolutely. We design with a 'Mobile-First' approach. This means your website will be fully responsive and optimized for smartphones, tablets, and desktops."
    },
    {
        question: "Do you offer payment plans?",
        answer: "Yes! We understand a website is an investment. Typically, we require a 50% deposit to start, with the remaining 50% due upon completion. For larger projects, we can discuss a milestone-based payment schedule."
    },
    {
        question: "Do you write the content for the site?",
        answer: "We can assist with copywriting as an add-on service. However, nobody knows your business better than you! We usually recommend you provide the core text, and we tweak it for SEO and flow. Our 'Content Strategy & Copywriting' service specifically handles this."
    },
    {
        question: "What happens after the site launches?",
        answer: "You won't be left alone! We offer post-launch support packages to keep your site updated, secure, and running smoothly. We also provide a training session so you can make minor edits yourself."
    },
    {
        question: "How much does web design and SEO cost in Ghana?",
        answer: "Pricing depends on your specific goals, features, and scope. We offer flexible packages tailored to startups, growing businesses, and large enterprises. Contact us for a free quote based on your needs."
    },
    {
        question: "How long before I see results?",
        answer: "Web design delivers immediate credibility once launched. For SEO, you can expect to see initial improvements in 3 months, with significant growth in traffic and rankings typically achieved between 3–6 months."
    },
    {
        question: "What’s included in a website & SEO audit?",
        answer: "Our comprehensive audit covers technical health checks, SEO gap analysis, content structure evaluation, user experience (UX) review, and conversion optimization recommendations to identify exactly how to grow."
    },
    {
        question: "Why should Ghanaian businesses invest in local SEO?",
        answer: "Most customers in Ghana search for services 'near me' or by city (e.g., 'Web designer in Accra'). Local SEO ensures you appear in Google Maps and local search results when these high-intent customers are looking for you."
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
