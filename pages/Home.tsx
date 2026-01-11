import React from 'react';
import SEO from '../components/seo/SEO';
import Hero from '../components/Hero';
import WhyWebsite from '../components/WhyWebsite';
import Services from '../components/Services';
import Process from '../components/Process';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Results from '../components/Results';
import Tools from '../components/Tools';
import PromoPopup from '../components/PromoPopup';

const Home: React.FC = () => {
    return (
        <>
            <PromoPopup />
            <SEO
                title="Best Website Designer in Ghana | Web Design Services"
                description="Looking for the Best Web Designer in Ghana? Branded By Winni creates high-converting, SEO-optimized, and premium websites to grow your business in Accra."
                keywords={['Best Website Designer in Ghana', 'Best Web Designer in Ghana', 'Web Design Ghana', 'SEO Services Ghana', 'Digital Marketing Accra', 'Branding Agency Ghana']}
            />
            <Hero />
            <WhyWebsite />
            <Services />
            <Results />
            <Process />
            <Portfolio />
            <Testimonials />
            <Tools />
            <FAQ />
            <FinalCTA />
        </>
    );
};

export default Home;
