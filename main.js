/* ============================================
   main.js — Momentos con Encanto
   Interactividad de la landing page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR scroll effect ──────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── 2. HAMBURGER / mobile menu ───────────────
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
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
  }

  // ── 3. SCROLL REVEAL animation ───────────────
  const revealEls = document.querySelectorAll(
    '.service-card, .testimonial-card, .gallery-item, ' +
    '.about-content, .about-visual, ' +
    '.contact-info, .contact-form-wrapper, .trust-logo, .stat-item'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
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

  // ── 5. CONTACT FORM → Email submission ─────
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-msg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre');
      const email = document.getElementById('email');
      const mensaje = document.getElementById('mensaje');

      let subject = encodeURIComponent('Consulta Web - Momentos con Encanto');
      let bodyText = `Hola,\n\nHas recibido una nueva consulta de la web:\n\nNombre: ${nombre?.value || ''}\nEmail: ${email?.value || ''}\nMensaje: ${mensaje?.value || ''}\n\nUn saludo.`;
      
      const mailtoUrl = `mailto:hola@momentosconencanto.es?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
      
      // Open mail app
      window.location.href = mailtoUrl;

      if (formStatus) {
        formStatus.style.display = 'block';
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
      form.reset();
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

  // ── 7. HERO scroll indicator hide on scroll ──
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

  // ── 8. COOKIE BANNER ─────────────────────────
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieReject = document.getElementById('cookie-reject');

  if (cookieBanner) {
    // Check if user already responded
    const cookieChoice = localStorage.getItem('mce_cookies');

    if (!cookieChoice) {
      // Show banner with a slight delay for animation
      setTimeout(() => {
        cookieBanner.classList.add('visible');
      }, 800);
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', () => {
        localStorage.setItem('mce_cookies', 'accepted');
        cookieBanner.classList.remove('visible');
        cookieBanner.classList.add('hidden');
      });
    }

    if (cookieReject) {
      cookieReject.addEventListener('click', () => {
        localStorage.setItem('mce_cookies', 'rejected');
        cookieBanner.classList.remove('visible');
        cookieBanner.classList.add('hidden');
      });
    }
  }

});
