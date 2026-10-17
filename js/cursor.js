/**
 * MAGNETIC FLUID CURSOR
 * Lusion-grade custom pointer with trailing fluid ring and magnetic target attraction.
 */

(function () {
  'use strict';

  // Only enable on desktop pointer devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';

  const cursorRing = document.createElement('div');
  cursorRing.className = 'custom-cursor-ring';

  const cursorText = document.createElement('span');
  cursorText.className = 'custom-cursor-text';
  cursorRing.appendChild(cursorText);

  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovered = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  // Smooth lerp loop for the trailing fluid ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, [role="button"], .project-media-wrapper, #webgl-container');
    if (target) {
      cursorRing.classList.add('active');
      if (target.closest('.project-media-wrapper')) {
        cursorRing.classList.add('view-case');
        cursorText.textContent = 'EXPLORE';
      } else if (target.closest('#webgl-container')) {
        cursorRing.classList.add('drag-3d');
        cursorText.textContent = 'DRAG 3D';
      } else {
        cursorText.textContent = '';
      }
    } else {
      cursorRing.classList.remove('active', 'view-case', 'drag-3d');
      cursorText.textContent = '';
    }
  });

  document.addEventListener('mousedown', () => {
    cursorRing.classList.add('click');
  });

  document.addEventListener('mouseup', () => {
    cursorRing.classList.remove('click');
  });
})();
