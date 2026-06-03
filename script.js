document.addEventListener('DOMContentLoaded', () => {
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

  revealOnScroll();
});
