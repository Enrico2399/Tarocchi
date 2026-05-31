import { Capacitor } from '@capacitor/core';
import type { CardData } from '../../constants/cardsData';
import { buildDailyArcanaPrompt, buildReadingPrompt, SYSTEM_INSTRUCTIONS } from './prompts';

export type LlmAvailability = 'available' | 'unavailable' | 'notready' | 'downloadable';

const TAROT_SESSION = 'tarocchi-reading';
const ARCANA_SESSION = 'tarocchi-arcana';

type LocalLLMModule = typeof import('@capacitor/local-llm');

async function getLocalLLM(): Promise<LocalLLMModule['LocalLLM'] | null> {
  if (!Capacitor.isNativePlatform()) {
    return null;
  }

  try {
    const mod = await import('@capacitor/local-llm');
    return mod.LocalLLM;
  } catch {
    return null;
  }
}

export async function getLlmAvailability(): Promise<LlmAvailability> {
  const LocalLLM = await getLocalLLM();
  if (!LocalLLM) {
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
  const LocalLLM = await getLocalLLM();
  if (!LocalLLM) {
    return false;
  }

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
  const LocalLLM = await getLocalLLM();
  if (!LocalLLM) {
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
    // Silenzioso
  }
}

async function promptLlm(
  sessionId: string,
  prompt: string,
): Promise<string | null> {
  const LocalLLM = await getLocalLLM();
  if (!LocalLLM) {
    return null;
  }

  try {
    const { text } = await LocalLLM.prompt({
      sessionId,
      instructions: SYSTEM_INSTRUCTIONS,
      prompt,
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

export async function generateOnDeviceReading(
  card: CardData,
  position: string,
): Promise<string | null> {
  return promptLlm(TAROT_SESSION, buildReadingPrompt(position, card));
}

export async function generateOnDeviceDaily(card: CardData): Promise<string | null> {
  return promptLlm(ARCANA_SESSION, buildDailyArcanaPrompt(card));
}

export async function endTarotSessions(): Promise<void> {
  const LocalLLM = await getLocalLLM();
  if (!LocalLLM) {
    return;
  }

  try {
    await LocalLLM.endSession({ sessionId: TAROT_SESSION });
    await LocalLLM.endSession({ sessionId: ARCANA_SESSION });
  } catch {
    // ignore
  }
}
