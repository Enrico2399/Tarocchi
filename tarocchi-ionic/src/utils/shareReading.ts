import { CardData, POSITIONS, getDescriptionByIndex } from '../constants/cardsData';

export type ReadingLine = {
  position: string;
  cardName: string;
  description: string;
};

export function buildReadingLines(
  cards: CardData[],
  descriptions?: string[],
): ReadingLine[] {
  return cards.map((card, index) => ({
    position: POSITIONS[index] ?? `Carta ${index + 1}`,
    cardName: card.name,
    description: descriptions?.[index] ?? getDescriptionByIndex(card, index),
  }));
}

export function formatReadingText(
  cards: CardData[],
  descriptions?: string[],
): string {
  if (cards.length === 0) {
    return '';
  }

  const lines = buildReadingLines(cards, descriptions).map(
    (line) => `${line.position}\n${line.cardName}\n${line.description}`,
  );

  return ['🔮 Lettura Tarocchi', '', ...lines].join('\n\n');
}
