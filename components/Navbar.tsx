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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || location.pathname !== '/' ? 'bg-brand-shell/92 backdrop-blur-md py-3 md:py-4 border-b border-brand-border/60 shadow-[0_8px_30px_rgba(74,59,64,0.08)]' : 'bg-transparent py-4 md:py-7'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center gap-4">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/Mainlogo.png"
            alt="Branded By Winni Logo"
            className="h-10 sm:h-11 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
        <div className="md:hidden flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-3 py-2 rounded-full border border-brand-pink text-brand-pink bg-brand-rose/35 text-[11px] uppercase tracking-[0.12em] font-semibold"
          >
            Let's Talk
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full text-brand-dark hover:text-brand-pink hover:bg-brand-rose/30 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm border border-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            className="p-2.5 rounded-full text-brand-dark hover:text-brand-pink hover:bg-brand-rose/30 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            className="absolute inset-0 bg-brand-dark/45 backdrop-blur-[2px]"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu backdrop"
          />
          <div
            id="mobile-nav-drawer"
            className="absolute right-0 top-0 h-full w-[84%] max-w-xs bg-brand-shell border-l border-brand-border/70 shadow-2xl px-6 pt-6 pb-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">Menu</p>
              <button
                className="p-2 rounded-full text-brand-dark hover:text-brand-pink hover:bg-brand-rose/30 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-1 py-3 border-b border-brand-border/50 text-lg font-serif ${isActive ? 'text-brand-pink' : 'text-brand-dark'}`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto pt-8 space-y-3">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 rounded-full border border-brand-dark/15 text-brand-dark text-sm uppercase tracking-widest font-medium"
              >
                View Cart
              </button>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-8 py-3 border-2 border-brand-pink bg-brand-pink text-white text-sm uppercase tracking-widest rounded-full text-center font-semibold"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
