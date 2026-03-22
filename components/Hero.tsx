import React from "react";
import { Link } from "react-router-dom";
import { useWebsiteContent } from "../hooks/useWebsiteContent";

const Hero: React.FC = () => {
  const { content } = useWebsiteContent();
  const heroData = content.hero;
  return (
    <section className="relative overflow-hidden bg-brand-ivory pt-20 md:pt-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(232,155,167,0.18),transparent_40%),radial-gradient(circle_at_82%_88%,rgba(232,155,167,0.14),transparent_42%)]" />
      {/* soft background accents */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#E8C7C8]/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#D9B6AE]/25 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-0 lg:min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:gap-12 md:px-10 md:py-12 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-16">
        {/* LEFT TEXT */}
        <div className="max-w-2xl pt-2 md:pt-8 lg:pt-0">
          <h1 className="text-[2.15rem] sm:text-4xl md:text-6xl lg:text-[4.8rem] font-sans font-black uppercase tracking-tight leading-[0.95] md:leading-[0.9] text-brand-dark mb-5 md:mb-6">
            {heroData.headline || 'EMPOWERING BRANDS'} <br className="hidden md:block"/>
            <span className="font-serif italic text-brand-pink lowercase font-medium tracking-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl block -mt-0.5 md:-mt-2">
              {heroData.subheadline || 'through creative solutions.'}
            </span>
          </h1>

          <div className="mt-6 h-px w-full max-w-xl bg-brand-dark/10" />

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-brand-muted sm:text-base md:text-lg">
            {heroData.description || 'Every memorable brand begins with one clear idea and a lot of heart. We help you tell that story the right way, shaping your voice into visuals, websites, and campaigns that feel true to your brand and make customers trust you from the first look.'}
          </p>

          <div className="mt-8 md:mt-10 flex flex-col gap-3.5 sm:flex-row sm:gap-4">
            <Link
              to="/services"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-brand-pink px-7 py-3.5 md:px-8 md:py-4 text-xs md:text-sm font-medium uppercase tracking-[0.18em] md:tracking-widest text-white shadow-lg shadow-brand-pink/20 transition-all duration-300 hover:bg-brand-dark hover:-translate-y-1"
            >
              {heroData.button1Text || 'View Services'}
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-brand-dark/20 bg-transparent px-7 py-3.5 md:px-8 md:py-4 text-xs md:text-sm font-medium uppercase tracking-[0.18em] md:tracking-widest text-brand-dark transition-all duration-300 hover:border-brand-dark hover:bg-brand-dark/5"
            >
              {heroData.button2Text || 'View Portfolio'}
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mt-4 md:mt-8 lg:mt-0">
          {/* decorative frame */}
          <div className="absolute -left-5 -top-5 hidden h-full w-full rounded-[2rem] border-2 border-brand-pink/20 lg:block" />

          <div className="relative overflow-hidden rounded-[2rem] bg-brand-shell shadow-2xl">
            <img
              src={heroData.heroImage || "/team-hero.png"}
              alt="Creative team collaborating on branding and design"
              className="h-[340px] w-full object-cover object-[center_30%] sm:h-[500px] lg:h-[660px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
