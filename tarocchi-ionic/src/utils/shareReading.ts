import { CardData } from '../constants/cardsData';

export type ReadingLine = {
  position: string;
  cardName: string;
  description: string;
};

export function buildReadingLines(
  cards: CardData[],
  descriptions?: string[],
  positions?: string[],
): ReadingLine[] {
  return cards.map((card, index) => ({
    position: positions?.[index] ?? `Carta ${index + 1}`,
    cardName: card.name,
    description: descriptions?.[index] ?? '',
  }));
}

export function formatReadingText(
  cards: CardData[],
  descriptions?: string[],
  positions?: string[],
): string {
  if (cards.length === 0) {
    return '';
  }

  const lines = buildReadingLines(cards, descriptions, positions).map(
    (line) => `${line.position}\n${line.cardName}\n${line.description}`,
  );

  return ['🔮 Lettura Tarocchi', '', ...lines].join('\n\n');
}
