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
import PromoPopup from '../components/PromoPopup';

const Home: React.FC = () => {
    return (
        <>
            <PromoPopup />
            <SEO
                title="Premium Branding & Graphic Design Studio in Ghana | Branded By Winni"
                description="Leading branding and graphic design agency in Ghana. We create premium brand identities, logos, websites, and marketing materials for Food, Beauty, Fashion & Skincare brands."
                keywords={['Branding Agency Ghana', 'Graphic Design Ghana', 'Logo Design Accra', 'Brand Identity Design', 'Website Design Ghana', 'Digital Marketing Accra', 'Creative Agency Ghana', 'Visual Branding']}
            />
            <Hero />
            <WhyWebsite />
            <Services />
            <Results />
            <Process />
            <Portfolio />
            <Testimonials />
            <FAQ />
            <FinalCTA />
        </>
    );
};

export default Home;
