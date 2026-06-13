/* ============================================================
   RAXISLAB — main.js
   Global: Nav, Reveal, Counter animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Navbar scroll behavior ──────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── 2. Mobile nav toggle ───────────────────────────────────
  const toggle   = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('navMobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── 2b. Nav Dropdown ──────────────────────────────────────
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.nav-dropdown-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
    }
    // Close when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
    });
    dropdown.addEventListener('click', (e) => e.stopPropagation());
  });

  // ── 3. Scroll Reveal ──────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ── 4. Counter Animation ──────────────────────────────────
  function animateCounter(el, target, duration = 1800) {
    const isFloat = target.toString().includes('.');
    let start = null;
    const startVal = 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (target - startVal) * ease;
      el.textContent = isFloat
        ? current.toFixed(1)
        : Math.round(current).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Observe counter elements
  const counterEls = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.dataset.count);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  // ── 5. Active Nav Link ─────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});
