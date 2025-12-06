
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';

const servicesList = [
    {
        title: "Custom Web Design",
        description: "Tailor-made designs that reflect your brand's personality. No cookie-cutter templates—just unique, effective design.",
        features: ["UI/UX Design", "Responsive Layouts", "Interactive Prototyping", "Brand Integration"]
    },
    {
        title: "Web Development",
        description: "Robust, scalable, and fast code. I build websites that perform flawlessly across all devices and browsers.",
        features: ["React / Next.js", "CMS Integration", "E-commerce Solutions", "Performance Optimization"]
    },
    {
        title: "SEO & Content",
        description: "Strategies to increase your visibility. I optimize your site's structure and content to rank higher on search engines.",
        features: ["Keyword Research", "On-Page SEO", "Speed Optimization", "Copywriting Support"]
    },
    {
        title: "Brand Identity",
        description: "More than just a logo. I help define your visual language to create a cohesive brand experience.",
        features: ["Logo Design", "Color Palettes", "Typography Selection", "Brand Guidelines"]
    }
];

const packages = [
    {
        name: "Starter",
        price: "$999",
        description: "Perfect for personal brands and small portfolios.",
        features: ["1-3 Page Website", "Mobile Responsive", "Contact Form", "Basic SEO Setup", "1 Round of Revisions"]
    },
    {
        name: "Business",
        price: "$2,499",
        description: "Ideal for growing businesses needing more presence.",
        popular: true,
        features: ["5-8 Page Website", "CMS Integration (Blog)", "Advanced SEO", "Social Media Integration", "Speed Optimization", "3 Rounds of Revisions"]
    },
    {
        name: "E-Commerce",
        price: "$4,999+",
        description: "Full online store setup to sell your products.",
        features: ["Product Management", "Payment Gateway Setup", "Customer Accounts", "Inventory System", "Advanced Analytics", "Priority Support"]
    }
];

const ServicesPage: React.FC = () => {
    return (
        <div className="pt-24 bg-brand-ivory min-h-screen">

            {/* Header */}
            <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-serif text-brand-dark mb-6"
                >
                    Expert Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-brand-muted max-w-2xl mx-auto"
                >
                    Comprehensive digital solutions designed to elevate your brand and grow your business.
                </motion.p>
            </div>

            {/* Detailed Services Grid */}
            <div className="container mx-auto px-6 md:px-12 mb-32">
                <div className="grid md:grid-cols-2 gap-8">
                    {servicesList.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl border border-brand-pink/10 shadow-sm hover:shadow-md transition-all"
                        >
                            <h3 className="text-2xl font-serif text-brand-dark mb-4">{service.title}</h3>
                            <p className="text-brand-muted mb-6">{service.description}</p>
                            <ul className="grid grid-cols-2 gap-3">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-brand-dark/80">
                                        <span className="w-1.5 h-1.5 bg-brand-pink rounded-full"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-white py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-brand-dark mb-4">Investment Packages</h2>
                        <p className="text-brand-muted">Transparent pricing for every stage of your business.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative p - 8 rounded - 2xl border ${pkg.popular ? 'border-brand-pink shadow-lg shadow-brand-pink/10' : 'border-gray-200'} bg - white flex flex - col`}
                            >
                                {pkg.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-pink text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-serif text-brand-dark mb-2">{pkg.name}</h3>
                                <div className="text-4xl font-bold text-brand-dark mb-4">{pkg.price}</div>
                                <p className="text-sm text-brand-muted mb-8 pb-8 border-b border-gray-100">{pkg.description}</p>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {pkg.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-brand-dark">
                                            <Check size={16} className="text-brand-pink shrink-0 mt-0.5" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/contact"
                                    className={`block w - full py - 3 rounded - lg text - center font - medium transition - all ${pkg.popular
                                            ? 'bg-brand-pink text-white hover:bg-brand-pink-dark'
                                            : 'bg-brand-ivory text-brand-dark hover:bg-gray-200'
                                        } `}
                                >
                                    Choose {pkg.name}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <FinalCTA />
        </div>
    );
};

export default ServicesPage;

