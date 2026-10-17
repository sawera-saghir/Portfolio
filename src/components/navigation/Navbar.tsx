'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { useSoundFX } from '@/hooks/useSoundFX';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playClick, playHover } = useSoundFX();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 glass-panel-glow border-b border-white/10'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onMouseEnter={soundEnabled ? playHover : undefined}
          onClick={soundEnabled ? playClick : undefined}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-magenta p-[1px] shadow-lg shadow-brand-violet/20 group-hover:shadow-brand-violet/50 transition-all duration-300">
            <div className="w-full h-full bg-background rounded-xl flex items-center justify-center font-display font-black text-lg text-white group-hover:scale-105 transition-transform">
              S
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-white tracking-wide text-sm group-hover:text-brand-violet transition-colors">
              SWERA
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-brand-silver/60">
              UI/UX &middot; Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-pill px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onMouseEnter={soundEnabled ? playHover : undefined}
              onClick={soundEnabled ? playClick : undefined}
              className="px-4 py-1.5 text-xs font-medium text-brand-silver hover:text-white rounded-full transition-all duration-200 hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA & Status */}
        <div className="hidden md:flex items-center gap-4">
          {/* Availability Status */}
          <div className="flex items-center gap-2 glass-pill px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-white/90">Available for Work</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playClick();
            }}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-brand-silver hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Contact Button */}
          <Link
            href="#contact"
            onMouseEnter={soundEnabled ? playHover : undefined}
            onClick={soundEnabled ? playClick : undefined}
            className="gradient-btn-primary px-5 py-2 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg shadow-brand-purple/25"
          >
            Let&apos;s Talk
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="#contact"
            className="gradient-btn-primary px-3.5 py-1.5 rounded-full text-xs font-semibold text-white"
          >
            Hire
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg glass-pill text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel-glow border-t border-white/10 px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (soundEnabled) playClick();
                }}
                className="px-4 py-2.5 text-sm font-medium text-brand-silver hover:text-white rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-brand-silver">Available for Projects</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
