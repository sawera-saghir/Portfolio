'use client';

import React from 'react';
import { ArrowUp, Linkedin, Phone, Mail } from 'lucide-react';
import { useSoundFX } from '@/hooks/useSoundFX';

export function Footer() {
  const { playClick, playHover } = useSoundFX();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#0c090f] py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl text-white tracking-wider">SAWERA SAGHIR</span>
            <span className="text-brand-magenta text-lg font-bold">.</span>
          </div>
          <p className="text-xs text-brand-silver/60 font-light max-w-md">
            UI/UX Designer &amp; Creative Web Developer. Crafting digital products with precision, psychological depth, and high-performance code.
          </p>
        </div>

        {/* Verified Contact Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.linkedin.com/in/sawerasaghir/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-pill text-xs font-medium text-brand-silver hover:text-white hover:border-brand-violet transition-colors"
          >
            <Linkedin size={15} className="text-brand-violet" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://wa.me/923174804970"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Contact"
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-pill text-xs font-medium text-brand-silver hover:text-white hover:border-emerald-500/40 transition-colors"
          >
            <Phone size={14} className="text-emerald-400" />
            <span>+92 317 4804970</span>
          </a>

          <a
            href="mailto:sawerasaghir30@gmail.com"
            aria-label="Direct Email"
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-pill text-xs font-medium text-brand-silver hover:text-white hover:border-brand-magenta/40 transition-colors"
          >
            <Mail size={14} className="text-brand-magenta" />
            <span>sawerasaghir30@gmail.com</span>
          </a>
        </div>

        {/* Back to top & copyright */}
        <div className="flex items-center gap-6">
          <span className="text-xs font-mono text-brand-silver/50">
            &copy; {new Date().getFullYear()} Sawera Saghir.
          </span>

          <button
            onClick={scrollToTop}
            onMouseEnter={playHover}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-brand-silver hover:text-white hover:border-brand-magenta transition-all"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
