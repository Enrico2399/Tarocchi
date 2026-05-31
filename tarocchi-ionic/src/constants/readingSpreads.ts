export type ReadingSpreadId = 'single' | 'three' | 'four' | 'celtic';

export type ReadingSpread = {
  id: ReadingSpreadId;
  name: string;
  subtitle: string;
  positions: readonly string[];
  cardCount: number;
};

export const READING_SPREADS: Record<ReadingSpreadId, ReadingSpread> = {
  single: {
    id: 'single',
    name: 'Carta del Momento',
    subtitle: 'Un messaggio chiaro per il presente',
    positions: ['Messaggio'],
    cardCount: 1,
  },
  three: {
    id: 'three',
    name: 'Passato · Presente · Futuro',
    subtitle: 'Il filo del tempo in tre carte',
    positions: ['Passato', 'Presente', 'Futuro'],
    cardCount: 3,
  },
  four: {
    id: 'four',
    name: 'Consulto Classico',
    subtitle: 'Situazione, sfida, azione ed esito',
    positions: ['Situazione Attuale', 'Sfida da Affrontare', 'Azione Consigliata', 'Esito'],
    cardCount: 4,
  },
  celtic: {
    id: 'celtic',
    name: 'Croce Celtica',
    subtitle: 'Lettura approfondita in sei posizioni',
    positions: [
      'Situazione',
      'Sfida',
      'Passato recente',
      'Futuro prossimo',
      'Obiettivo',
      'Esito',
    ],
    cardCount: 6,
  },
};

export const DEFAULT_SPREAD_ID: ReadingSpreadId = 'four';

const SPREAD_STORAGE_KEY = 'tarocchi-spread';

export function getStoredSpreadId(): ReadingSpreadId {
  const stored = localStorage.getItem(SPREAD_STORAGE_KEY);
  if (stored && stored in READING_SPREADS) {
    return stored as ReadingSpreadId;
  }
  return DEFAULT_SPREAD_ID;
}

export function setStoredSpreadId(id: ReadingSpreadId): void {
  localStorage.setItem(SPREAD_STORAGE_KEY, id);
}

export function getSpreadById(id: ReadingSpreadId): ReadingSpread {
  return READING_SPREADS[id];
}
