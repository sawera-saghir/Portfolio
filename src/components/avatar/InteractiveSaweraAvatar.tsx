'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface AvatarState {
  rotX: number;
  rotY: number;
  transX: number;
  transY: number;
  sheenX: number;
  sheenY: number;
}

export function InteractiveSaweraAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  // Physics animation values for 60fps spring lerp
  const currentRef = useRef<AvatarState>({
    rotX: 0,
    rotY: 0,
    transX: 0,
    transY: 0,
    sheenX: 50,
    sheenY: 50,
  });

  const targetRef = useRef<AvatarState>({
    rotX: 0,
    rotY: 0,
    transX: 0,
    transY: 0,
    sheenX: 50,
    sheenY: 50,
  });

  const isKeyActive = useRef(false);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafId = useRef<number | null>(null);

  // Smooth 60fps spring lerp loop for cursor and arrow-key tracking
  useEffect(() => {
    let isMounted = true;

    const animate = () => {
      if (!isMounted) return;

      const factor = isKeyActive.current ? 0.14 : 0.08;
      const cur = currentRef.current;
      const tgt = targetRef.current;

      cur.rotX += (tgt.rotX - cur.rotX) * factor;
      cur.rotY += (tgt.rotY - cur.rotY) * factor;
      cur.transX += (tgt.transX - cur.transX) * factor;
      cur.transY += (tgt.transY - cur.transY) * factor;
      cur.sheenX += (tgt.sheenX - cur.sheenX) * factor;
      cur.sheenY += (tgt.sheenY - cur.sheenY) * factor;

      const heroAvatar = meshRef.current || document.getElementById('sawera-hero-avatar-mesh');
      const heroAvatarImg = imgRef.current || document.getElementById('sawera-hero-avatar-img');

      if (heroAvatar) {
        // Subtle 3D perspective tilt without any frame distortion or scaling
        heroAvatar.style.transform = `perspective(1200px) rotateX(${cur.rotX.toFixed(2)}deg) rotateY(${cur.rotY.toFixed(2)}deg)`;
      }

      if (heroAvatarImg) {
        // Smooth gaze tracking on full-body character
        heroAvatarImg.style.transform = `translate3d(${cur.transX.toFixed(2)}px, ${cur.transY.toFixed(2)}px, 0px) scale(1.02)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Mouse cursor tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isKeyActive.current) return;

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
    }

    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

    targetRef.current = {
      rotY: normX * 6,
      rotX: -normY * 5,
      transX: normX * 12,
      transY: normY * 10,
      sheenX: 50 + normX * 25,
      sheenY: 50 + normY * 25,
    };
  }, []);

  // Keyboard Arrow Keys Directional Looking (Down, Up, Left, Right)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;

    // Do not intercept if typing in an input or textarea
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
      return;
    }

    if (key === 'ArrowDown' || key === 's' || key === 'S') {
      e.preventDefault();
      isKeyActive.current = true;
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      targetRef.current = {
        rotX: -6,
        rotY: 0,
        transX: 0,
        transY: 16,
        sheenX: 50,
        sheenY: 80,
      };
    } else if (key === 'ArrowUp' || key === 'w' || key === 'W') {
      e.preventDefault();
      isKeyActive.current = true;
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      targetRef.current = {
        rotX: 6,
        rotY: 0,
        transX: 0,
        transY: -16,
        sheenX: 50,
        sheenY: 20,
      };
    } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
      e.preventDefault();
      isKeyActive.current = true;
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      targetRef.current = {
        rotX: 0,
        rotY: -8,
        transX: -16,
        transY: 0,
        sheenX: 20,
        sheenY: 50,
      };
    } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
      e.preventDefault();
      isKeyActive.current = true;
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      targetRef.current = {
        rotX: 0,
        rotY: 8,
        transX: 16,
        transY: 0,
        sheenX: 80,
        sheenY: 50,
      };
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 's', 'w', 'a', 'd', 'S', 'W', 'A', 'D'].includes(key)) {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = setTimeout(() => {
        isKeyActive.current = false;
      }, 500);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleMouseMove, handleKeyDown, handleKeyUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[430px] h-[58vh] sm:h-[68vh] lg:h-[75vh] max-h-[710px] min-h-[460px] flex items-center justify-center select-none"
    >
      {/* Ambient Electric Violet & Magenta Character Backlight Aura */}
      <div className="absolute inset-x-8 top-10 bottom-14 bg-gradient-to-tr from-brand-purple/35 via-brand-magenta/20 to-brand-violet/15 rounded-full blur-3xl opacity-80 pointer-events-none" />

      {/* Ground Contact Shadow beneath sneakers */}
      <div className="absolute bottom-1 inset-x-12 h-7 bg-black/80 blur-md rounded-full pointer-events-none" />

      {/* Seamless Full-Body Character Presentation (Integrated into page, no card or box frame) */}
      <div
        ref={meshRef}
        id="sawera-hero-avatar-mesh"
        className="relative w-full h-full transition-transform duration-75 will-change-transform flex items-center justify-center pointer-events-none"
      >
        <div
          ref={imgRef}
          id="sawera-hero-avatar-img"
          className="relative w-full h-full transition-all duration-200 will-change-transform flex items-center justify-center"
        >
          <Image
            src="/assets/images/sawera-fullbody-avatar.png"
            alt="Sawera Saghir - 3D Full-Body Interactive Character with Sneakers"
            fill
            priority
            className="object-contain object-center filter brightness-[1.02] contrast-[1.03] p-1 pb-3"
            sizes="(max-width: 768px) 100vw, 430px"
          />
        </div>
      </div>
    </div>
  );
}
