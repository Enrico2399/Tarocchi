import { describe, expect, it } from 'vitest';
import { cards } from '../constants/cardsData';
import { formatReadingText } from './shareReading';

describe('formatReadingText', () => {
  it('returns empty string for no cards', () => {
    expect(formatReadingText([])).toBe('');
  });

  it('formats reading with positions and card names', () => {
    const positions = ['Situazione Attuale', 'Sfida da Affrontare'];
    const text = formatReadingText(
      cards.slice(0, 2),
      ['Prima interpretazione', 'Seconda interpretazione'],
      positions,
    );
    expect(text).toContain('🔮 Lettura Tarocchi');
    expect(text).toContain('Situazione Attuale');
    expect(text).toContain('Il Matto');
    expect(text).toContain('Prima interpretazione');
    expect(text).toContain('Sfida da Affrontare');
    expect(text).toContain('Il Mago');
    expect(text).toContain('Seconda interpretazione');
  });

  it('uses custom AI descriptions when provided', () => {
    const text = formatReadingText(cards.slice(0, 1), ['Messaggio AI personalizzato']);
    expect(text).toContain('Messaggio AI personalizzato');
    expect(text).not.toContain('Rappresenta un momento');
  });
});
