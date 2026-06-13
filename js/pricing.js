/* ============================================================
   RAXISLAB — js/pricing.js
   Lógica: toggle anual/mensual · calculadora en tiempo real
   ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────
     1. BILLING TOGGLE (Mensual / Anual -15%)
  ───────────────────────────────────────────────── */
  const toggle       = document.getElementById('billingToggle');
  const labelMonthly = document.getElementById('labelMonthly');
  const labelAnnual  = document.getElementById('labelAnnual');

  const PLANS = {
    basico:   { monthly: 450  },
    estandar: { monthly: 850  },
    premium:  { monthly: 1450 },
  };

  function formatPrice(n) {
    return n >= 1000 ? (n / 1000).toFixed(3).replace('.', '.') : String(n);
  }

  function updatePlanPrices(annual) {
    Object.entries(PLANS).forEach(([key, data]) => {
      const el = document.getElementById(`${key}-price`);
      if (!el) return;
      const price = annual ? Math.round(data.monthly * 0.85) : data.monthly;
      // Animate number
      animateValue(el, parseInt(el.textContent.replace('.','')) || 0, price, 400);
    });
    // Update period labels
    document.querySelectorAll('.pricing-period').forEach(el => {
      el.textContent = annual ? '/mes*' : '/mes';
    });
  }

  function animateValue(el, from, to, duration) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(from + (to - from) * eased);
      el.textContent = current >= 1000
        ? current.toLocaleString('es-ES')
        : String(current);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (toggle) {
    toggle.addEventListener('change', () => {
      const annual = toggle.checked;
      labelMonthly.classList.toggle('active', !annual);
      labelAnnual.classList.toggle('active', annual);
      updatePlanPrices(annual);
    });
  }

  /* ─────────────────────────────────────────────────
     2. CALCULADORA DE PRESUPUESTO EN TIEMPO REAL
  ───────────────────────────────────────────────── */
  const checkboxes    = document.querySelectorAll('.calc-option input[type="checkbox"]');
  const totalEl       = document.getElementById('calcTotal');
  const noteEl        = document.getElementById('calcNote');
  const listEl        = document.getElementById('calcServicesList');
  const compEl        = document.getElementById('calcComparison');
  const recommendEl   = document.getElementById('calcRecommendedPlan');
  const ctaEl         = document.getElementById('calcCTA');

  let prevTotal = 0;

  // Plan thresholds for recommendation
  const PLAN_THRESHOLDS = [
    { min: 0,    max: 600,  plan: 'Básico',   desc: 'Tu selección encaja con el plan Básico (€450/mes)', href: 'contact.html?plan=basico' },
    { min: 600,  max: 1100, plan: 'Estándar', desc: 'Tu selección se acerca al plan Estándar (€850/mes)', href: 'contact.html?plan=estandar' },
    { min: 1100, max: 9999, plan: 'Premium',  desc: 'Tu selección es de nivel Premium (€1.450/mes)', href: 'contact.html?plan=premium' },
  ];

  function getRecommendation(total) {
    return PLAN_THRESHOLDS.find(t => total >= t.min && total < t.max) || PLAN_THRESHOLDS[PLAN_THRESHOLDS.length - 1];
  }

  function updateCalc() {
    const selected = Array.from(checkboxes).filter(cb => cb.checked);
    const total    = selected.reduce((sum, cb) => sum + (parseInt(cb.dataset.price) || 0), 0);

    // Animate total
    if (totalEl) {
      totalEl.classList.add('animating');
      animateValue(totalEl, prevTotal, total, 350);
      setTimeout(() => totalEl.classList.remove('animating'), 400);
    }
    prevTotal = total;

    // Note
    if (noteEl) {
      noteEl.textContent = total === 0
        ? 'Selecciona servicios para calcular'
        : `Estimación orientativa · IVA no incluido`;
    }

    // Services list
    if (listEl) {
      if (selected.length === 0) {
        listEl.innerHTML = `
          <div class="calc-empty-state">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(0,200,255,0.3)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <p>Selecciona los servicios que necesitas y verás aquí el desglose del presupuesto.</p>
          </div>`;
      } else {
        listEl.innerHTML = selected.map(cb => `
          <div class="calc-service-line">
            <span class="calc-service-name">${cb.dataset.name || 'Servicio'}</span>
            <span class="calc-service-price">€${parseInt(cb.dataset.price).toLocaleString('es-ES')}</span>
          </div>`).join('');
      }
    }

    // Plan recommendation
    if (compEl && recommendEl) {
      if (total > 0) {
        const rec = getRecommendation(total);
        compEl.style.display = 'block';
        recommendEl.textContent = rec.desc;
        if (ctaEl) {
          ctaEl.href = rec.href + '&total=' + total;
        }
      } else {
        compEl.style.display = 'none';
      }
    }
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateCalc));

  /* ─────────────────────────────────────────────────
     3. SCROLL REVEAL (backup en caso que main.js no lo cubra)
  ───────────────────────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.revealDelay || 0;
        setTimeout(() => {
          e.target.classList.add('revealed');
        }, delay * 100);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

  /* ─────────────────────────────────────────────────
     4. NAVBAR SCROLL
  ───────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
  }

});
