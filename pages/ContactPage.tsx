import React, { useState } from 'react';
import SEO from '../components/seo/SEO';
import { Mail, Phone, MapPin, Instagram, Twitter } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { name, email, message } = formData;

        try {
            // Save to Supabase leads table for admin portal
            const { error: supabaseError } = await supabase
                .from('leads')
                .insert([{
                    name,
                    email,
                    message,
                    service: 'Contact Form',
                    status: 'new'
                }]);

            if (supabaseError) {
                console.error('Supabase error:', supabaseError);
            }

            // Submit to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: '6e8f7c4d-3b2a-4f1e-9d8c-5a6b7e8f9c0d',
                    name: name,
                    email: email,
                    message: message,
                    subject: `New Contact Form Submission from ${name}`,
                    from_name: 'Branded By Winni Website',
                    to_email: 'brandedbywinnistudio@gmail.com'
                }),
            });

            if (response.ok) {
                // Create WhatsApp message
                const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A%0A*Message:*%0A${message}`;

                // Open WhatsApp
                window.open(`https://wa.me/233202326851?text=${whatsappMessage}`, '_blank');

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });

                // Show success message
                alert('Thank you! Your message has been sent successfully. We will get back to you soon!');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Oops! Something went wrong. Please try again or contact us directly via WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-32 pb-20 bg-brand-ivory min-h-screen">
            <SEO
                title="Contact Us"
                description="Get in touch with Branded By Winni for your creative projects. We are ready to elevate your brand."
                url="/contact"
            />
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Get in Touch</h1>
                    <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                        Ready to elevate your brand? We'd love to hear from you. Fill out the form below or reach out directly.
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
                                    <a href="mailto:brandedbywinnistudio@gmail.com" className="text-lg text-brand-dark hover:text-brand-pink transition-colors">
                                        brandedbywinnistudio@gmail.com
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
                            <h4 className="text-sm uppercase tracking-wider text-brand-muted mb-6">Follow Us</h4>
                            <div className="flex gap-4">
                                <a href="https://instagram.com/brandedbywinni_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://tiktok.com/@brandedbywinnistudioo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                                    <TikTokIcon size={18} />
                                </a>
                                <a href="https://x.com/brandedbywinni" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                                    <Twitter size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-pink/10">
                        <h3 className="text-2xl font-serif text-brand-dark mb-8">Send a Message</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-brand-muted mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-brand-ivory border border-gray-200 rounded-lg focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all disabled:opacity-50"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-brand-muted mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-brand-ivory border border-gray-200 rounded-lg focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all disabled:opacity-50"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-brand-muted mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-brand-ivory border border-gray-200 rounded-lg focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all resize-none disabled:opacity-50"
                                    placeholder="Tell us about your project..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-8 py-4 bg-brand-pink text-white font-medium tracking-wide rounded-lg hover:bg-brand-pink-dark transition-all duration-300 shadow-lg shadow-brand-pink/20 hover:shadow-xl hover:shadow-brand-pink/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
