
export function toggleTheme() {
  const themeToggle = document.querySelector('body');
  if (themeToggle.classList.contains('theme-dark')) {
    themeToggle.classList.remove('theme-dark');
    themeToggle.classList.add('theme-light');
    localStorage.setItem('theme', 'light');
  } else {
    themeToggle.classList.remove('theme-light');
    themeToggle.classList.add('theme-dark');
    localStorage.setItem('theme', 'dark');
  }
}
