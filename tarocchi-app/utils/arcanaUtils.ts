import { CardData, cards } from '../constants/cardsData'; // Importa i dati delle carte

export const getArcanaOfTheDay = (): CardData => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
  const diff = currentDate.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const arcanaIndex = dayOfYear % cards.length; // Usa la lunghezza dell'array cards
  return cards[arcanaIndex];
};