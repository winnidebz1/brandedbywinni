import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { motion } from 'framer-motion';
import { Monitor, TrendingUp, PenTool, Settings } from 'lucide-react';
import { servicesData } from '../data/services';
import { useCart } from '../context/CartContext';
import { usePricing } from '../context/PricingContext';
import FinalCTA from '../components/FinalCTA';

const getIcon = (type: string) => {
    switch (type) {
        case 'Monitor': return <Monitor strokeWidth={1.5} size={32} />;
        case 'Settings': return <Settings strokeWidth={1.5} size={32} />;
        case 'TrendingUp': return <TrendingUp strokeWidth={1.5} size={32} />;
        case 'PenTool': return <PenTool strokeWidth={1.5} size={32} />;
        default: return <Monitor strokeWidth={1.5} size={32} />;
    }
};

const ServicesPage: React.FC = () => {
    const { addItem } = useCart();
    const { getServicePrice, formatPrice, currencyCode, countryCode } = usePricing();

    const handleAddToCart = (e: React.MouseEvent, service: typeof servicesData[0]) => {
        e.preventDefault();
        e.stopPropagation();
        
        // If it has options, it might be better to direct them to the view details page
        if (service.options && service.options.length > 0) {
            const defaultOption = service.options[0];
            const optionPrice = getServicePrice(service.id, defaultOption.price, defaultOption.id);

            // we could either add default, or just let them go to details
            addItem({
                productId: service.id,
                title: service.title,
                price: optionPrice,
                quantity: 1,
                currencyCode,
                countryCode,
                optionId: defaultOption.id,
                optionName: defaultOption.name
            });
        } else {
            const basePrice = getServicePrice(service.id, service.basePrice);

            addItem({
                productId: service.id,
                title: service.title,
                price: basePrice,
                quantity: 1,
                currencyCode,
                countryCode
            });
        }
    };

    return (
        <div className="pt-20 md:pt-24 bg-brand-ivory min-h-screen">
            <SEO
                title="Branding & Graphic Design Services | Logo Design, Brand Identity | Branded By Winni"
                description="Professional branding and graphic design services in Ghana. Logo design, brand identity, marketing materials, and web design for beauty, fashion, food & skincare brands."
                url="/services"
            />
            {/* Header */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-16 md:mb-20 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto mt-6 md:mt-8 text-left bg-white p-6 md:p-10 rounded-2xl border border-brand-dark/10 shadow-sm"
                >


                    <p className="text-brand-dark text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                        Welcome! we are excited to work with you and help bring your vision to life. If you need any services not listed here, please email us at <a href="mailto:brandedbywinnistudio@gmail.com" className="text-brand-pink hover:underline font-medium">brandedbywinnistudio@gmail.com</a>. We're happy to accommodate your needs. <br/><span className="inline-block mt-2 font-medium bg-brand-pink/10 text-brand-pink px-2 py-1 rounded">Please note that all services are non-refundable.</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        <div>
                            <h3 className="font-serif text-xl text-brand-dark mb-4 pb-2 border-b border-brand-dark/10">Important Details</h3>
                            <ul className="space-y-4 text-brand-muted text-[15px]">
                                <li className="flex gap-2">
                                    <span className="text-brand-pink font-bold">•</span>
                                    <span><strong className="text-brand-dark">Information Submission:</strong> Must be provided within 24 hours via email.</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-serif text-xl text-brand-dark mb-4 pb-2 border-b border-brand-dark/10">How to Order</h3>
                            <ol className="space-y-3 text-brand-muted text-[15px] list-decimal list-inside ml-1">
                                <li>Add your chosen service to the cart.</li>
                                <li>Read the entire service page and fill out the checkout form.</li>
                                <li>Complete your payment securely.</li>
                                <li>An automatic email confirmation with your order number will be sent.</li>
                                <li>Email any additional information or specific assets to <a href="mailto:brandedbywinnistudio@gmail.com" className="text-brand-pink hover:underline">brandedbywinnistudio@gmail.com</a></li>
                            </ol>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-20 md:mb-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-16 gap-x-8 max-w-5xl mx-auto">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group flex flex-col h-full relative max-w-sm md:max-w-[320px] w-full mx-auto"
                        >
                            {/* Image Header */}
                            <div className="w-full aspect-square bg-brand-ivory overflow-hidden relative group/image mb-5 md:mb-6">
                                <img 
                                    src={service.imageUrl} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover" 
                                />
                                {/* Hover Overlay */}
                                <Link 
                                    to={`/services/${service.slug}`} 
                                    className="absolute inset-0 bg-white/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
                                >
                                    <span className="text-brand-dark font-medium uppercase tracking-widest text-xs bg-white px-6 py-3 rounded-full hover:bg-brand-dark hover:text-white transition-colors shadow-sm">
                                        Quick View
                                    </span>
                                </Link>
                            </div>
                            
                            {/* Card Content */}
                            <div className="flex flex-col flex-grow items-center text-center px-3 md:px-4 mb-6 md:mb-8">
                                <h3 className="text-[17px] text-brand-dark mb-2 font-medium tracking-wide">{service.title}</h3>
                                
                                <div className="mb-5 md:mb-6 flex-grow">
                                    <div className="text-[15px] text-brand-dark/80 font-normal">
                                        {formatPrice(getServicePrice(service.id, service.basePrice))}
                                    </div>
                                </div>

                                <button 
                                    onClick={(e) => handleAddToCart(e, service)}
                                    className="w-full sm:w-auto px-10 py-[10px] border border-brand-dark text-brand-dark text-sm uppercase tracking-widest rounded-full flex items-center justify-center hover:bg-brand-dark hover:text-white transition-colors font-medium bg-transparent"
                                >
                                    {service.options?.length ? 'Add Basic' : 'Add to Cart'}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Custom Project Section */}
            <div className="bg-brand-rose/30 py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-5 md:mb-6">Need Something Custom?</h2>
                        <p className="text-base md:text-lg text-brand-muted mb-8 md:mb-10">
                            Don't see exactly what you're looking for? We also offer fully customized solutions tailored specifically to your unique requirements.
                        </p>
                        <Link
                            to="/custom-quote"
                            className="inline-block w-full sm:w-auto px-10 md:px-12 py-3.5 md:py-4 bg-brand-pink text-white font-medium tracking-wide rounded-full hover:bg-brand-dark transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            Request a Custom Quote
                        </Link>
                    </motion.div>
                </div>
            </div>

            <FinalCTA />
        </div>
    );
};

export default ServicesPage;
