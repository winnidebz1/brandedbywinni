import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';

const TikTokIcon = ({ size = 18, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const ContactPage: React.FC = () => {
    return (
        <div className="pt-32 pb-20 bg-brand-ivory min-h-screen">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Get in Touch</h1>
                    <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                        Ready to elevate your brand? I'd love to hear from you. Fill out the form below or reach out directly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-pink/10">
                        <h3 className="text-2xl font-serif text-brand-dark mb-8">Contact Information</h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-brand-muted mb-1">Email</h4>
                                    <a href="mailto:brandedbywinni@gmail.com" className="text-lg text-brand-dark hover:text-brand-pink transition-colors">
                                        brandedbywinni@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-brand-muted mb-1">Phone</h4>
                                    <a href="tel:+233202326851" className="text-lg text-brand-dark hover:text-brand-pink transition-colors">
                                        +233 202326851
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-brand-muted mb-1">Location</h4>
                                    <p className="text-lg text-brand-dark">
                                        Available Worldwide<br />
                                        Based in Ghana
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <h4 className="text-sm uppercase tracking-wider text-brand-muted mb-6">Follow Me</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                                    <Instagram size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                                    <TikTokIcon size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                                    <Twitter size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-pink/10">
                        <h3 className="text-2xl font-serif text-brand-dark mb-8">Send a Message</h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-brand-muted mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 bg-brand-ivory border border-gray-200 rounded-lg focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-brand-muted mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 bg-brand-ivory border border-gray-200 rounded-lg focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-brand-muted mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 bg-brand-ivory border border-gray-200 rounded-lg focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-brand-pink text-white font-medium tracking-wide rounded-lg hover:bg-brand-pink-dark transition-all duration-300 shadow-lg shadow-brand-pink/20 hover:shadow-xl hover:shadow-brand-pink/30 hover:-translate-y-1"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
