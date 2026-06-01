import { describe, expect, it } from 'vitest';
import {
  CARD_EXPAND_THRESHOLD,
  getTextLengthBucket,
  normalizeInterpretation,
  shouldShowReadMore,
  truncateInterpretation,
} from './interpretationText';

describe('interpretationText', () => {
  it('classifies length buckets', () => {
    expect(getTextLengthBucket('Breve testo.')).toBe('short');
    expect(getTextLengthBucket('x'.repeat(150))).toBe('medium');
    expect(getTextLengthBucket('x'.repeat(250))).toBe('long');
  });

  it('truncates at word boundary with ellipsis', () => {
    const long = 'Uno due tre quattro cinque sei sette otto nove dieci '.repeat(8);
    const result = truncateInterpretation(long, 80);
    expect(result.length).toBeLessThanOrEqual(81);
    expect(result.endsWith('…')).toBe(true);
    expect(result).not.toMatch(/\s…$/);
  });

  it('normalizes whitespace and caps length', () => {
    const result = normalizeInterpretation('  Prima   frase.   Seconda.  ');
    expect(result).toBe('Prima frase. Seconda.');
  });

  it('shows read more above threshold', () => {
    expect(shouldShowReadMore('x'.repeat(CARD_EXPAND_THRESHOLD))).toBe(false);
    expect(shouldShowReadMore('x'.repeat(CARD_EXPAND_THRESHOLD + 1))).toBe(true);
  });
});
