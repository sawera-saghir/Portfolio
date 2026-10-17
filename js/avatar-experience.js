/**
 * Interactive Sawera Avatar Engine
 * Full 60fps spring lerp eye and face tracking via cursor and arrow keys.
 * Pressing ArrowDown, ArrowUp, ArrowLeft, ArrowRight makes Sawera look in that direction.
 * Outer card size remains strictly fixed without any zooming, distortion, or shrinking.
 */

(function () {
  'use strict';

  let curRotX = 0;
  let curRotY = 0;
  let curTransX = 0;
  let curTransY = 0;

  let tgtRotX = 0;
  let tgtRotY = 0;
  let tgtTransX = 0;
  let tgtTransY = 0;

  let isKeyActive = false;
  let keyResetTimer = null;

  const heroAvatar = document.getElementById('sawera-static-avatar-mesh');
  const heroImg = document.getElementById('sawera-main-avatar-img');

  // Smooth 60fps Spring Animation Loop
  function updateAvatar() {
    const factor = isKeyActive ? 0.15 : 0.08;

    curRotX += (tgtRotX - curRotX) * factor;
    curRotY += (tgtRotY - curRotY) * factor;
    curTransX += (tgtTransX - curTransX) * factor;
    curTransY += (tgtTransY - curTransY) * factor;

    if (heroAvatar) {
      // Perspective tilt without card resizing
      heroAvatar.style.transform = `perspective(1200px) rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg)`;
    }

    if (heroImg) {
      // Direct gaze tracking on full-body character
      heroImg.style.transform = `translate3d(${curTransX.toFixed(2)}px, ${curTransY.toFixed(2)}px, 0) scale(1.02)`;
    }

    requestAnimationFrame(updateAvatar);
  }

  requestAnimationFrame(updateAvatar);

  // Mouse Move tracking for realistic gaze
  window.addEventListener('mousemove', function (e) {
    if (isKeyActive) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / centerX));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / centerY));

    tgtRotY = normX * 8;
    tgtRotX = -normY * 6;
    tgtTransX = normX * 10;
    tgtTransY = normY * 9;
  }, { passive: true });

  // Arrow Keys Navigation: Avatar looks smoothly in the pressed direction
  window.addEventListener('keydown', function (e) {
    const key = e.key;

    // Do not intercept if typing in an input or textarea
    if (['INPUT', 'TEXTAREA'].includes(e.target && e.target.tagName)) {
      return;
    }

    if (key === 'ArrowDown' || key === 's' || key === 'S') {
      e.preventDefault();
      isKeyActive = true;
      if (keyResetTimer) clearTimeout(keyResetTimer);
      tgtRotX = -8;
      tgtRotY = 0;
      tgtTransX = 0;
      tgtTransY = 20; // Look down
    } else if (key === 'ArrowUp' || key === 'w' || key === 'W') {
      e.preventDefault();
      isKeyActive = true;
      if (keyResetTimer) clearTimeout(keyResetTimer);
      tgtRotX = 8;
      tgtRotY = 0;
      tgtTransX = 0;
      tgtTransY = -20; // Look up
    } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
      e.preventDefault();
      isKeyActive = true;
      if (keyResetTimer) clearTimeout(keyResetTimer);
      tgtRotX = 0;
      tgtRotY = -10;
      tgtTransX = -20; // Look left
      tgtTransY = 0;
    } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
      e.preventDefault();
      isKeyActive = true;
      if (keyResetTimer) clearTimeout(keyResetTimer);
      tgtRotX = 0;
      tgtRotY = 10;
      tgtTransX = 20; // Look right
      tgtTransY = 0;
    }
  });

  window.addEventListener('keyup', function (e) {
    const key = e.key;
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 's', 'w', 'a', 'd', 'S', 'W', 'A', 'D'].includes(key)) {
      if (keyResetTimer) clearTimeout(keyResetTimer);
      // Keep gaze in the target direction for 500ms after release before resuming normal mouse tracking
      keyResetTimer = setTimeout(function () {
        isKeyActive = false;
      }, 500);
    }
  });
})();
