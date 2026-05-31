export type TableThemeId = 'classic' | 'velvet' | 'night';
export type DeckThemeId = 'classic' | 'alchemical' | 'fantasy';

export type TableTheme = {
  id: TableThemeId;
  backgroundImage: string;
  overlayClass: string;
};

export type DeckTheme = {
  id: DeckThemeId;
  cardBackImage: string;
  deckClass: string;
};

const TABLE_IMAGE = '/assets/images/TavoloGioco.jpeg';
const CARD_BACK = '/assets/images/backcarta.jpeg';

export const TABLE_THEMES: Record<TableThemeId, TableTheme> = {
  classic: {
    id: 'classic',
    backgroundImage: TABLE_IMAGE,
    overlayClass: '',
  },
  velvet: {
    id: 'velvet',
    backgroundImage: TABLE_IMAGE,
    overlayClass: 'home-bg--velvet',
  },
  night: {
    id: 'night',
    backgroundImage: TABLE_IMAGE,
    overlayClass: 'home-bg--night',
  },
};

export const DECK_THEMES: Record<DeckThemeId, DeckTheme> = {
  classic: {
    id: 'classic',
    cardBackImage: CARD_BACK,
    deckClass: '',
  },
  alchemical: {
    id: 'alchemical',
    cardBackImage: CARD_BACK,
    deckClass: 'memory-card--alchemical',
  },
  fantasy: {
    id: 'fantasy',
    cardBackImage: CARD_BACK,
    deckClass: 'memory-card--fantasy',
  },
};

export const TABLE_THEME_IDS = Object.keys(TABLE_THEMES) as TableThemeId[];
export const DECK_THEME_IDS = Object.keys(DECK_THEMES) as DeckThemeId[];

const TABLE_STORAGE_KEY = 'tarocchi-table-theme';
const DECK_STORAGE_KEY = 'tarocchi-deck-theme';

export function getStoredTableThemeId(): TableThemeId {
  const stored = localStorage.getItem(TABLE_STORAGE_KEY);
  if (stored && stored in TABLE_THEMES) {
    return stored as TableThemeId;
  }
  return 'classic';
}

export function setStoredTableThemeId(id: TableThemeId): void {
  localStorage.setItem(TABLE_STORAGE_KEY, id);
}

export function getStoredDeckThemeId(): DeckThemeId {
  const stored = localStorage.getItem(DECK_STORAGE_KEY);
  if (stored && stored in DECK_THEMES) {
    return stored as DeckThemeId;
  }
  return 'classic';
}

export function setStoredDeckThemeId(id: DeckThemeId): void {
  localStorage.setItem(DECK_STORAGE_KEY, id);
}

export function getTableTheme(id: TableThemeId = getStoredTableThemeId()): TableTheme {
  return TABLE_THEMES[id];
}

export function getDeckTheme(id: DeckThemeId = getStoredDeckThemeId()): DeckTheme {
  return DECK_THEMES[id];
}
