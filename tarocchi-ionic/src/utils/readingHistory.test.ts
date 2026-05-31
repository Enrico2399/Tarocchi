import { describe, expect, it, beforeEach } from 'vitest';
import { cards } from '../constants/cardsData';
import {
  clearReadingHistory,
  getReadingHistory,
  saveReadingToHistory,
} from './readingHistory';

describe('readingHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and retrieves readings', () => {
    saveReadingToHistory(
      'four',
      cards.slice(0, 2),
      ['A', 'B'],
      ['Desc A', 'Desc B'],
      ['Card A', 'Card B'],
    );
    const history = getReadingHistory();
    expect(history).toHaveLength(1);
    expect(history[0].lines[0].cardName).toBe('Card A');
  });

  it('keeps at most 5 entries', () => {
    for (let i = 0; i < 7; i += 1) {
      saveReadingToHistory('single', [cards[0]], ['Msg'], [`D${i}`], ['Il Matto']);
    }
    expect(getReadingHistory()).toHaveLength(5);
  });

  it('clears history', () => {
    saveReadingToHistory('single', [cards[0]], ['Msg'], ['D'], ['Il Matto']);
    clearReadingHistory();
    expect(getReadingHistory()).toHaveLength(0);
  });
});
