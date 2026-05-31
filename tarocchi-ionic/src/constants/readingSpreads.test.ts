import { describe, expect, it, beforeEach } from 'vitest';
import {
  DEFAULT_SPREAD_ID,
  getSpreadById,
  getStoredSpreadId,
  setStoredSpreadId,
} from './readingSpreads';

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
});
