import type { CardData } from '../constants/cardsData';
import type { ReadingSpreadId } from '../constants/readingSpreads';

export type SavedReadingEntry = {
  id: string;
  createdAt: string;
  spreadId: ReadingSpreadId;
  lines: Array<{
    position: string;
    cardName: string;
    description: string;
  }>;
};

const HISTORY_KEY = 'tarocchi-reading-history';
const MAX_HISTORY = 5;

export function getReadingHistory(): SavedReadingEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as SavedReadingEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveReadingToHistory(
  spreadId: ReadingSpreadId,
  cards: CardData[],
  positions: string[],
  descriptions: string[],
  cardNames: string[],
): void {
  const entry: SavedReadingEntry = {
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    spreadId,
    lines: cards.map((_, index) => ({
      position: positions[index] ?? '',
      cardName: cardNames[index] ?? cards[index].name,
      description: descriptions[index] ?? '',
    })),
  };

  const next = [entry, ...getReadingHistory()].slice(0, MAX_HISTORY);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {
    // Storage pieno
  }
}

export function clearReadingHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
