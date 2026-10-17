'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Eye } from 'lucide-react';
import { Project } from '@/types';
import { useSoundFX } from '@/hooks/useSoundFX';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseStudy: (project: Project) => void;
}

export function ProjectCard({ project, index, onOpenCaseStudy }: ProjectCardProps) {
  const { playClick, playHover } = useSoundFX();
  const isEven = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 border-b border-white/10 last:border-b-0 ${
        isEven ? 'lg:grid-flow-dense' : ''
      }`}
    >
      {/* Project Editorial Info */}
      <div className={`space-y-6 lg:col-span-5 ${isEven ? 'lg:col-start-8' : ''}`}>
        {/* Meta Header */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-brand-silver/50 tracking-wider">
            {project.index}
          </span>
          {project.isClientWork && (
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-brand-magenta/15 text-brand-magenta border border-brand-magenta/30 shadow-sm">
              Client Work · Live
            </span>
          )}
          <span className="text-xs font-mono uppercase tracking-wider text-brand-silver/70">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
          {project.title}
        </h3>

        {/* Summary */}
        <p className="text-base text-brand-silver/80 leading-relaxed font-light">
          {project.summary}
        </p>

        {/* Role Box */}
        <div className="glass-panel p-4 rounded-xl border border-white/10">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-brand-silver/50 mb-1">
            Role &amp; Deliverables
          </span>
          <span className="text-sm font-medium text-white">
            {project.role}
          </span>
        </div>

        {/* Capability Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.capabilities.map((cap) => (
            <span
              key={cap}
              className="glass-pill px-3 py-1 rounded-full text-xs text-brand-silver/80"
            >
              {cap}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              playClick();
              onOpenCaseStudy(project);
            }}
            onMouseEnter={playHover}
            className="gradient-btn-primary px-5 py-2.5 rounded-full text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-brand-purple/20"
          >
            <span>View Full Case Study</span>
            <ArrowRight size={14} />
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="glass-panel px-4 py-2.5 rounded-full text-xs font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2 border border-white/15"
            >
              <span>Visit Live Site</span>
              <ExternalLink size={14} className="text-brand-silver" />
            </a>
          )}
        </div>
      </div>

      {/* Project Media Mockup */}
      <div
        className={`lg:col-span-7 ${isEven ? 'lg:col-start-1' : ''}`}
      >
        <div
          onClick={() => {
            playClick();
            onOpenCaseStudy(project);
          }}
          onMouseEnter={playHover}
          className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden glass-panel border border-white/10 cursor-pointer shadow-2xl transition-all duration-500 hover:border-brand-violet/40 hover:shadow-brand-violet/20"
        >
          <Image
            src={project.image}
            alt={`${project.title} Interface Presentation`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
          />

          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

          {/* Interactive Floating Pill */}
          <div className="absolute bottom-4 right-4 glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-white opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all shadow-xl">
            <Eye size={13} className="text-brand-magenta" />
            <span>Explore Case Study</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
