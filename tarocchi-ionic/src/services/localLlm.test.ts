import { describe, expect, it } from 'vitest';
import { cards } from '../constants/cardsData';
import { getJsonArcanaDescription, getJsonDescriptions } from '../services/localLlm';

describe('localLlm JSON fallback', () => {
  it('returns JSON descriptions per position', () => {
    const picked = cards.slice(0, 4);
    const descriptions = getJsonDescriptions(picked);
    expect(descriptions).toHaveLength(4);
    expect(descriptions[0]).toContain('avventura');
    expect(descriptions[1]).toContain('sfida');
  });

  it('returns JSON arcana description', () => {
    expect(getJsonArcanaDescription(cards[0])).toBe(cards[0].description1);
  });
});
