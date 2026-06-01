import type { CardData } from '../../constants/cardsData';
import { getCardDisplayName, getDailyArcanaPositionLabel } from '../../constants/readingSpreads';
import { getStoredLocale, type Locale } from '../../i18n/localeStorage';
import { getTranslations } from '../../i18n/getTranslations';

export function getSystemInstructions(locale: Locale = getStoredLocale()): string {
  return getTranslations(locale).aiSystem;
}

export function buildReadingPrompt(
  position: string,
  card: CardData,
  locale: Locale = getStoredLocale(),
): string {
  const cardName = getCardDisplayName(card, locale);
  const langNote = locale === 'en' ? 'Write in English.' : 'Scrivi in italiano.';
  const lengthNote =
    locale === 'en'
      ? 'Maximum 80 words, 2–3 short sentences. No lists or titles.'
      : 'Massimo 80 parole, 2–3 frasi brevi. Niente elenchi o titoli.';

  return (
    `Posizione: ${position}\n` +
    `Carta: ${cardName}\n` +
    `Arcano: ${card.id}\n` +
    `Keywords: ${card.keywords.join(', ')}\n` +
    `${langNote}\n` +
    `${lengthNote}\n` +
    `Scrivi l'interpretazione per questa carta in questa posizione del consulto.`
  );
}

export function buildDailyArcanaPrompt(
  card: CardData,
  locale: Locale = getStoredLocale(),
): string {
  const cardName = getCardDisplayName(card, locale);
  const langNote = locale === 'en' ? 'Write in English.' : 'Scrivi in italiano.';
  const lengthNote =
    locale === 'en'
      ? 'Maximum 80 words, 2–3 short sentences. No lists or titles.'
      : 'Massimo 80 parole, 2–3 frasi brevi. Niente elenchi o titoli.';

  return (
    `Arcano del giorno: ${cardName}\n` +
    `Keywords: ${card.keywords.join(', ')}\n` +
    `${langNote}\n` +
    `${lengthNote}\n` +
    `Scrivi un messaggio ispiratore per la giornata di oggi basato su questa carta.`
  );
}

export function getDailyArcanaPosition(locale: Locale = getStoredLocale()): string {
  return getDailyArcanaPositionLabel(locale);
}
