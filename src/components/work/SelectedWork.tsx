'use client';

import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { CaseStudyModal } from './CaseStudyModal';
import { PROJECTS_DATA } from '@/data/portfolio-data';
import { Project } from '@/types';

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-magenta" />
          <span className="text-xs font-mono uppercase tracking-widest text-brand-silver">
            Selected Work
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight">
          Crafted for Impact &amp; Usability.
        </h2>
        <p className="text-lg text-brand-silver/80 font-light leading-relaxed">
          A curated selection of genuine digital products, complex web applications, and enterprise design systems engineered from concept to launch.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpenCaseStudy={setActiveProject}
          />
        ))}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
