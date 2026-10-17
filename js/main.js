/**
 * MAIN CLIENT COORDINATOR & SCROLL REVEALS
 * Handles intersection observer animations, dynamic content synchronization,
 * and high-fidelity interaction polish.
 */

(function () {
  'use strict';

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Staggered reveal observer
  function initScrollReveals() {
    if (prefersReducedMotion) return;

    const revealElements = document.querySelectorAll(
      '.project-item, .glass-card, .service-card, .trust-pillar-card, .step-card, .section-header'
    );

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 550ms cubic-bezier(0.16, 1, 0.3, 1), transform 550ms cubic-bezier(0.16, 1, 0.3, 1)';
      revealObserver.observe(el);
    });

    // Helper class style for revealed
    const style = document.createElement('style');
    style.textContent = `
      .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Smooth scroll offset for hash links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Dynamic Year in footer
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Welcome console stamp
  console.log(
    '%c SWERA %c UI/UX Designer & Web Developer %c\nCrafted with Semantic HTML5, Vanilla Modern CSS, and ES6+ Canvas.',
    'background: #5425D8; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #B52DFF; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 0 4px 4px 0;',
    'color: #C5C5D0; padding-top: 4px;'
  );

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveals();
  });
})();
