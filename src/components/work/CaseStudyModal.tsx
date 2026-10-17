'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Project } from '@/types';
import { useSoundFX } from '@/hooks/useSoundFX';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const { playClick, playHover } = useSoundFX();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playClick();
              onClose();
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-3xl p-6 sm:p-8 md:p-10 border border-white/15 shadow-2xl z-10 text-white"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              onMouseEnter={playHover}
              aria-label="Close Case Study"
              className="absolute top-6 right-6 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-brand-silver hover:text-white hover:border-brand-magenta transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono uppercase text-brand-silver">
                {project.category}
              </span>
              <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-brand-silver">
                {project.year}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-purple/20 text-brand-violet border border-brand-purple/30">
                {project.role}
              </span>
              {project.isClientWork && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-magenta/15 text-brand-magenta border border-brand-magenta/30">
                  Client Work · Live
                </span>
              )}
            </div>

            {/* Title & Summary */}
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-brand-silver/90 leading-relaxed mb-8">
              {project.summary}
            </p>

            {/* Project Hero Media */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
              <Image
                src={project.image}
                alt={`${project.title} Interface Presentation`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Case Study Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Problem Statement */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-brand-magenta text-sm font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-brand-magenta" />
                  Client Context &amp; Problem
                </div>
                <p className="text-sm text-brand-silver/80 leading-relaxed">
                  <strong className="text-white">Context: </strong>
                  {project.caseStudy.clientContext}
                </p>
                <p className="text-sm text-brand-silver/80 leading-relaxed">
                  <strong className="text-white">Challenge: </strong>
                  {project.caseStudy.problem}
                </p>
              </div>

              {/* Research & UX */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-brand-violet text-sm font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-brand-violet" />
                  Research &amp; UX Decisions
                </div>
                <p className="text-sm text-brand-silver/80 leading-relaxed">
                  {project.caseStudy.researchUx}
                </p>
              </div>

              {/* Visual Design */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-brand-magenta text-sm font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-brand-magenta" />
                  Visual Design System
                </div>
                <p className="text-sm text-brand-silver/80 leading-relaxed">
                  {project.caseStudy.visualDesign}
                </p>
              </div>

              {/* Technical Execution */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-brand-violet text-sm font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-brand-violet" />
                  Engineering &amp; Implementation
                </div>
                <p className="text-sm text-brand-silver/80 leading-relaxed">
                  {project.caseStudy.development}
                </p>
              </div>
            </div>

            {/* Outcomes Section */}
            <div className="glass-panel p-6 rounded-2xl border border-brand-purple/30 bg-brand-purple/5 mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-magenta mb-4">
                Key Results &amp; Verified Outcomes
              </h3>
              <ul className="space-y-2.5">
                {project.caseStudy.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-brand-silver">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {project.capabilities.map((cap) => (
                  <span key={cap} className="glass-pill px-3 py-1 rounded-full text-xs text-brand-silver">
                    {cap}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="glass-panel px-5 py-2.5 rounded-full text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center gap-2 border border-white/20"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  className="gradient-btn-primary px-5 py-2.5 rounded-full text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-brand-purple/30"
                >
                  <span>Inquire About Similar Work</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
