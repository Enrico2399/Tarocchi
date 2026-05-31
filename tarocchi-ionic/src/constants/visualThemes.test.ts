import { describe, expect, it, beforeEach } from 'vitest';
import {
  getStoredTableThemeId,
  setStoredTableThemeId,
  getStoredDeckThemeId,
  setStoredDeckThemeId,
  getTableTheme,
  getDeckTheme,
} from './visualThemes';

describe('visualThemes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to classic themes', () => {
    expect(getStoredTableThemeId()).toBe('classic');
    expect(getStoredDeckThemeId()).toBe('classic');
  });

  it('persists table and deck theme', () => {
    setStoredTableThemeId('night');
    setStoredDeckThemeId('fantasy');
    expect(getTableTheme().overlayClass).toBe('home-bg--night');
    expect(getDeckTheme().deckClass).toBe('memory-card--fantasy');
  });
});
