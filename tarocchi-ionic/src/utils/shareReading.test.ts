import { describe, expect, it } from 'vitest';
import { cards } from '../constants/cardsData';
import { formatReadingText } from './shareReading';

describe('formatReadingText', () => {
  it('returns empty string for no cards', () => {
    expect(formatReadingText([])).toBe('');
  });

  it('formats reading with positions and card names', () => {
    const text = formatReadingText(cards.slice(0, 2));
    expect(text).toContain('🔮 Lettura Tarocchi');
    expect(text).toContain('Situazione Attuale');
    expect(text).toContain('Il Matto');
    expect(text).toContain('Sfida da Affrontare');
    expect(text).toContain('Il Mago');
  });
});
