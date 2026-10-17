'use client';

import React from 'react';
import { ShaderPreset } from './ThreeCanvas';
import { useSoundFX } from '@/hooks/useSoundFX';

interface ShaderControlsProps {
  currentPreset: ShaderPreset;
  onSelectPreset: (preset: ShaderPreset) => void;
}

const PRESETS: { id: ShaderPreset; label: string }[] = [
  { id: 'liquid-chrome', label: 'Liquid Chrome' },
  { id: 'violet-neon', label: 'Violet Neon' },
  { id: 'obsidian', label: 'Obsidian' },
  { id: 'cyber-wire', label: 'Cyber Wire' },
];

export function ShaderControls({ currentPreset, onSelectPreset }: ShaderControlsProps) {
  const { playClick, playHover } = useSoundFX();

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 glass-panel px-4 py-2.5 rounded-full shadow-2xl border border-white/10">
      <span className="text-[10px] font-mono tracking-widest uppercase text-brand-silver/70 mr-1">
        3D Shader:
      </span>
      <div className="flex items-center gap-1.5">
        {PRESETS.map((p) => {
          const isActive = currentPreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                playClick();
                onSelectPreset(p.id);
              }}
              onMouseEnter={playHover}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-purple to-brand-magenta text-white shadow-lg shadow-brand-violet/30 scale-105'
                  : 'text-brand-silver/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
