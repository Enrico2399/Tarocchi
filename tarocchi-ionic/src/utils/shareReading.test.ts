import { describe, expect, it } from 'vitest';
import { cards } from '../constants/cardsData';
import { formatReadingText } from './shareReading';

describe('formatReadingText', () => {
  it('returns empty string for no cards', () => {
    expect(formatReadingText([])).toBe('');
  });

  it('formats reading with positions and card names from JSON', () => {
    const text = formatReadingText(cards.slice(0, 2));
    expect(text).toContain('🔮 Lettura Tarocchi');
    expect(text).toContain('Situazione Attuale');
    expect(text).toContain('Il Matto');
    expect(text).toContain('Sfida da Affrontare');
    expect(text).toContain('Il Mago');
  });

  it('uses custom AI descriptions when provided', () => {
    const text = formatReadingText(cards.slice(0, 1), ['Messaggio AI personalizzato']);
    expect(text).toContain('Messaggio AI personalizzato');
    expect(text).not.toContain('Rappresenta un momento');
  });
});
