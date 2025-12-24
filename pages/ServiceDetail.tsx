import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { Monitor, ShoppingCart, TrendingUp, MapPin, PenTool, Share2, BarChart, ArrowRight, CheckCircle } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';
import { motion } from 'framer-motion';

const servicesData = [
    {
        slug: "website-design-development",
        icon: <Monitor strokeWidth={1.5} />,
        title: "Website Design & Development",
        description: "Your website is your digital HQ. We build custom, mobile-responsive business websites and landing pages that capture attention and drive conversions. No cookie-cutter templates—just strategic design tailored to your brand goals. We ensure your site isn't just a pretty face, but a powerful engine for business growth.",
        whatYouGet: "A unique, high-performance website that elevates your brand and turns visitors into leads. Includes seamless navigation, fast load times, and a design that reflects your brand's personality.",
        components: ["Custom UI/UX Design", "Responsive & Mobile-First", "Lead Generation Forms", "Fast Loading Speed", "CMS Integration", "Security Best Practices"]
    },
    {
        slug: "ecommerce-website-design",
        icon: <ShoppingCart strokeWidth={1.5} />,
        title: "E-commerce Website Design",
        description: "Sell more online with a robust e-commerce store. We design online shops optimized for trust, speed, and seamless checkout experiences to maximize your sales. From product showcases to secure payment processing, we handle it all to help you scale your online business.",
        whatYouGet: "An automated sales machine that looks great and functions perfectly on all devices, giving your customers a frictionless shopping experience.",
        components: ["Secure Payment Gateways", "Product Inventory Management", "User-Friendly Checkout", "Sales Analytics Dashboard", "Customer Accounts", "Order Management System"]
    },
    {
        slug: "seo-services-ghana",
        icon: <TrendingUp strokeWidth={1.5} />,
        title: "SEO Services in Ghana",
        description: "Stop being invisible. We implement on-page, technical, and off-page SEO strategies to help you rank on Google for competitive keywords in Ghana and beyond. We focus on sustainable, white-hat techniques that build long-term authority and drive consistent organic traffic to your site.",
        whatYouGet: "Higher search engine rankings, increased organic traffic, and more qualified leads without paying for every click.",
        components: ["Keyword Research & Strategy", "On-Page Optimization", "Technical SEO Audits", "Link Building Support", "Competitor Analysis", "Rank Tracking"]
    },
    {
        slug: "local-seo-google-business",
        icon: <MapPin strokeWidth={1.5} />,
        title: "Local SEO & Google Business",
        description: "Dominate your local market. We optimize your Google Business Profile and local citations so customers in your area find you first on Maps and Search. Whether you're a restaurant, clinic, or service provider, we ensure you're the first choice for locals.",
        whatYouGet: "Enhanced local visibility and more foot traffic or calls from nearby customers who are ready to buy.",
        components: ["Google Maps Optimization", "Local Citation Building", "Review Management Strategy", "NAP Consistency", "Local Content Creation", "Google Business Profile Management"]
    },
    {
        slug: "content-strategy-copywriting",
        icon: <PenTool strokeWidth={1.5} />,
        title: "Content Strategy & Copywriting",
        description: "Content is king, but context is queen. We create and structure SEO-friendly copy that appeals to human readers while being fully optimized for search engines. We help you find your brand voice and communicate your value proposition clearly and persuasively.",
        whatYouGet: "Compelling content that ranks well, engages your audience, and positions you as an industry authority.",
        components: ["SEO Copywriting", "Search Optimization", "Blog Content Strategy", "Voice Search Readiness", "Brand Tone of Voice", "Website Copy Audits"]
    },
    {
        slug: "social-media-support",
        icon: <Share2 strokeWidth={1.5} />,
        title: "Social Media Support",
        description: "Extend your website's reach with consistent social media branding. We design campaign visuals and landing pages tailored for Ghanaian audiences on social platforms. We ensure your brand looks cohesive everywhere your customers interact with you.",
        whatYouGet: "A cohesive brand presence across web and social channels that engages your community and drives traffic back to your site.",
        components: ["Social Media Graphics", "Campaign Landing Pages", "Brand Consistency Check", "Engagement Strategy", "Content Calendar Planning", "Platform-Specific Designs"]
    },
    {
        slug: "analytics-reporting",
        icon: <BarChart strokeWidth={1.5} />,
        title: "Analytics & Reporting",
        description: "Don't fly blind. We provide clear, transparent reports on your traffic, rankings, leads, and conversions so you know exactly what's working. We believe in data-driven decisions that eliminate guesswork and maximize your ROI.",
        whatYouGet: "Actionable insights, raw data interpretation, and regular reports that show you the real impact of your digital investment.",
        components: ["Google Analytics Setup", "Search Console Monitoring", "Monthly Performance Reports", "Conversion Tracking", "User Behavior Analysis", "Custom Dashboards"]
    },
    {
        slug: "branding", /* Added to catch general branding requests */
        icon: <PenTool strokeWidth={1.5} />,
        title: "Branding & Identity",
        description: "Your brand is more than just a logo. It's the feeling people get when they interact with your business. We create memorable brand identities that resonate with your target audience and stand the test of time.",
        whatYouGet: "A complete visual identity system that distinguishes you from competitors and builds instant trust.",
        components: ["Logo Design", "Color Palette Development", "Typography Selection", "Brand Guidelines", "Visual Assets", "Rebranding Services"]
    }
];

const ServiceDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const service = servicesData.find(s => s.slug === slug);

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    return (
        <>
            <SEO
                title={`${service.title} | Services`}
                description={service.description}
                keywords={[service.title, 'web design ghana', 'digital marketing services', 'branded by winni']}
                url={`/services/${service.slug}`}
            />

            <div className="pt-24 min-h-screen bg-brand-ivory">
                {/* Hero Section */}
                <section className="relative px-6 md:px-12 py-12 md:py-20 overflow-hidden">
                    <div className="container mx-auto max-w-5xl">
                        <Link to="/services" className="inline-flex items-center text-brand-muted hover:text-brand-pink mb-8 transition-colors">
                            <ArrowRight className="rotate-180 mr-2 w-4 h-4" /> Back to Services
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink mb-6">
                                {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
                            </div>
                            <h1 className="font-serif text-4xl md:text-6xl text-brand-dark mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-lg md:text-xl text-brand-muted leading-relaxed max-w-3xl">
                                {service.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Details Section */}
                <section className="px-6 md:px-12 py-12 bg-white rounded-t-[3rem] shadow-sm">
                    <div className="container mx-auto max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                            {/* Left Column: What You Get */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-6">What You Get</h3>
                                <div className="p-8 bg-brand-ivory rounded-2xl border border-brand-pink/10">
                                    <p className="text-brand-dark text-lg md:text-xl leading-relaxed font-medium">
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
                                <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-6">Key Components</h3>
                                <ul className="space-y-4">
                                    {service.components.map((component, index) => (
                                        <li key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-brand-ivory/50 transition-colors">
                                            <div className="mt-1 text-brand-pink shrink-0">
                                                <CheckCircle size={20} />
                                            </div>
                                            <span className="text-brand-muted text-lg">{component}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-24 text-center">
                            <h3 className="text-3xl font-serif text-brand-dark mb-6">Ready to elevate your {service.title.toLowerCase()}?</h3>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSffhowT-hhYtbkTPll8hDwopZrNitJf9GqQchwEn6XTwSbMDg/viewform?usp=header"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-10 py-4 bg-brand-dark text-white rounded-full hover:bg-brand-pink transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                Start Your Project <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </section>

                <FinalCTA />
            </div>
        </>
    );
};

export default ServiceDetail;
