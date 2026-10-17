/**
 * CANVAS HERO SHADER & INTERACTIVE PARTICLE SYSTEM
 * Creates an organic, immersive, Lusion-inspired ambient mesh aura.
 * Responsive, hardware-accelerated, lightweight (no heavy three.js dependency),
 * and respects prefers-reduced-motion and tab visibility.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let isVisible = true;

  // Particle simulation parameters
  const particles = [];
  const maxDistance = 160;
  const mouse = {
    x: null,
    y: null,
    radius: 180,
    targetX: null,
    targetY: null
  };

  // Brand Color Palette for luminous particles
  const colors = [
    'rgba(84, 37, 216, ',   // Royal Purple
    'rgba(181, 45, 255, ',  // Electric Violet
    'rgba(240, 68, 197, ',  // Magenta
    'rgba(197, 197, 208, '  // Silver
  ];

  class Particle {
    constructor() {
      this.reset();
      // Distribute initially across screen
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2.2 + 0.8;
      this.baseRadius = this.radius;

      // Restrained fluid velocity
      const speed = Math.random() * 0.45 + 0.15;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.25;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      if (prefersReducedMotion) return;

      this.pulsePhase += this.pulseSpeed;
      const currentAlpha = this.alpha + Math.sin(this.pulsePhase) * 0.15;

      this.x += this.vx;
      this.y += this.vy;

      // Wrap around bounds softly
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;

      // Interactive mouse attraction & deflection
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.04;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
          this.radius = this.baseRadius * 1.5;
        } else {
          this.radius = this.baseRadius;
        }
      }

      // Drag / friction to maintain calm ambient speed
      this.vx *= 0.985;
      this.vy *= 0.985;
    }

    draw() {
      const alpha = Math.max(0.1, Math.min(0.85, this.alpha + Math.sin(this.pulsePhase) * 0.12));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.colorBase + alpha + ')';
      ctx.fill();

      // Soft glow aura on prominent particles
      if (this.radius > 2.0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = this.colorBase + (alpha * 0.25) + ')';
        ctx.fill();
      }
    }
  }

  function resize() {
    const parent = canvas.parentElement;
    width = parent ? parent.clientWidth : window.innerWidth;
    height = parent ? parent.clientHeight : window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Set particle density according to screen size
    const targetCount = width < 768 ? 40 : 80;
    particles.length = 0;
    for (let i = 0; i < targetCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const proximityAlpha = (1 - dist / maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(181, 45, 255, ${proximityAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function render() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    if (mouse.targetX !== null) {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
    }

    // Connect mesh lines
    connectParticles();

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  // Event Listeners for interactive pointer
  window.addEventListener('resize', resize, { passive: true });

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouse.targetX = null;
      mouse.targetY = null;
      mouse.x = null;
      mouse.y = null;
    });

    heroSection.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', () => {
      mouse.targetX = null;
      mouse.targetY = null;
      mouse.x = null;
      mouse.y = null;
    });
  }

  // Pause simulation when hero is out of viewport to save battery & CPU
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !prefersReducedMotion && !animationFrameId) {
        render();
      } else if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
  }, { threshold: 0.1 });

  if (heroSection) {
    observer.observe(heroSection);
  }

  // Handle tab visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isVisible = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    } else {
      isVisible = true;
      if (!prefersReducedMotion) {
        render();
      }
    }
  });

  // Initialize
  resize();
  render();
})();
