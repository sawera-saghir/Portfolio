'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDownRight, Sparkles, ExternalLink, Zap } from 'lucide-react';
import { METRICS_DATA } from '@/data/portfolio-data';
import { useSoundFX } from '@/hooks/useSoundFX';
import { InteractiveSaweraAvatar } from '@/components/avatar/InteractiveSaweraAvatar';

export function HeroSection() {
  const { playClick, playHover } = useSoundFX();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-6 overflow-hidden bg-noise">
      {/* Clean Atmospheric Luxury Radial Gradients (No heavy WebGL shader) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-purple/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-brand-magenta/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-violet/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Content Grid: Left Editorial Typography & Right Interactive Sawera Avatar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Hero Editorial & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Chip & Target Indicator */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-violet/40 shadow-lg shadow-brand-violet/10">
                <span className="text-[11px] font-mono font-semibold tracking-[0.25em] text-white uppercase">
                  HI, I&apos;M
                </span>
                <span className="text-brand-magenta font-mono text-xs">⌖</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-silver/75 hidden sm:inline">
                UI/UX Designer &amp; Creative Web Developer
              </span>
            </div>

            {/* Monumental Hero Headline */}
            <div className="space-y-2">
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-white leading-none select-none">
                SAWERA
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                Designing Digital{' '}
                <span className="gradient-text-accent">Experiences</span>{' '}
                That Captivate &amp; Convert.
              </h1>
            </div>

            {/* Editorial Subtitle */}
            <p className="text-base sm:text-lg text-brand-silver/90 max-w-2xl font-light leading-relaxed">
              Hi, I&apos;m <span className="text-white font-medium">Sawera Saghir</span>. I bridge human-centered UI/UX strategy with production-grade web engineering. Specializing in high-converting web applications, bespoke design systems, and engaging interactive experiences.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#work"
                onMouseEnter={playHover}
                onClick={playClick}
                className="gradient-btn-primary px-8 py-4 rounded-full text-sm font-semibold text-white flex items-center gap-2.5 shadow-xl shadow-brand-purple/30 group"
              >
                <span>Explore Selected Work</span>
                <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="#contact"
                onMouseEnter={playHover}
                onClick={playClick}
                className="glass-panel px-7 py-4 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 border border-white/15 flex items-center gap-2"
              >
                <span>Get In Touch</span>
                <ExternalLink size={14} className="text-brand-silver" />
              </Link>
            </div>

            {/* Bottom Quick Metrics Grid */}
            <div className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 glass-panel rounded-2xl border border-white/10 shadow-2xl">
                {METRICS_DATA.map((metric, i) => (
                  <div key={i} className="flex flex-col space-y-0.5 border-l border-white/10 pl-3 first:border-l-0">
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-white gradient-text-hero">
                      {metric.value}
                    </span>
                    <span className="text-xs font-semibold text-white/90">
                      {metric.label}
                    </span>
                    <span className="text-[10px] text-brand-silver/60">
                      {metric.subtext}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Sawera Avatar */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <InteractiveSaweraAvatar />
          </div>
        </div>
      </div>
    </section>
  );
}
