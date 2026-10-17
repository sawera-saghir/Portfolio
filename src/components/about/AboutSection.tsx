'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Terminal, Cpu, HeartHandshake, Sparkles } from 'lucide-react';

const TECH_STACK = [
  'Next.js 14 (App Router)',
  'TypeScript',
  'Tailwind CSS',
  'Three.js / WebGL',
  'React Three Fiber & Drei',
  'GSAP & ScrollTrigger',
  'Framer Motion',
  'Figma & Design Tokens',
  'React Hook Form & Zod',
  'Web Audio API',
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-purple" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-silver">
              Engineering &amp; Philosophy
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Design Built for Reality.{' '}
            <span className="gradient-text-accent">Code Crafted for Scale.</span>
          </h2>

          <p className="text-base sm:text-lg text-brand-silver/90 font-light leading-relaxed">
            I don&apos;t just deliver static Figma artboards and walk away. I am a product designer who writes production-grade frontend code, ensuring every micro-interaction, transition velocity, and typographic hierarchy survives the jump into production intact.
          </p>

          <p className="text-sm text-brand-silver/70 font-light leading-relaxed">
            From engineering interactive AI platforms for educators and modern developer academies to Canadian enterprise advisory and European automotive diagnostic ecosystems, my work centers on conversion psychology, accessible visual standards (WCAG 2.1 AA), and zero-layout-shift performance.
          </p>

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-3">
              <Award className="text-brand-magenta shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-sm font-semibold text-white">Award-Grade Craft</span>
                <span className="text-xs text-brand-silver/60">Distinctive aesthetics that avoid generic templates.</span>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-3">
              <Terminal className="text-brand-violet shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-sm font-semibold text-white">Modern Frontend Stack</span>
                <span className="text-xs text-brand-silver/60">Next.js App Router, TypeScript, and Tailwind CSS.</span>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-3">
              <Cpu className="text-brand-purple shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-sm font-semibold text-white">60 FPS 3D &amp; WebGL</span>
                <span className="text-xs text-brand-silver/60">GPU-accelerated organic fluids and physics shaders.</span>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-3">
              <HeartHandshake className="text-emerald-400 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-sm font-semibold text-white">Verified Client Success</span>
                <span className="text-xs text-brand-silver/60">Proven production track record with real global clients.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stack Card */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel-glow p-8 rounded-3xl border border-white/15 space-y-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-silver/70 flex items-center gap-2">
                <Sparkles size={14} className="text-brand-magenta" />
                Technical Weaponry
              </span>
              <span className="text-[11px] font-mono text-emerald-400">Production Ready</span>
            </div>

            <h3 className="text-xl font-display font-bold text-white">
              Curated Production Stack
            </h3>

            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-mono text-brand-silver hover:text-white hover:border-brand-violet/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-brand-silver/60 font-mono">Performance Score</span>
                <span className="font-mono text-emerald-400 font-bold">99 / 100</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-purple to-emerald-400 h-full w-[99%]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
