import { describe, expect, it, beforeEach } from 'vitest';
import {
  DEFAULT_SPREAD_ID,
  getAllSpreads,
  getSpreadById,
  getStoredSpreadId,
  setStoredSpreadId,
  getCardDisplayName,
} from './readingSpreads';
import { cards } from './cardsData';

describe('readingSpreads', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to four-card spread', () => {
    expect(getStoredSpreadId()).toBe(DEFAULT_SPREAD_ID);
    expect(getSpreadById('four').cardCount).toBe(4);
  });

  it('persists spread selection', () => {
    setStoredSpreadId('three');
    expect(getStoredSpreadId()).toBe('three');
    expect(getSpreadById('three').positions).toHaveLength(3);
  });

  it('includes celtic cross with six cards', () => {
    expect(getSpreadById('celtic').cardCount).toBe(6);
  });

  it('localizes spread names in English', () => {
    const spread = getSpreadById('four', 'en');
    expect(spread.name).toBe('Classic Reading');
    expect(spread.positions[0]).toBe('Current Situation');
  });

  it('returns all spreads for locale', () => {
    expect(getAllSpreads('it')).toHaveLength(4);
  });

  it('localizes card display names', () => {
    expect(getCardDisplayName(cards[0], 'en')).toBe('The Fool');
    expect(getCardDisplayName(cards[0], 'it')).toBe('Il Matto');
  });
});
