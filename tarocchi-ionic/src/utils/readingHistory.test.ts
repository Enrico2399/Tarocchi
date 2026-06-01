import { describe, expect, it, beforeEach } from 'vitest';
import { cards } from '../constants/cardsData';
import {
  clearReadingHistory,
  deleteReadingEntry,
  getReadingHistory,
  MAX_HISTORY,
  saveReadingToHistory,
  updateReadingNote,
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

  it(`keeps at most ${MAX_HISTORY} entries`, () => {
    for (let i = 0; i < MAX_HISTORY + 2; i += 1) {
      saveReadingToHistory('single', [cards[0]], ['Msg'], [`D${i}`], ['Il Matto']);
    }
    expect(getReadingHistory()).toHaveLength(MAX_HISTORY);
  });

  it('stores intention and note', () => {
    saveReadingToHistory('single', [cards[0]], ['Msg'], ['Desc'], ['Il Matto'], 'Amore');
    const entry = getReadingHistory()[0];
    expect(entry.intention).toBe('Amore');
    updateReadingNote(entry.id, 'Nota di test');
    expect(getReadingHistory()[0].note).toBe('Nota di test');
  });

  it('deletes single entry', () => {
    saveReadingToHistory('single', [cards[0]], ['Msg'], ['D'], ['Il Matto']);
    const id = getReadingHistory()[0].id;
    deleteReadingEntry(id);
    expect(getReadingHistory()).toHaveLength(0);
  });

  it('clears history', () => {
    saveReadingToHistory('single', [cards[0]], ['Msg'], ['D'], ['Il Matto']);
    clearReadingHistory();
    expect(getReadingHistory()).toHaveLength(0);
  });
});
