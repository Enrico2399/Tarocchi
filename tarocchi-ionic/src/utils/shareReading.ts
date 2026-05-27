import { CardData, POSITIONS, getDescriptionByIndex } from '../constants/cardsData';

export function formatReadingText(cards: CardData[]): string {
  if (cards.length === 0) {
    return '';
  }

  const lines = cards.map((card, index) => {
    const position = POSITIONS[index] ?? `Carta ${index + 1}`;
    const description = getDescriptionByIndex(card, index);
    return `${position}\n${card.name}\n${description}`;
  });

  return ['🔮 Lettura Tarocchi', '', ...lines].join('\n\n');
}
