import type { CardData } from '../../constants/cardsData';
import { getCardDisplayName, getDailyArcanaPositionLabel } from '../../constants/readingSpreads';
import { getStoredLocale, type Locale } from '../../i18n/localeStorage';

const INTROS_IT: Record<string, string[]> = {
  reading: ['In questo momento', 'La situazione rivela', 'Il consulto indica'],
  daily: ['Oggi l\'energia di', 'Il messaggio del giorno porta', 'L\'arcano di oggi invita a'],
};

const INTROS_EN: Record<string, string[]> = {
  reading: ['At this moment', 'The reading reveals', 'The spread suggests'],
  daily: ['Today the energy of', 'The message of the day brings', 'Today\'s arcana invites you to'],
};

function pick<T>(items: T[], seed: number): T {
  return items[Math.abs(seed) % items.length];
}

function hashSeed(parts: string[]): number {
  let h = 0;
  const s = parts.join('|');
  for (let i = 0; i < s.length; i += 1) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h;
}

export function generateTemplateInterpretation(
  card: CardData,
  position: string,
  dateKey?: string,
  locale: Locale = getStoredLocale(),
): string {
  const seed = hashSeed([String(card.id), position, dateKey ?? '', locale]);
  const isDaily = position === getDailyArcanaPositionLabel(locale);
  const intros = locale === 'en' ? INTROS_EN : INTROS_IT;
  const intro = pick(isDaily ? intros.daily : intros.reading, seed);
  const kw1 = pick(card.keywords, seed + 1);
  const kw2 = pick(card.keywords, seed + 3);
  const kw3 = pick(card.keywords, seed + 5);
  const cardName = getCardDisplayName(card, locale);

  if (isDaily) {
    if (locale === 'en') {
      return (
        `${intro} ${cardName} guides you toward ${kw1} and ${kw2}. ` +
        `Embrace ${kw3} with openness and let intuition light your day.`
      );
    }
    return (
      `${intro} ${cardName} ti guida verso ${kw1} e ${kw2}. ` +
      `Accogli ${kw3} con apertura e lascia che l'intuizione illumini la giornata.`
    );
  }

  if (locale === 'en') {
    return (
      `${intro}, ${cardName} evokes ${kw1} and ${kw2}. ` +
      `Integrate ${kw3} into your path with awareness and trust in the process.`
    );
  }

  return (
    `${intro}, ${cardName} evoca ${kw1} e ${kw2}. ` +
    `Integra ${kw3} nel tuo percorso con consapevolezza e fiducia nel processo.`
  );
}
