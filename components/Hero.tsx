import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Hero Section - Premium Creative Agency Hero
 * 
 * CRITICAL: This component must render INSTANTLY with NO JavaScript delays
 * - No heavy animations on initial load
 * - Optimized images preloaded in index.html
 * - Clear value proposition
 * - Strong CTAs above the fold
 * 
 * Performance: <300ms to First Contentful Paint
 * Conversion: Dual CTA strategy (primary + secondary)
 */
const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 bg-gradient-to-br from-brand-ivory via-white to-brand-pink/5">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text Content - Left Side */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">

            {/* Headline - Benefit-Driven, Bold */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-brand-dark mb-6 font-semibold">
              We Build Brands That Look{' '}
              <span className="text-brand-pink italic">Premium</span>{' '}
              and Sell{' '}
              <span className="text-brand-pink italic">Confidently</span>
            </h1>

            {/* Sub-headline - Clear, Specific */}
            <p className="text-xl md:text-2xl text-brand-text max-w-2xl font-light leading-relaxed mb-10">
              Branding, visual identity, and creative strategy for bold businesses ready to stand out.
            </p>

            {/* Dual CTA Strategy */}
            <div className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto">
              {/* Primary CTA - Book Audit */}
              <a
                href="https://wa.me/233244591777?text=Hi!%20I'd%20like%20to%20book%20a%20free%20brand%20audit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-pink text-white font-medium text-lg rounded-md hover:bg-brand-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Book a Free Brand Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary CTA - View Work */}
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-brand-dark text-brand-dark font-medium text-lg rounded-md hover:bg-brand-dark hover:text-white transition-all duration-300 w-full sm:w-auto group"
              >
                View Our Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Indicator */}
            <div className="mt-10 flex items-center gap-2 text-brand-muted">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-brand-pink/20 border-2 border-white flex items-center justify-center text-brand-pink font-semibold text-sm">
                    ✓
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">
                <span className="text-brand-dark font-semibold">50+ brands</span> transformed in Ghana & beyond
              </p>
            </div>
          </div>

          {/* Visual - Right Side */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[600px]">
            {/* Decorative Elements - Minimal, Performance-Friendly */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main Visual Card */}
              <div className="relative w-full max-w-md">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl"></div>

                {/* Floating Cards - CSS Only, No Heavy Animation */}
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  {/* Card 1 - Brand Identity */}
                  <div className="bg-white p-6 rounded-xl shadow-xl border border-brand-pink/10 hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-12 h-12 bg-brand-pink/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-brand-dark mb-1">Brand Identity</h3>
                    <p className="text-sm text-brand-muted">Logo & Visual Systems</p>
                  </div>

                  {/* Card 2 - Social Media */}
                  <div className="bg-white p-6 rounded-xl shadow-xl border border-brand-pink/10 hover:shadow-2xl transition-shadow duration-300 mt-8">
                    <div className="w-12 h-12 bg-brand-pink/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-brand-dark mb-1">Social Media</h3>
                    <p className="text-sm text-brand-muted">Content That Converts</p>
                  </div>

                  {/* Card 3 - Web Design */}
                  <div className="bg-white p-6 rounded-xl shadow-xl border border-brand-pink/10 hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-12 h-12 bg-brand-pink/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-brand-dark mb-1">Web Design</h3>
                    <p className="text-sm text-brand-muted">Digital Experiences</p>
                  </div>

                  {/* Card 4 - Marketing */}
                  <div className="bg-white p-6 rounded-xl shadow-xl border border-brand-pink/10 hover:shadow-2xl transition-shadow duration-300 mt-8">
                    <div className="w-12 h-12 bg-brand-pink/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-brand-dark mb-1">Marketing</h3>
                    <p className="text-sm text-brand-muted">Flyers & Campaigns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Pattern Overlay - Performance Optimized */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNFODlCQTciIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4IDE5Ljk0IDAgMzYgMTYuMDYgMzYgMzZ2LTE4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 pointer-events-none"></div>
    </section>
  );
};

export default Hero;