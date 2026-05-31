import { describe, expect, it, beforeEach } from 'vitest';
import { cards } from '../../constants/cardsData';
import { getDailyArcanaPositionLabel } from '../../constants/readingSpreads';
import { setStoredLocale } from '../../i18n/localeStorage';
import { generateTemplateInterpretation } from './templateProvider';
import { getCachedInterpretation, setCachedInterpretation } from './cache';

describe('interpretation templateProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    setStoredLocale('it');
  });

  it('generates dynamic text from keywords', () => {
    const text = generateTemplateInterpretation(cards[0], 'Situazione Attuale', '2026-05-27', 'it');
    expect(text.length).toBeGreaterThan(20);
    expect(text).toContain('Il Matto');
    expect(text).not.toContain('Rappresenta un momento');
  });

  it('generates daily arcana text', () => {
    const text = generateTemplateInterpretation(
      cards[1],
      getDailyArcanaPositionLabel('it'),
      '2026-05-27',
      'it',
    );
    expect(text).toContain('Il Mago');
  });

  it('generates English text when locale is en', () => {
    const text = generateTemplateInterpretation(cards[0], 'Current Situation', '2026-05-27', 'en');
    expect(text).toContain('The Fool');
  });
});

describe('interpretation cache', () => {
  beforeEach(() => {
    localStorage.clear();
    setStoredLocale('it');
  });

  it('stores and retrieves cached interpretations', () => {
    setCachedInterpretation(0, 'Situazione Attuale', 'reading', 'Testo cache');
    expect(getCachedInterpretation(0, 'Situazione Attuale', 'reading')).toBe('Testo cache');
  });
});
