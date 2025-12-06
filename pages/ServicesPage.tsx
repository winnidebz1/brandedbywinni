import React from 'react';
import Services from '../components/Services';
import FinalCTA from '../components/FinalCTA';

const ServicesPage: React.FC = () => {
    return (
        <div className="pt-20">
            <Services />
            <FinalCTA />
        </div>
    );
};

export default ServicesPage;
