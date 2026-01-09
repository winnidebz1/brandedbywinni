import React from 'react';
import SEO from '../components/seo/SEO';
import Hero from '../components/Hero';
import ServicesSnapshot from '../components/ServicesSnapshot';
import FeaturedWork from '../components/FeaturedWork';
import WhyBrandedByWinni from '../components/WhyBrandedByWinni';
import ClientTestimonials from '../components/ClientTestimonials';
import HowWeWork from '../components/HowWeWork';
import FinalCTA from '../components/FinalCTA';

/**
 * Home Page - High-Converting Creative Agency Homepage
 * 
 * Structure:
 * 1. Hero (Instant Load, No JS Delay)
 * 2. Services Snapshot (What We Do)
 * 3. Featured Work (Visual Portfolio)
 * 4. Why Branded By Winni (Trust Building)
 * 5. Client Testimonials (Social Proof)
 * 6. How We Work (Process)
 * 7. Final CTA (Conversion)
 * 
 * Performance: All components load instantly, no lazy loading on homepage
 * Conversion: Multiple CTAs throughout the page
 */
const Home: React.FC = () => {
    return (
        <>
            <SEO
                title="We Build Brands That Look Premium and Sell Confidently | Branded By Winni"
                description="Creative agency in Ghana specializing in brand identity, visual design, and digital branding for bold businesses. Transform your brand with our premium design services."
                keywords={[
                    'creative agency ghana',
                    'brand identity design',
                    'visual design ghana',
                    'branding services accra',
                    'social media design',
                    'web branding ghana',
                    'flyer design ghana',
                    'logo design accra'
                ]}
            />

            {/* Hero - Instant Load, Strong Value Prop */}
            <Hero />

            {/* Services Snapshot - What We Do */}
            <ServicesSnapshot />

            {/* Featured Work - Visual Portfolio */}
            <FeaturedWork />

            {/* Why Branded By Winni - Trust Building */}
            <WhyBrandedByWinni />

            {/* Client Testimonials - Social Proof with Faces/Logos */}
            <ClientTestimonials />

            {/* How We Work - Simple 3-Step Process */}
            <HowWeWork />

            {/* Final CTA - Conversion Focused */}
            <FinalCTA />
        </>
    );
};

export default Home;
