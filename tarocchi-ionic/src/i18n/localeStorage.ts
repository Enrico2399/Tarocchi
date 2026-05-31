export const LOCALE_STORAGE_KEY = 'tarocchi-locale';

export type Locale = 'it' | 'en';

export function getStoredLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'en' || stored === 'it') {
    return stored;
  }

  const browser = navigator.language.toLowerCase();
  return browser.startsWith('en') ? 'en' : 'it';
}

export function setStoredLocale(locale: Locale): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}
