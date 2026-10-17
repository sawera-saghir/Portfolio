'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Palette, Code, Check } from 'lucide-react';
import { SERVICES_DATA } from '@/data/portfolio-data';

export function ServicesSection() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'product-strategy':
        return <Layers className="text-brand-magenta" size={24} />;
      case 'ui-design-systems':
        return <Palette className="text-brand-violet" size={24} />;
      case 'creative-engineering':
        return <Code className="text-brand-purple" size={24} />;
      default:
        return <Layers size={24} />;
    }
  };

  return (
    <section id="services" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-violet" />
          <span className="text-xs font-mono uppercase tracking-widest text-brand-silver">
            Capabilities &amp; Offerings
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight">
          Specialized Digital Craft.
        </h2>
        <p className="text-lg text-brand-silver/80 font-light leading-relaxed">
          Transparent, result-oriented offerings designed to turn ambitious ideas into market-defining digital products.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group glass-panel p-8 rounded-3xl border border-white/10 hover:border-brand-violet/40 hover:shadow-2xl hover:shadow-brand-violet/10 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl glass-pill flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(service.id)}
                </div>
                <span className="font-mono text-xs text-brand-silver/40">
                  {service.number}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-brand-violet transition-colors">
                {service.title}
              </h3>

              <p className="text-xs font-mono text-brand-magenta mb-4">
                {service.tagline}
              </p>

              <p className="text-sm text-brand-silver/80 leading-relaxed mb-6 font-light">
                {service.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver/50 mb-3">
                Core Deliverables
              </span>
              <ul className="space-y-2">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-brand-silver">
                    <Check size={14} className="text-brand-violet shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
