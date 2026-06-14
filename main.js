/* ============================================
   main.js — Momentos con Encanto
   Interactividad de la landing page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR scroll effect ──────────────────
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── 2. HAMBURGER / mobile menu ───────────────
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ── 3. SCROLL REVEAL animation ───────────────
  const revealEls = document.querySelectorAll(
    '.service-card, .testimonial-card, .gallery-item, ' +
    '.about-content, .about-visual, ' +
    '.contact-info, .contact-form-wrapper, .trust-logo, .stat-item'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger cards in grids
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('services-grid') ||
                   parent.classList.contains('testimonials-grid') ||
                   parent.classList.contains('trust-logos'))) {
      const siblings = Array.from(parent.children);
      const idx = siblings.indexOf(el) % 5;
      el.classList.add(`reveal-delay-${idx + 1}`);
    }
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── 4. COUNTER animation (stats) ─────────────
  const statNumbers = document.querySelectorAll('[data-target]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ── 5. CONTACT FORM ──────────────────────────
  const form        = document.getElementById('contact-form');
  const submitBtn   = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = 'hsl(0, 70%, 60%)';
          valid = false;
        }
      });

      // Email format check
      const emailField = document.getElementById('email');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.style.borderColor = 'hsl(0, 70%, 60%)';
        valid = false;
      }

      if (!valid) return;

      // Simulate sending
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando…';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar mensaje <span class="btn-arrow">→</span>';
        formSuccess.classList.add('show');

        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1200);
    });

    // Remove red border on input
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  // ── 6. SMOOTH SCROLL for anchor links ────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--navbar-h'), 10) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── 7. ACTIVE nav link highlight on scroll ───
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
        link.style.color = 'var(--color-primary)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── 8. HERO scroll indicator hide on scroll ──
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    const hideIndicator = () => {
      if (window.scrollY > 80) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    };
    window.addEventListener('scroll', hideIndicator, { passive: true });
  }

});
