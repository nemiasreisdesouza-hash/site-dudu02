// ===== HEADER DINÂMICO NO SCROLL =====
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  nav.classList.toggle('open');
});

// Fecha menu ao clicar em link
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ===== SCROLL SUAVE COM OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const headerHeight = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== ANIMAÇÕES DE ENTRADA (IntersectionObserver) =====
const fadeEls = [
  '.hero-title', '.hero-sub', '.hero-ctas', '.hero-badges',
  '.about-text', '.about-visual',
  '.section-head',
  '.service-card', '.graphic-item', '.portfolio-item',
  '.cta-inner'
];
fadeEls.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
  });
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// ===== ANO NO FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== RASTREAMENTO SIMPLES DE CLIQUE WHATSAPP =====
document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (window.gtag) {
      gtag('event', 'click_whatsapp', {
        event_category: 'conversao',
        event_label: btn.textContent.trim().slice(0, 50)
      });
    }
  });
});
