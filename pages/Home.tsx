import React from 'react';
import Hero from '../components/Hero';
import Credentials from '../components/Credentials';
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
            <Hero />
            <Credentials />
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
