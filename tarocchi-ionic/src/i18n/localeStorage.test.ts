import { describe, expect, it, beforeEach } from 'vitest';
import { getStoredLocale, setStoredLocale } from './localeStorage';
import { getTranslations } from './getTranslations';

describe('i18n', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to browser locale or italian', () => {
    const locale = getStoredLocale();
    expect(['it', 'en']).toContain(locale);
  });

  it('persists locale selection', () => {
    setStoredLocale('en');
    expect(getStoredLocale()).toBe('en');
    expect(getTranslations('en').appTitle).toBe('Tarot');
  });
});
