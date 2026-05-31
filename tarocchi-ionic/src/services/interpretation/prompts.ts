import type { CardData } from '../../constants/cardsData';

export const SYSTEM_INSTRUCTIONS =
  'Sei un esperto cartomante dei tarocchi. Scrivi interpretazioni brevi, poetiche e incoraggianti in italiano. ' +
  'Non fare diagnosi mediche o legali. Rispondi solo con il testo dell\'interpretazione, senza titoli o elenchi. Massimo 3 frasi.';

export function buildReadingPrompt(position: string, card: CardData): string {
  return (
    `Posizione: ${position}\n` +
    `Carta: ${card.name}\n` +
    `Arcano: ${card.id}\n` +
    `Keywords: ${card.keywords.join(', ')}\n` +
    `Scrivi l'interpretazione per questa carta in questa posizione del consulto.`
  );
}

export function buildDailyArcanaPrompt(card: CardData): string {
  return (
    `Arcano del giorno: ${card.name}\n` +
    `Keywords: ${card.keywords.join(', ')}\n` +
    `Scrivi un messaggio ispiratore per la giornata di oggi basato su questa carta.`
  );
}
