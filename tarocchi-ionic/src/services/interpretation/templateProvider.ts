import type { CardData } from '../../constants/cardsData';

const POSITION_INTROS: Record<string, string[]> = {
  'Situazione Attuale': [
    'In questo momento',
    'La situazione attuale rivela',
    'Il presente è segnato da',
  ],
  'Sfida da Affrontare': [
    'La sfida da affrontare',
    'L\'ostacolo da superare',
    'Il cammino richiede di',
  ],
  'Azione Consigliata': [
    'L\'oracolo consiglia di',
    'L\'azione più armoniosa è',
    'Per procedere con chiarezza',
  ],
  Esito: [
    'L\'esito suggerisce',
    'Il consulto indica',
    'Verso cui ti stai muovendo',
  ],
  'Arcano del Giorno': [
    'Oggi l\'energia di',
    'Il messaggio del giorno porta',
    'L\'arcano di oggi invita a',
  ],
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
): string {
  const seed = hashSeed([String(card.id), position, dateKey ?? '']);
  const intro = pick(POSITION_INTROS[position] ?? POSITION_INTROS['Situazione Attuale'], seed);
  const kw1 = pick(card.keywords, seed + 1);
  const kw2 = pick(card.keywords, seed + 3);
  const kw3 = pick(card.keywords, seed + 5);

  if (position === 'Arcano del Giorno') {
    return (
      `${intro} ${card.name} ti guida verso ${kw1} e ${kw2}. ` +
      `Accogli ${kw3} con apertura e lascia che l'intuizione illumini la giornata.`
    );
  }

  return (
    `${intro}, ${card.name} evoca ${kw1} e ${kw2}. ` +
    `Integra ${kw3} nel tuo percorso con consapevolezza e fiducia nel processo.`
  );
}
