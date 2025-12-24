import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, Phone } from 'lucide-react';

// Custom TikTok Icon since lucide-react might vary in availability
const TikTokIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-pink/10 pt-24 pb-12 px-6 md:px-12 border-t border-brand-pink/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl text-brand-dark mb-4">Branded By Winni</h3>
            <p className="inline-block bg-brand-pink text-white text-sm font-medium px-3 py-1 rounded-full mb-6 animate-pulse">
              🎉 15% discount for January bookings
            </p>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-brand-dark mb-2">Work Hours</h4>
              <p className="text-brand-muted text-sm font-light">Mondays - Fridays</p>
              <p className="text-brand-muted text-sm font-light">8am - 2pm (Session 1)</p>
              <p className="text-brand-muted text-sm font-light">7pm - 10pm (Session 2)</p>
              <p className="text-brand-pink text-sm font-medium mt-1">Closed on holidays</p>
            </div>

            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com/brandedbywinni_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://tiktok.com/@brandedbywinnistudioo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                <TikTokIcon size={18} />
              </a>
              <a href="https://x.com/brandedbywinni" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-pink/40 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-brand-dark mb-6 font-medium border-b border-brand-dark/20 pb-2 inline-block">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services/website-design-development" className="text-brand-text hover:text-brand-pink transition-colors font-light">Website Design</Link></li>
              <li><Link to="/services/ecommerce-website-design" className="text-brand-text hover:text-brand-pink transition-colors font-light">E-commerce</Link></li>
              <li><Link to="/services/seo-services-ghana" className="text-brand-text hover:text-brand-pink transition-colors font-light">SEO Services</Link></li>
              <li><Link to="/services/branding" className="text-brand-text hover:text-brand-pink transition-colors font-light">Branding</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-brand-dark mb-6 font-medium border-b border-brand-dark/20 pb-2 inline-block">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-brand-text font-light">
                <div className="w-8 h-8 rounded-full bg-brand-pink/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-brand-pink" />
                </div>
                <a href="mailto:brandedbywinnistudio@gmail.com" className="hover:text-brand-pink transition-colors text-sm">brandedbywinnistudio@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-brand-text font-light">
                <div className="w-8 h-8 rounded-full bg-brand-pink/10 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-brand-pink" />
                </div>
                <a href="tel:+233202326851" className="hover:text-brand-pink transition-colors text-sm">+233 202326851</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-dark/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-muted text-sm font-light">
            &copy; {new Date().getFullYear()} Branded By Winni. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-brand-muted">
            <Link to="/privacy" className="hover:text-brand-pink">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-pink">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;