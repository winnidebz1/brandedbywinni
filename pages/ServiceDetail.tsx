import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { Monitor, TrendingUp, PenTool, Settings, ArrowRight, ShoppingCart, CheckCircle } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';
import { motion } from 'framer-motion';
import { servicesData } from '../data/services';
import { useCart } from '../context/CartContext';
import { usePricing } from '../context/PricingContext';


const getIcon = (type: string) => {
    switch (type) {
        case 'Monitor': return <Monitor strokeWidth={1.5} size={32} />;
        case 'Settings': return <Settings strokeWidth={1.5} size={32} />;
        case 'TrendingUp': return <TrendingUp strokeWidth={1.5} size={32} />;
        case 'PenTool': return <PenTool strokeWidth={1.5} size={32} />;
        default: return <Monitor strokeWidth={1.5} size={32} />;
    }
};

const ServiceDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const service = servicesData.find(s => s.slug === slug);
    const { addItem } = useCart();
    const { getServicePrice, formatPrice, currencyCode, countryCode } = usePricing();
    const [selectedOption, setSelectedOption] = useState<string>(
        service?.options ? service.options[0].id : ''
    );

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    const selectedServiceOption = service.options && selectedOption
        ? service.options.find((option) => option.id === selectedOption)
        : undefined;

    const currentPrice = selectedServiceOption
        ? getServicePrice(service.id, selectedServiceOption.price, selectedServiceOption.id)
        : getServicePrice(service.id, service.basePrice);

    const currentOptionName = service.options && selectedOption
        ? service.options.find(o => o.id === selectedOption)?.name
        : undefined;

    const handleAddToCart = () => {
        addItem({
            productId: service.id,
            title: service.title,
            price: currentPrice,
            quantity: 1,
            currencyCode,
            countryCode,
            optionId: service.options ? selectedOption : undefined,
            optionName: currentOptionName
        });
    };

    return (
        <div className="pt-20 md:pt-24 min-h-screen bg-brand-ivory">
            <SEO
                title={`${service.title} | Services`}
                description={service.description}
                url={`/services/${service.slug}`}
            />

            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 md:px-12 py-10 md:py-12 overflow-hidden">
                <div className="container mx-auto max-w-5xl">
                    <Link to="/services" className="inline-flex items-center text-brand-muted hover:text-brand-pink mb-6 md:mb-8 transition-colors text-sm md:text-base">
                        <ArrowRight className="rotate-180 mr-2 w-4 h-4" /> Back to Services
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                        {/* Title & Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-8"
                        >
                            <div className="w-14 h-14 md:w-20 md:h-20 bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink mb-5 md:mb-6">
                                {getIcon(service.iconType)}
                            </div>
                            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-brand-dark mb-4 md:mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-base md:text-xl text-brand-muted leading-relaxed max-w-3xl">
                                {service.description}
                            </p>
                        </motion.div>

                        {/* Order Box */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-4 bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-brand-dark/5 border border-brand-dark/5 lg:sticky lg:top-32"
                        >
                            <h3 className="text-xl font-serif text-brand-dark mb-2">Order Summary</h3>
                            <div className="text-3xl md:text-4xl font-bold text-brand-pink mb-6">
                                {formatPrice(currentPrice)}
                            </div>

                            {/* Options Select */}
                            {service.options && service.options.length > 0 && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-brand-dark mb-2">
                                        Select Package Option
                                    </label>
                                    <div className="space-y-3">
                                        {service.options.map((option) => (
                                            <label 
                                                key={option.id}
                                                className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                                                    selectedOption === option.id 
                                                    ? 'border-brand-pink bg-brand-pink/5 text-brand-pink' 
                                                    : 'border-brand-dark/10 hover:border-brand-pink/50 text-brand-dark'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input 
                                                        type="radio" 
                                                        name="package-option" 
                                                        value={option.id}
                                                        checked={selectedOption === option.id}
                                                        onChange={(e) => setSelectedOption(e.target.value)}
                                                        className="hidden" 
                                                    />
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                                        selectedOption === option.id ? 'border-brand-pink' : 'border-brand-muted'
                                                    }`}>
                                                        {selectedOption === option.id && <div className="w-2 h-2 rounded-full bg-brand-pink" />}
                                                    </div>
                                                    <span className="font-medium text-sm">{option.name}</span>
                                                </div>
                                                <span className="text-sm font-bold">
                                                    {formatPrice(getServicePrice(service.id, option.price, option.id))}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add to part button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 bg-brand-pink text-white flex justify-center items-center gap-2 rounded-full hover:bg-brand-dark transition-all duration-300 font-medium tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            
                            <p className="text-xs text-center text-brand-muted mt-4">
                                Secure payment processing available.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 bg-white rounded-t-[2rem] md:rounded-t-[3rem] shadow-sm mt-8 md:mt-12">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
                        {/* Left Column: What You Get */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-4 md:mb-6">What You Get</h3>
                            <div className="p-6 md:p-8 bg-brand-ivory rounded-2xl border border-brand-pink/10 h-full">
                                <p className="text-brand-dark text-base md:text-xl leading-relaxed font-medium">
                                    {service.whatYouGet}
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column: Key Components */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-4 md:mb-6">Features Included</h3>
                            <ul className="space-y-4">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-brand-ivory/50 transition-colors">
                                        <div className="mt-1 text-brand-pink shrink-0">
                                            <CheckCircle size={20} />
                                        </div>
                                        <span className="text-brand-muted text-base md:text-lg">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            <FinalCTA />
        </div>
    );
};

export default ServiceDetail;
