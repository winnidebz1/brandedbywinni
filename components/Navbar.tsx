import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-brand-ivory/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Area */}
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src="/logo.png" 
            alt="Branded By Winni Logo" 
            className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-brand-text hover:text-brand-pink transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bg-brand-pink after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-8 py-2 border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white transition-all duration-300 text-sm tracking-wide rounded-full font-medium"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-dark hover:text-brand-pink transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-ivory border-t border-gray-100 p-6 flex flex-col items-center gap-6 md:hidden shadow-lg animate-fade-in-down">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-serif text-brand-dark"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-3 border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white transition-all duration-300 rounded-full w-full text-center"
          >
            Let's Talk
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;