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

const Home: React.FC = () => {
    return (
        <>
            <SEO
                title="Home"
                description="Branded By Winni - Creative agency for branding, web design, and digital marketing."
                keywords={['branding', 'web design', 'creative agency', 'seo']}
            />
            <Hero />
            <WhyWebsite />
            <Services />
            <Process />
            <Portfolio />
            <Testimonials />
            <FAQ />
            <FinalCTA />
        </>
    );
};

export default Home;
