/* ══════════════════════════════════════════════════════
   RAXISLAB — Shared JS v2
   Cursor · Reveal · Nav scroll · Mobile menu
══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Cursor personalizado ── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  if (cursor && cursorRing) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      cursor.style.left     = mx + 'px';
      cursor.style.top      = my + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '44px';
        cursor.style.height = '44px';
        cursor.style.opacity = '0.12';
        cursorRing.style.width  = '52px';
        cursorRing.style.height = '52px';
        cursorRing.style.borderColor = 'var(--accent)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '10px';
        cursor.style.height = '10px';
        cursor.style.opacity = '1';
        cursorRing.style.width  = '38px';
        cursorRing.style.height = '38px';
        cursorRing.style.borderColor = 'rgba(0,87,255,0.25)';
      });
    });
  }

  /* ── Reveal on scroll ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left');
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Nav scroll ── */
  const nav = document.querySelector('nav.sitenav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile toggle ── */
  const toggle  = document.querySelector('.sitenav-toggle');
  const mobileM = document.querySelector('.sitenav-mobile');
  if (toggle && mobileM) {
    toggle.addEventListener('click', () => {
      mobileM.classList.toggle('open');
      const isOpen = mobileM.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    mobileM.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileM.classList.remove('open'));
    });
  }

});
