import React from 'react';
import About from '../components/About';
import FinalCTA from '../components/FinalCTA';

const AboutPage: React.FC = () => {
    return (
        <div className="pt-20">
            <About />
            <FinalCTA />
        </div>
    );
};

export default AboutPage;
