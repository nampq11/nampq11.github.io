(function initThemeToggle() {
  const darkToggle = document.querySelector('.dark-toggle');

  function readStoredTheme() {
    try {
      return window.localStorage.getItem('theme');
    } catch (error) {
      console.warn('[theme] Unable to read persisted theme; continuing without persistence.', error);
      return null;
    }
  }

  function persistTheme(theme) {
    try {
      window.localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('[theme] Unable to persist theme; continuing with in-memory preference.', error);
    }
  }

  function isDarkMode() {
    return document.documentElement.classList.contains('dark-mode');
  }

  function syncDarkToggle() {
    if (!darkToggle) return;
    darkToggle.textContent = isDarkMode() ? '☀' : '☾';
  }

  function toggleTheme() {
    const shouldUseDarkMode = document.documentElement.classList.toggle('dark-mode');
    persistTheme(shouldUseDarkMode ? 'dark' : 'light');
    syncDarkToggle();
  }

  if (readStoredTheme() === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }

  darkToggle?.addEventListener('click', toggleTheme);
  syncDarkToggle();
})();
