'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomDarkSelectProps {
  label: string;
  required?: boolean;
  options: Option[];
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
}

export function CustomDarkSelect({
  label,
  required = false,
  options,
  value,
  placeholder = 'Select option',
  error,
  onChange,
}: CustomDarkSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      <label className="text-xs font-mono uppercase tracking-wider text-brand-silver/70 flex items-center justify-between">
        <span>
          {label} {required && <span className="text-brand-magenta">*</span>}
        </span>
      </label>

      {/* Select trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl glass-pill text-left flex items-center justify-between transition-all duration-200 border ${
          isOpen
            ? 'border-brand-violet ring-2 ring-brand-violet/20 bg-[#1A1424]'
            : 'border-white/10 hover:border-white/20 bg-[#140F1D]/80'
        } ${error ? 'border-rose-400' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`text-sm ${selectedOption ? 'text-white font-medium' : 'text-brand-silver/50'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-brand-silver transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-violet' : ''}`}
        />
      </button>

      {/* Dark luxury glass popover list */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#161120] border border-brand-violet/30 rounded-2xl shadow-2xl shadow-purple-950/80 backdrop-blur-2xl p-1.5 max-h-60 overflow-y-auto space-y-1 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-sm flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-purple/40 to-brand-violet/30 text-white font-medium border border-brand-violet/30'
                    : 'text-brand-silver/90 hover:text-white hover:bg-white/5'
                }`}
                role="option"
                aria-selected={isSelected}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} className="text-brand-violet shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}
    </div>
  );
}
