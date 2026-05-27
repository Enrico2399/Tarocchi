import { CardData, cards } from '../constants/cardsData';

export const getArcanaForDate = (date: Date): CardData => {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return cards[dayOfYear % cards.length];
};

export const getArcanaOfTheDay = (): CardData => getArcanaForDate(new Date());
