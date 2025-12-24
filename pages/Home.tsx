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

const Home: React.FC = () => {
    return (
        <>
            <SEO
                title="Web Design & SEO Services in Ghana"
                description="Branded by Winni is a Ghana-based web design studio delivering high-converting, SEO-optimized websites. We specialize in web design, local SEO Ghana, search optimization, and digital marketing for businesses in Accra and beyond."
                keywords={['web design ghana', 'seo services ghana', 'digital marketing accra', 'local seo', 'search optimization', 'ecommerce website design']}
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
