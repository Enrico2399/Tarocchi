import { describe, expect, it } from 'vitest';
import { cards } from '../constants/cardsData';
import { pickRandomCards } from './cardUtils';

describe('cardUtils', () => {
  it('returns requested number of cards', () => {
    const picked = pickRandomCards(cards, 4);
    expect(picked).toHaveLength(4);
  });

  it('returns unique cards', () => {
    const picked = pickRandomCards(cards, 4);
    const names = picked.map((c) => c.name);
    expect(new Set(names).size).toBe(4);
  });
});
