/**
 * SOUND DESIGN ENGINE (Web Audio API)
 * Lusion-inspired tactile, futuristic micro-interactions.
 * Zero external sound files needed; 100% synthesized in real time.
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isMuted = true; // Respect user by starting muted; user can toggle sound
  let ambientOsc = null;
  let ambientGain = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playHover() {
    if (isMuted || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1240, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  }

  function playClick() {
    if (isMuted || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, audioCtx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  }

  function playModeShift() {
    if (isMuted || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.16);

      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.18);
    } catch (e) {}
  }

  function toggleMute() {
    initAudio();
    isMuted = !isMuted;
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.classList.toggle('active', !isMuted);
      const textSpan = soundBtn.querySelector('.sound-btn-text');
      if (textSpan) {
        textSpan.textContent = isMuted ? 'SOUND: OFF' : 'SOUND: ON';
      }
    }
    if (!isMuted) {
      playModeShift();
    }
    return isMuted;
  }

  // Expose global sound controller
  window.SoundEngine = {
    init: initAudio,
    hover: playHover,
    click: playClick,
    modeShift: playModeShift,
    toggleMute: toggleMute,
    isMuted: () => isMuted
  };

  // Attach auto-listeners to buttons and links on click
  document.addEventListener('DOMContentLoaded', () => {
    const soundToggle = document.getElementById('sound-toggle-btn');
    if (soundToggle) {
      soundToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMute();
      });
    }

    document.querySelectorAll('a, button, .project-media-wrapper, .shader-preset-btn').forEach((el) => {
      el.addEventListener('mouseenter', () => playHover());
      el.addEventListener('click', () => playClick());
    });
  });
})();
