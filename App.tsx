import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Credentials from './components/Credentials';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-brand-text bg-brand-ivory selection:bg-brand-pink selection:text-white">
      <Navbar />
      <main className="w-full overflow-hidden">
        <Hero />
        <Credentials />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;