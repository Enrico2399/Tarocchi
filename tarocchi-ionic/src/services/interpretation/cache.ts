import { getStoredLocale } from '../../i18n/localeStorage';
import { getDailyArcanaPositionLabel } from '../../constants/readingSpreads';

const CACHE_PREFIX = 'tarocchi-interpretation:';
const CACHE_VERSION = 'v3';

export type CacheContext = 'reading' | 'daily';

function cacheKey(
  cardId: number,
  position: string,
  context: CacheContext,
  dateKey?: string,
): string {
  const locale = getStoredLocale();
  const datePart = context === 'daily' ? dateKey ?? 'today' : 'reading';
  return `${CACHE_PREFIX}${CACHE_VERSION}:${locale}:${context}:${cardId}:${position}:${datePart}`;
}

export function getCachedInterpretation(
  cardId: number,
  position: string,
  context: CacheContext,
  dateKey?: string,
): string | null {
  try {
    return localStorage.getItem(cacheKey(cardId, position, context, dateKey));
  } catch {
    return null;
  }
}

export function setCachedInterpretation(
  cardId: number,
  position: string,
  context: CacheContext,
  text: string,
  dateKey?: string,
): void {
  try {
    localStorage.setItem(cacheKey(cardId, position, context, dateKey), text);
  } catch {
    // Storage pieno o non disponibile
  }
}

export function clearInterpretationCache(): void {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX));
    keys.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}

export { getDailyArcanaPositionLabel };
