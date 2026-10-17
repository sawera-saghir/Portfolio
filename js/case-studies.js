/**
 * CASE STUDY MODAL & INTERACTIVE STORYTELLING ENGINE
 * Powers deep project case study views with full storytelling framework.
 * Fully keyboard accessible (Escape to close, focus trapped), responsive.
 */

(function () {
  'use strict';

  const modalOverlay = document.getElementById('case-study-modal');
  const modalContainer = document.getElementById('modal-content-container');
  const modalBody = document.getElementById('modal-dynamic-body');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay || !modalBody) return;

  let lastFocusedElement = null;

  function openCaseStudy(projectId) {
    if (!window.PORTFOLIO_DATA || !window.PORTFOLIO_DATA.projects) return;

    const project = window.PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
    if (!project) return;

    lastFocusedElement = document.activeElement;

    // Build the rich editorial case study content
    const cs = project.caseStudy;
    const capabilitiesHtml = project.capabilities
      .map((cap) => `<span class="badge-chip">${cap}</span>`)
      .join('');

    const outcomesHtml = cs.outcomes
      .map(
        (outcome) => `
        <li class="outcome-point">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${outcome}</span>
        </li>`
      )
      .join('');

    modalBody.innerHTML = `
      <div class="case-study-hero">
        <div class="case-study-meta-bar">
          <span class="badge-chip neutral">${project.category}</span>
          <span class="badge-chip neutral">${project.year}</span>
          <span class="badge-chip">${project.role}</span>
        </div>
        <h2 class="case-study-title">${project.title}</h2>
        <p class="case-study-lead">${project.summary}</p>
      </div>

      <div class="case-study-img-frame">
        <img src="${project.image}" alt="${project.title} Interface Presentation" class="project-media-img" loading="lazy" />
      </div>

      <div class="case-study-grid-sections">
        <div class="case-study-block glass-card">
          <h4>Client Context & Problem</h4>
          <p><strong>Context:</strong> ${cs.clientContext}</p>
          <p style="margin-top: 10px;"><strong>Core Challenge:</strong> ${cs.problem}</p>
        </div>

        <div class="case-study-block glass-card">
          <h4>Research & UX Considerations</h4>
          <p>${cs.researchUx}</p>
        </div>

        <div class="case-study-block glass-card">
          <h4>Visual Design Direction</h4>
          <p>${cs.visualDesign}</p>
        </div>

        <div class="case-study-block glass-card">
          <h4>Development & Implementation</h4>
          <p>${cs.development}</p>
        </div>
      </div>

      <div class="case-study-outcomes">
        <h4>Key Results & Verified Outcomes</h4>
        <ul class="outcomes-list">
          ${outcomesHtml}
        </ul>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--border-subtle);">
        <div class="project-capabilities" style="flex: 1;">
          ${capabilitiesHtml}
        </div>
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          ${project.liveUrl && project.liveUrl !== '#' ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              Visit Live Website
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ` : ''}
          <a href="#contact" class="btn btn-primary" onclick="window.closeCaseStudyModal();">
            Inquire About Similar Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `;

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Set focus to close button
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Expose to window for global trigger
  window.openCaseStudyModal = openCaseStudy;
  window.closeCaseStudyModal = closeModal;

  // Listeners
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Attach event listeners to all project triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-case-study-id]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-case-study-id');
      openCaseStudy(id);
    }
  });
})();
