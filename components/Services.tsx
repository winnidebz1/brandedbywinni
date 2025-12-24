import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, TrendingUp, PenTool, ShoppingCart, MapPin, Share2, BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    slug: "website-design-development",
    icon: <Monitor strokeWidth={1.5} />,
    title: "Website Design & Development",
    description: "Your website is your digital HQ. We build custom, mobile-responsive business websites and landing pages that capture attention.",
    whatYouGet: "A unique, high-performance website that elevates your brand and turns visitors into leads.",
    components: ["Custom UI/UX Design", "Responsive & Mobile-First", "Lead Generation Forms", "Fast Loading Speed"]
  },
  {
    slug: "ecommerce-website-design",
    icon: <ShoppingCart strokeWidth={1.5} />,
    title: "E-commerce Website Design",
    description: "Sell more online with a robust e-commerce store. We design online shops optimized for trust, speed, and seamless checkout.",
    whatYouGet: "An automated sales machine that looks great and functions perfectly on all devices.",
    components: ["Secure Payment Gateways", "Product Inventory Management", "User-Friendly Checkout", "Sales Analytics Dashboard"]
  },
  {
    slug: "seo-services-ghana",
    icon: <TrendingUp strokeWidth={1.5} />,
    title: "SEO Services in Ghana",
    description: "Stop being invisible. We implement on-page, technical, and off-page SEO strategies to help you rank on Google for competitive keywords.",
    whatYouGet: "Higher search engine rankings, increased organic traffic, and more qualified leads.",
    components: ["Keyword Research & Strategy", "On-Page Optimization", "Technical SEO Audits", "Link Building Support"]
  },
  {
    slug: "local-seo-google-business",
    icon: <MapPin strokeWidth={1.5} />,
    title: "Local SEO & Google Business",
    description: "Dominate your local market. We optimize your Google Business Profile so customers in your area find you first on Maps and Search.",
    whatYouGet: "Enhanced local visibility and more foot traffic or calls from nearby customers.",
    components: ["Google Maps Optimization", "Local Citation Building", "Review Management Strategy", "NAP Consistency"]
  },
  {
    slug: "content-strategy-copywriting",
    icon: <PenTool strokeWidth={1.5} />,
    title: "Content Strategy & Copywriting",
    description: "Content is king. We create and structure SEO-friendly copy that appeals to human readers while being fully optimized for search.",
    whatYouGet: "Compelling content that ranks well and positions you as an industry authority.",
    components: ["SEO Copywriting", "Search Optimization", "Blog Content Strategy", "Voice Search Readiness"]
  },
  {
    slug: "social-media-support",
    icon: <Share2 strokeWidth={1.5} />,
    title: "Social Media Support",
    description: "Extend your website's reach with consistent social media branding. We design campaign visuals tailored for Ghanaian audiences.",
    whatYouGet: "A cohesive brand presence across web and social channels that engages your community.",
    components: ["Social Media Graphics", "Campaign Landing Pages", "Brand Consistency Check", "Engagement Strategy"]
  },
  {
    slug: "analytics-reporting",
    icon: <BarChart strokeWidth={1.5} />,
    title: "Analytics & Reporting",
    description: "Don't fly blind. We provide transparent reports on your traffic, rankings, and conversions so you know exactly what's working.",
    whatYouGet: "Actionable insights and data-backed recommendations to grow your business.",
    components: ["Google Analytics Setup", "Search Console Monitoring", "Monthly Performance Reports", "Conversion Tracking"]
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Our Expertise</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 items-start">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.slug}`}
              key={index}
              className="block h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group h-full p-4 md:p-8 border border-brand-dark/10 hover:border-brand-pink rounded-lg transition-all duration-500 hover:shadow-lg hover:shadow-brand-pink/5 flex flex-col items-center text-center bg-white cursor-pointer"
              >
                <div className="w-10 h-10 md:w-16 md:h-16 bg-brand-ivory text-brand-pink rounded-full flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:bg-brand-pink group-hover:text-white">
                  {React.cloneElement(service.icon as React.ReactElement, { size: undefined, className: "w-5 h-5 md:w-8 md:h-8" })}
                </div>
                <h3 className="font-serif text-sm md:text-2xl text-brand-dark group-hover:text-brand-pink transition-colors mb-2 md:mb-4 leading-tight">{service.title}</h3>

                <p className="text-brand-muted text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>

                <div className="mt-auto transition-opacity duration-300 transform">
                  <span className="flex items-center gap-2 text-sm text-brand-pink font-medium uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;