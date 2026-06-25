(function initRotatingRole() {
  const roleRotator = document.querySelector('[data-role-rotator]');
  if (!roleRotator) return;

  function readRoles() {
    const fallbackRoles = ['AI engineer', 'indie hacker', 'a stoic', 'a boyfriend'];

    try {
      const parsedRoles = JSON.parse(roleRotator.dataset.roles || '[]');
      const roles = parsedRoles.filter((role) => typeof role === 'string' && role.trim());
      return roles.length > 1 ? roles : fallbackRoles;
    } catch (error) {
      console.warn('[rotating-role] Unable to parse roles; using fallback roles.', error);
      return fallbackRoles;
    }
  }

  const roles = readRoles();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || roles.length < 2) return;

  let roleIndex = 0;

  window.setInterval(() => {
    roleRotator.classList.add('is-changing');

    window.setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleRotator.textContent = roles[roleIndex];
      roleRotator.classList.remove('is-changing');
    }, 180);
  }, 2200);
})();
