import { describe, expect, it } from 'vitest';
import { cards, getDescriptionByIndex, POSITIONS } from './cardsData';

describe('cardsData', () => {
  it('has 22 major arcana', () => {
    expect(cards).toHaveLength(22);
  });

  it('defines 4 reading positions', () => {
    expect(POSITIONS).toEqual([
      'Situazione Attuale',
      'Sfida da Affrontare',
      'Azione Consigliata',
      'Esito',
    ]);
  });

  it('maps descriptions by position index', () => {
    const card = cards[0];
    expect(getDescriptionByIndex(card, 0)).toBe(card.description);
    expect(getDescriptionByIndex(card, 1)).toBe(card.description1);
    expect(getDescriptionByIndex(card, 2)).toBe(card.description2);
    expect(getDescriptionByIndex(card, 3)).toBe(card.description3);
    expect(getDescriptionByIndex(card, 99)).toBe(card.description);
  });

  it('uses web asset paths for images', () => {
    cards.forEach((card) => {
      expect(card.image).toMatch(/^\/assets\/images\/.+\.(jpeg|jpg)$/);
    });
  });
});
