import type { CardData } from '../constants/cardsData';
import type { ReadingSpreadId } from '../constants/readingSpreads';

export type SavedReadingEntry = {
  id: string;
  createdAt: string;
  spreadId: ReadingSpreadId;
  intention?: string;
  note?: string;
  lines: Array<{
    position: string;
    cardName: string;
    description: string;
  }>;
};

const HISTORY_KEY = 'tarocchi-reading-history';
export const MAX_HISTORY = 25;

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

function persistHistory(entries: SavedReadingEntry[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {
    // Storage pieno
  }
}

export function saveReadingToHistory(
  spreadId: ReadingSpreadId,
  cards: CardData[],
  positions: string[],
  descriptions: string[],
  cardNames: string[],
  intention?: string,
): void {
  const trimmedIntention = intention?.trim();
  const entry: SavedReadingEntry = {
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    spreadId,
    ...(trimmedIntention ? { intention: trimmedIntention } : {}),
    lines: cards.map((_, index) => ({
      position: positions[index] ?? '',
      cardName: cardNames[index] ?? cards[index].name,
      description: descriptions[index] ?? '',
    })),
  };

  persistHistory([entry, ...getReadingHistory()].slice(0, MAX_HISTORY));
}

export function updateReadingNote(id: string, note: string): void {
  const trimmed = note.trim().slice(0, 500);
  const next = getReadingHistory().map((entry) => {
    if (entry.id !== id) {
      return entry;
    }
    if (!trimmed) {
      const { note: removedNote, ...rest } = entry;
      void removedNote;
      return rest;
    }
    return { ...entry, note: trimmed };
  });
  persistHistory(next);
}

export function deleteReadingEntry(id: string): void {
  persistHistory(getReadingHistory().filter((entry) => entry.id !== id));
}

export function clearReadingHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
