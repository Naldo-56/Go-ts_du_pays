/* ═══════════════════════════════════════════════════════
   main.js — Initialisation DOM, navigation, animations
   ═══════════════════════════════════════════════════════ */

// Nav : effet scroll (fond semi-transparent)
window.addEventListener('scroll', () => {
  document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 60);
});

document.addEventListener('DOMContentLoaded', () => {
  // Menu hamburger mobile
  const hamburger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => links?.classList.toggle('open'));
  links?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );

  // Boutons toggle langue (nav + footer)
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Scroll reveal (IntersectionObserver)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Langue par défaut
  setLang('fr');
});
