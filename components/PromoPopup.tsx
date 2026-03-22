import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';

const PromoPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup after a short delay
        const timer = setTimeout(() => {
            const hasSeenPromo = sessionStorage.getItem('hasSeenPromo');
            if (!hasSeenPromo) {
                setIsVisible(true);
            }
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenPromo', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 py-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={closePopup}
                    />

                    {/* Popup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
                    >
                        {/* Decorative background */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-brand-pink/10 -z-0"></div>
                        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-brand-pink/20 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-brand-dark/5 rounded-full blur-xl"></div>

                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-brand-dark z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-6 md:p-8 text-center relative z-10">
                            <div className="w-16 h-16 bg-brand-pink text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-pink/30 animate-bounce">
                                <Gift size={32} />
                            </div>

                            <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-2">
                                Special Offer!
                            </h3>
                            <p className="text-brand-muted text-base md:text-lg mb-6 leading-relaxed">
                                Get <span className="font-bold text-brand-pink">15% OFF</span> your website design project when you book with us this month.
                            </p>

                            <div className="space-y-3">
                                <a
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSffhowT-hhYtbkTPll8hDwopZrNitJf9GqQchwEn6XTwSbMDg/viewform?usp=header"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closePopup}
                                    className="block w-full py-4 bg-brand-dark text-white rounded-xl font-medium hover:bg-brand-pink transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                                >
                                    Claim My Discount
                                </a>
                                <button
                                    onClick={closePopup}
                                    className="block w-full py-3 text-brand-muted text-sm hover:text-brand-dark transition-colors"
                                >
                                    No thanks, I'll pay full price
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PromoPopup;
