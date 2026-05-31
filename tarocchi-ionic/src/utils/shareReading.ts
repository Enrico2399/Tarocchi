import { CardData } from '../constants/cardsData';
import { getCardDisplayName } from '../constants/readingSpreads';
import type { Locale } from '../i18n/localeStorage';
import { getTranslations } from '../i18n/getTranslations';

export type ReadingLine = {
  position: string;
  cardName: string;
  description: string;
};

export function buildReadingLines(
  cards: CardData[],
  descriptions?: string[],
  positions?: string[],
  locale?: Locale,
): ReadingLine[] {
  return cards.map((card, index) => ({
    position: positions?.[index] ?? `Carta ${index + 1}`,
    cardName: getCardDisplayName(card, locale),
    description: descriptions?.[index] ?? '',
  }));
}

export function formatReadingText(
  cards: CardData[],
  descriptions?: string[],
  positions?: string[],
  locale?: Locale,
): string {
  if (cards.length === 0) {
    return '';
  }

  const header = getTranslations(locale).shareHeader;
  const lines = buildReadingLines(cards, descriptions, positions, locale).map(
    (line) => `${line.position}\n${line.cardName}\n${line.description}`,
  );

  return [header, '', ...lines].join('\n\n');
}
