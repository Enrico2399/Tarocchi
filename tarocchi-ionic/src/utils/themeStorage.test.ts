import { describe, expect, it, beforeEach } from 'vitest';
import {
  applyTheme,
  getStoredTheme,
  setStoredTheme,
  THEME_STORAGE_KEY,
} from './themeStorage';

describe('themeStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('ion-palette-dark');
  });

  it('defaults to light theme', () => {
    expect(getStoredTheme()).toBe('light');
  });

  it('persists dark theme', () => {
    setStoredTheme('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(getStoredTheme()).toBe('dark');
  });

  it('applies dark class to document', () => {
    applyTheme('dark');
    expect(document.documentElement.classList.contains('ion-palette-dark')).toBe(true);
    applyTheme('light');
    expect(document.documentElement.classList.contains('ion-palette-dark')).toBe(false);
  });
});
