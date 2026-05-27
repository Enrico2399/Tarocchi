import { describe, expect, it } from 'vitest';
import { cards } from '../constants/cardsData';
import { getArcanaForDate, getArcanaOfTheDay } from './arcanaUtils';

describe('arcanaUtils', () => {
  it('returns deterministic arcana for a given date', () => {
    const jan1 = getArcanaForDate(new Date(2026, 0, 1));
    const jan1Again = getArcanaForDate(new Date(2026, 0, 1));
    expect(jan1).toBe(jan1Again);
    expect(cards).toContain(jan1);
  });

  it('cycles through deck across the year', () => {
    const day0 = getArcanaForDate(new Date(2026, 0, 1));
    const day22 = getArcanaForDate(new Date(2026, 0, 23));
    expect(day22).toBe(day0);
  });

  it('getArcanaOfTheDay returns a valid card', () => {
    const arcana = getArcanaOfTheDay();
    expect(arcana.name).toBeTruthy();
    expect(cards).toContain(arcana);
  });
});
