export const THEME_STORAGE_KEY = 'tarocchi-theme';
export type ThemeMode = 'light' | 'dark';

export function getStoredTheme(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'dark' ? 'dark' : 'light';
}

export function setStoredTheme(theme: ThemeMode): void {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyTheme(theme: ThemeMode): void {
  document.documentElement.classList.toggle('ion-palette-dark', theme === 'dark');
}
