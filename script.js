document.getElementById('year').textContent = new Date().getFullYear();

const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' }
      );
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.world-card, .steps li, .manifesto-copy').forEach((node) => reveal.observe(node));

const themeToggle = document.getElementById('theme-toggle');
const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
  }
};
applyTheme(document.documentElement.dataset.theme || 'dark');
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem('revalsoftia-theme', next); } catch (_) {}
});
