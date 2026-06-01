import type { CardData } from '../../constants/cardsData';
import { getCardDisplayName, getDailyArcanaPositionLabel } from '../../constants/readingSpreads';
import { getStoredLocale, type Locale } from '../../i18n/localeStorage';
import { normalizeInterpretation } from '../../utils/interpretationText';

const INTROS_IT: Record<string, string[]> = {
  reading: ['In questo momento', 'Il consulto indica', 'La carta rivela'],
  daily: ['Oggi', 'Il messaggio del giorno', 'L\'arcano invita a'],
};

const INTROS_EN: Record<string, string[]> = {
  reading: ['At this moment', 'The spread suggests', 'This card reveals'],
  daily: ['Today', 'The message of the day', 'The arcana invites you to'],
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
  const cardName = getCardDisplayName(card, locale);

  if (isDaily) {
    if (locale === 'en') {
      return normalizeInterpretation(
        `${intro}, ${cardName} highlights ${kw1} and ${kw2}. Trust your intuition today.`,
      );
    }
    return normalizeInterpretation(
      `${intro}, ${cardName} mette in luce ${kw1} e ${kw2}. Fidati del tuo istinto oggi.`,
    );
  }

  if (locale === 'en') {
    return normalizeInterpretation(
      `${intro}, ${cardName} speaks of ${kw1} and ${kw2}. Welcome this energy with awareness.`,
    );
  }

  return normalizeInterpretation(
    `${intro}, ${cardName} parla di ${kw1} e ${kw2}. Accogli questa energia con consapevolezza.`,
  );
}
