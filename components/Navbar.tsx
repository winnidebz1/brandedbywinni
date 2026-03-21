import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || location.pathname !== '/' ? 'bg-brand-shell/92 backdrop-blur-md py-4 border-b border-brand-border/60 shadow-[0_8px_30px_rgba(74,59,64,0.08)]' : 'bg-transparent py-7'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/Mainlogo.png"
            alt="Branded By Winni Logo"
            className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm uppercase tracking-[0.2em] transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bg-brand-pink after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'text-brand-pink after:w-full' : 'text-brand-text hover:text-brand-pink'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-brand-dark hover:text-brand-pink transition-colors"
          >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm border border-white">
                {itemCount}
              </span>
            )}
          </button>
          <Link
            to="/contact"
            className="px-7 py-2.5 border border-brand-pink text-brand-pink bg-brand-rose/35 hover:bg-brand-pink hover:text-white hover:-translate-y-0.5 text-sm tracking-wide rounded-full font-semibold shadow-sm ml-2"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-brand-dark hover:text-brand-pink transition-colors"
          >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm border border-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            className="text-brand-dark hover:text-brand-pink transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-shell border-t border-brand-border/60 p-6 flex flex-col items-center gap-6 md:hidden shadow-lg animate-fade-in-down">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-serif ${isActive ? 'text-brand-pink' : 'text-brand-dark'}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-3 border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white transition-all duration-300 rounded-full w-full text-center"
          >
            Let's Talk
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
