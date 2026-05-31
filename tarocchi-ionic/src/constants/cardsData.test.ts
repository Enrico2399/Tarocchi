import { describe, expect, it } from 'vitest';
import { cards, getCardById, POSITIONS } from './cardsData';

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

  it('stores metadata only (no hardcoded interpretations)', () => {
    cards.forEach((card) => {
      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('name');
      expect(card).toHaveProperty('image');
      expect(card.keywords.length).toBeGreaterThan(0);
      expect(card).not.toHaveProperty('description');
      expect(card).not.toHaveProperty('description1');
    });
  });

  it('uses web asset paths for images', () => {
    cards.forEach((card) => {
      expect(card.image).toMatch(/^\/assets\/images\/.+\.(jpeg|jpg)$/);
    });
  });

  it('finds card by id', () => {
    expect(getCardById(0)?.name).toBe('Il Matto');
    expect(getCardById(99)).toBeUndefined();
  });
});
