/**
 * CONTACT FORM VALIDATION & DIRECT EMAIL TRANSMISSION
 * Transparently formats project inquiries and bridges client-side input
 * with verified direct email communication without fake backend pretenses.
 */

(function () {
  'use strict';

  const form = document.getElementById('project-inquiry-form');
  const statusAlert = document.getElementById('form-status-alert');
  if (!form || !statusAlert) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(field) {
    const group = field.closest('.form-group');
    if (!group) return true;

    const errorMsg = group.querySelector('.field-error-message');
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'This field is required.';
    } else if (field.type === 'email' && value && !emailRegex.test(value)) {
      isValid = false;
      message = 'Please enter a valid email address.';
    } else if (field.id === 'contact-message' && value && value.length < 10) {
      isValid = false;
      message = 'Please provide at least 10 characters describing your project.';
    }

    if (!isValid) {
      group.classList.add('has-error');
      if (errorMsg) errorMsg.textContent = message;
    } else {
      group.classList.remove('has-error');
      if (errorMsg) errorMsg.textContent = '';
    }

    return isValid;
  }

  // Real-time blur validation
  const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
  inputs.forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group').classList.contains('has-error')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check honeypot for spam bots
    const honeypot = form.querySelector('input[name="bot_field"]');
    if (honeypot && honeypot.value) {
      console.warn('Spam detected via honeypot.');
      return;
    }

    let isFormValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      statusAlert.className = 'form-status-alert error';
      statusAlert.textContent = 'Please review the highlighted fields above.';
      statusAlert.style.display = 'block';
      return;
    }

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const projectType = form.querySelector('#contact-type').value;
    const budget = form.querySelector('#contact-budget').value || 'Flexible / To be discussed';
    const message = form.querySelector('#contact-message').value.trim();

    const recipientEmail = window.PORTFOLIO_DATA?.profile?.email || 'swera.design@example.com';
    const subject = encodeURIComponent(`Project Inquiry: ${projectType} — ${name}`);
    const body = encodeURIComponent(
      `Hi Swera,\n\n` +
      `I would like to discuss a project with you.\n\n` +
      `— Sender Name: ${name}\n` +
      `— Sender Email: ${email}\n` +
      `— Project Type: ${projectType}\n` +
      `— Estimated Budget: ${budget}\n\n` +
      `— Project Details:\n${message}\n\n` +
      `Best regards,\n${name}`
    );

    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Prompt user transparently and trigger mail client
    statusAlert.className = 'form-status-alert success';
    statusAlert.innerHTML = `
      <strong>Inquiry prepared!</strong> Launching your email client...<br>
      If your client did not open automatically, <a href="${mailtoUrl}" style="text-decoration: underline; color: #fff; font-weight: 600;">click here to send directly to ${recipientEmail}</a>.
    `;
    statusAlert.style.display = 'block';

    // Trigger mailto link
    window.location.href = mailtoUrl;
  });
})();
