document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll(
    '.service-row, .case-card, .metric-item, .cta-block'
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.style.transition = `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`;
      el.classList.add('revealed');
      io.unobserve(el);
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    io.observe(el);
  });

  /* ── NAV BORDER ON SCROLL ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 4 ? '#D8D8D4' : '#E4E4E0';
  }, { passive: true });

  /* ── ANIMATED COUNTERS ── */
  const metrics = document.querySelectorAll('.metric-number');

  const animateValue = (el, raw) => {
    const match = raw.replace(/[^0-9.]/g, '');
    const end = parseFloat(match);
    if (isNaN(end)) return;
    const isFloat = match.includes('.');
    const duration = 1200;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const val = easeOut(p) * end;
      const fmt = isFloat ? val.toFixed(1) : Math.round(val).toString();
      // Reinsere mantendo os spans de highlight
      el.innerHTML = el.innerHTML.replace(/[\d.]+/, fmt);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      animateValue(el, el.textContent);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });

  metrics.forEach(el => counterIO.observe(el));

  /* ── MOBILE MENU ── */
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.textContent = open ? '✕' : '☰';
    toggle.setAttribute('aria-expanded', open);
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', false);
    });
  });

});
