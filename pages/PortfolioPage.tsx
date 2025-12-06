import React from 'react';
import Portfolio from '../components/Portfolio';
import FinalCTA from '../components/FinalCTA';

const PortfolioPage: React.FC = () => {
    return (
        <div className="pt-20">
            <Portfolio />
            <FinalCTA />
        </div>
    );
};

export default PortfolioPage;
