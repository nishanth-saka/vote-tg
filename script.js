document.addEventListener('DOMContentLoaded', async () => {
  const langSwitcher = document.getElementById('lang-switcher');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealTargets = document.querySelectorAll('.hero-copy, .hero-visual, .info-card, .step-item, .resource-card, .section-heading');

  const revealOnScroll = () => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (prefersReducedMotion) {
            entry.target.classList.add('is-visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
          } else {
            entry.target.classList.add('is-visible');
          }

          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((target) => observer.observe(target));
  };

  const getValue = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

  const applyLanguage = (lang) => {
    const messages = content?.[lang] || content?.en || {};

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const value = getValue(messages, key);
      if (typeof value === 'string') {
        element.textContent = value;
      }
    });

    if (langSwitcher) {
      langSwitcher.value = lang;
    }

    localStorage.setItem('vote-tg-lang', lang);
  };

  let content = null;

  try {
    content = await fetch('content.json').then((response) => response.json());
  } catch (error) {
    console.warn('Could not load translations:', error);
  }

  const savedLang = localStorage.getItem('vote-tg-lang') || 'en';
  applyLanguage(savedLang);

  langSwitcher?.addEventListener('change', (event) => {
    applyLanguage(event.target.value);
  });

  revealOnScroll();
});
