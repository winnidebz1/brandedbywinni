import React from 'react';
import Hero from '../components/Hero';
import Credentials from '../components/Credentials';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Credentials />
            <Testimonials />
            <FinalCTA />
        </>
    );
};

export default Home;
