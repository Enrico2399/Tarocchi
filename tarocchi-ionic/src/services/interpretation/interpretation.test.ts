import { describe, expect, it, beforeEach } from 'vitest';
import { cards } from '../../constants/cardsData';
import { generateTemplateInterpretation } from './templateProvider';
import { getCachedInterpretation, setCachedInterpretation } from './cache';

describe('interpretation templateProvider', () => {
  it('generates dynamic text from keywords', () => {
    const text = generateTemplateInterpretation(cards[0], 'Situazione Attuale', '2026-05-27');
    expect(text.length).toBeGreaterThan(20);
    expect(text).toContain('Il Matto');
    expect(text).not.toContain('Rappresenta un momento');
  });

  it('generates daily arcana text', () => {
    const text = generateTemplateInterpretation(cards[1], 'Arcano del Giorno', '2026-05-27');
    expect(text).toContain('Il Mago');
  });
});

describe('interpretation cache', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves cached interpretations', () => {
    setCachedInterpretation(0, 'Situazione Attuale', 'reading', 'Testo cache');
    expect(getCachedInterpretation(0, 'Situazione Attuale', 'reading')).toBe('Testo cache');
  });
});
