import { CardData } from '../constants/cardsData';

export function pickRandomCards(deck: CardData[], count: number): CardData[] {
  return [...deck].sort(() => Math.random() - 0.5).slice(0, count);
}
