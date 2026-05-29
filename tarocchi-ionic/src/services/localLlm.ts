import { Capacitor } from '@capacitor/core';
import { LocalLLM } from '@capacitor/local-llm';
import { CardData, POSITIONS, getDescriptionByIndex } from '../constants/cardsData';

export type LlmAvailability = 'available' | 'unavailable' | 'notready' | 'downloadable';

export type DescriptionSource = 'json' | 'ai';

const TAROT_SESSION = 'tarocchi-reading';
const ARCANA_SESSION = 'tarocchi-arcana';

const SYSTEM_INSTRUCTIONS =
  'Sei un esperto di tarocchi. Scrivi interpretazioni brevi, poetiche e incoraggianti in italiano. ' +
  'Rispondi solo con il testo dell\'interpretazione, senza titoli o elenchi. Massimo 3 frasi.';

function buildCardPrompt(position: string, card: CardData, index: number): string {
  const reference = getDescriptionByIndex(card, index);
  return (
    `Posizione: ${position}\n` +
    `Carta: ${card.name}\n` +
    `Scrivi l'interpretazione per questa carta in questa posizione.\n` +
    `Puoi ispirarti a questo significato tradizionale (non copiarlo): ${reference}`
  );
}

export async function getLlmAvailability(): Promise<LlmAvailability> {
  if (!Capacitor.isNativePlatform()) {
    return 'unavailable';
  }

  try {
    const { status } = await LocalLLM.systemAvailability();
    return status;
  } catch {
    return 'unavailable';
  }
}

export async function ensureLlmReady(): Promise<boolean> {
  const status = await getLlmAvailability();
  if (status === 'available') {
    return true;
  }

  if (status === 'downloadable' && Capacitor.getPlatform() === 'android') {
    try {
      await LocalLLM.download();
      const after = await getLlmAvailability();
      return after === 'available' || after === 'notready';
    } catch {
      return false;
    }
  }

  return false;
}

export async function warmupTarotLlm(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    const status = await getLlmAvailability();
    if (status !== 'available') {
      return;
    }

    await LocalLLM.warmup({
      sessionId: TAROT_SESSION,
      promptPrefix: SYSTEM_INSTRUCTIONS,
    });
  } catch {
    // Silenzioso — fallback JSON
  }
}

export async function generateCardDescription(
  card: CardData,
  positionIndex: number,
): Promise<string | null> {
  const position = POSITIONS[positionIndex] ?? `Carta ${positionIndex + 1}`;

  try {
    const { text } = await LocalLLM.prompt({
      sessionId: TAROT_SESSION,
      instructions: SYSTEM_INSTRUCTIONS,
      prompt: buildCardPrompt(position, card, positionIndex),
      options: {
        temperature: 0.7,
        maximumOutputTokens: 256,
      },
    });

    const trimmed = text.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

export async function generateReadingDescriptions(
  cards: CardData[],
): Promise<string[] | null> {
  if (cards.length === 0) {
    return [];
  }

  const ready = await ensureLlmReady();
  if (!ready) {
    return null;
  }

  await warmupTarotLlm();

  const results = await Promise.all(
    cards.map((card, index) => generateCardDescription(card, index)),
  );

  if (results.some((r) => r === null)) {
    return null;
  }

  return results as string[];
}

export async function generateDailyArcanaDescription(card: CardData): Promise<string | null> {
  const ready = await ensureLlmReady();
  if (!ready) {
    return null;
  }

  try {
    const { text } = await LocalLLM.prompt({
      sessionId: ARCANA_SESSION,
      instructions: SYSTEM_INSTRUCTIONS,
      prompt:
        `Arcano del giorno: ${card.name}\n` +
        `Scrivi un messaggio ispiratore per la giornata di oggi basato su questa carta.\n` +
        `Riferimento tradizionale: ${card.description1}`,
      options: {
        temperature: 0.7,
        maximumOutputTokens: 256,
      },
    });

    const trimmed = text.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

export function getJsonDescriptions(cards: CardData[]): string[] {
  return cards.map((card, index) => getDescriptionByIndex(card, index));
}

export function getJsonArcanaDescription(card: CardData): string {
  return card.description1;
}

export async function endTarotSessions(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    await LocalLLM.endSession({ sessionId: TAROT_SESSION });
    await LocalLLM.endSession({ sessionId: ARCANA_SESSION });
  } catch {
    // ignore
  }
}
