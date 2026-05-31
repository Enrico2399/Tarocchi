import type { Locale } from '../i18n/localeStorage';
import { getTranslations } from '../i18n/getTranslations';
import type { CardData } from './cardsData';

export type ReadingSpreadId = 'single' | 'three' | 'four' | 'celtic';

type PositionKey =
  | 'message'
  | 'past'
  | 'present'
  | 'future'
  | 'situation'
  | 'challenge'
  | 'action'
  | 'outcome'
  | 'cSituation'
  | 'cChallenge'
  | 'cRecentPast'
  | 'cNearFuture'
  | 'cGoal'
  | 'cOutcome';

export type ReadingSpread = {
  id: ReadingSpreadId;
  name: string;
  subtitle: string;
  positions: string[];
  cardCount: number;
};

const SPREAD_META: Record<
  ReadingSpreadId,
  { cardCount: number; positionKeys: PositionKey[] }
> = {
  single: { cardCount: 1, positionKeys: ['message'] },
  three: { cardCount: 3, positionKeys: ['past', 'present', 'future'] },
  four: { cardCount: 4, positionKeys: ['situation', 'challenge', 'action', 'outcome'] },
  celtic: {
    cardCount: 6,
    positionKeys: ['cSituation', 'cChallenge', 'cRecentPast', 'cNearFuture', 'cGoal', 'cOutcome'],
  },
};

export const READING_SPREAD_IDS = Object.keys(SPREAD_META) as ReadingSpreadId[];

export const DEFAULT_SPREAD_ID: ReadingSpreadId = 'four';

const SPREAD_STORAGE_KEY = 'tarocchi-spread';

export function getSpreadById(id: ReadingSpreadId, locale?: Locale): ReadingSpread {
  const t = getTranslations(locale);
  const meta = SPREAD_META[id];
  const spreadCopy = t.spreads[id];

  return {
    id,
    name: spreadCopy.name,
    subtitle: spreadCopy.subtitle,
    positions: meta.positionKeys.map((key) => t.positions[key]),
    cardCount: meta.cardCount,
  };
}

export function getAllSpreads(locale?: Locale): ReadingSpread[] {
  return READING_SPREAD_IDS.map((id) => getSpreadById(id, locale));
}

export function getStoredSpreadId(): ReadingSpreadId {
  const stored = localStorage.getItem(SPREAD_STORAGE_KEY);
  if (stored && stored in SPREAD_META) {
    return stored as ReadingSpreadId;
  }
  return DEFAULT_SPREAD_ID;
}

export function setStoredSpreadId(id: ReadingSpreadId): void {
  localStorage.setItem(SPREAD_STORAGE_KEY, id);
}

export function getCardDisplayName(card: CardData, locale?: Locale): string {
  const t = getTranslations(locale);
  return t.cardNames[card.id as keyof typeof t.cardNames] ?? card.name;
}

export function getDailyArcanaPositionLabel(locale?: Locale): string {
  return getTranslations(locale).positions.daily;
}
