import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const metrics = [
  { value: '370+', label: 'Designs Delivered' },
  { value: '6+', label: 'Years Experience' },
  { value: '800+', label: 'Hours in Strategy' },
  { value: '250K+', label: 'Client Reach Impact' },
];

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#040405] px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(232,155,167,0.18),transparent_40%),radial-gradient(circle_at_82%_88%,rgba(232,155,167,0.14),transparent_42%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[42px] border border-brand-border/50 bg-brand-shell px-4 pb-16 pt-8 shadow-[0_35px_90px_rgba(0,0,0,0.24)] sm:px-8 lg:px-12"
        >
          <div className="pointer-events-none absolute -left-7 top-20 hidden h-20 w-20 burst-shape md:block" />
          <div className="pointer-events-none absolute -right-4 top-48 hidden h-16 w-16 burst-shape opacity-70 md:block" />

          <div className="mx-auto max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-center text-4xl font-sans font-black uppercase tracking-tight leading-none text-brand-charcoal sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Empowering Brands
              <br />
              <span className="font-serif italic text-brand-pink lowercase font-medium tracking-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                through creative solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-brand-text md:text-base"
            >
              Every memorable brand begins with one clear idea and a lot of heart. We help you tell that story
              the right way, shaping your voice into visuals, websites, and campaigns that feel true to your brand
              and make customers trust you from the first look.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative mx-auto mt-12 w-full max-w-[420px]"
            >
              <div className="absolute inset-x-6 top-8 h-[88%] rounded-[46%] bg-gradient-to-b from-brand-pink/18 via-brand-pink/8 to-transparent" />
              <div className="hero-swoosh absolute -left-8 bottom-28 hidden lg:block" />

              <img
                src="/hero-2.jpg"
                alt="Branded By Winni creative team"
                className="relative z-10 h-[430px] w-full rounded-[34px] object-cover object-center shadow-[0_22px_45px_rgba(17,18,22,0.24)]"
              />

              <div className="absolute -bottom-7 left-1/2 z-20 flex w-[95%] -translate-x-1/2 items-center gap-2 rounded-full border border-white/35 bg-[#17181C]/75 p-2 backdrop-blur-lg sm:gap-3">
                <Link
                  to="/contact"
                  className="flex-1 rounded-full bg-brand-pink px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dark sm:text-xs"
                >
                  Start Your Project
                </Link>
                <Link
                  to="/services"
                  className="flex-1 rounded-full border border-white/40 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/12 sm:text-xs"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mx-auto mt-8 max-w-6xl rounded-[30px] border border-white/15 bg-gradient-to-r from-white/12 to-white/6 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-7"
        >
          <div className="grid grid-cols-2 gap-6 text-white md:grid-cols-4 md:gap-8">
            {metrics.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-3xl font-semibold tracking-tight text-brand-pink sm:text-4xl">{item.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/75 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
