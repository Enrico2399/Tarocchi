import type { CardData } from '../../constants/cardsData';
import { getAiReadingsEnabled } from '../../utils/aiStorage';
import {
  getCachedInterpretation,
  setCachedInterpretation,
  type CacheContext,
} from './cache';
import { generateCloudDaily, generateCloudReading } from './cloudProvider';
import {
  ensureLlmReady,
  generateOnDeviceDaily,
  generateOnDeviceReading,
  warmupTarotLlm,
} from './onDeviceProvider';
import { generateTemplateInterpretation } from './templateProvider';
import { getDailyArcanaPositionLabel } from './cache';
import { getStoredLocale } from '../../i18n/localeStorage';

export type InterpretationSource = 'ai' | 'cloud' | 'cache' | 'generated';

export type InterpretationResult = {
  text: string;
  source: InterpretationSource;
};

type RequestParams = {
  card: CardData;
  position: string;
  context: CacheContext;
  dateKey?: string;
  preferAi?: boolean;
};

async function resolveInterpretation(params: RequestParams): Promise<InterpretationResult> {
  const { card, position, context, dateKey, preferAi = true } = params;

  const cached = getCachedInterpretation(card.id, position, context, dateKey);
  if (cached) {
    return { text: cached, source: 'cache' };
  }

  const aiEnabled = preferAi && getAiReadingsEnabled();

  if (aiEnabled) {
    const ready = await ensureLlmReady();
    if (ready) {
      await warmupTarotLlm();
      const onDevice =
        context === 'daily'
          ? await generateOnDeviceDaily(card)
          : await generateOnDeviceReading(card, position);

      if (onDevice) {
        setCachedInterpretation(card.id, position, context, onDevice, dateKey);
        return { text: onDevice, source: 'ai' };
      }
    }

    const cloud =
      context === 'daily'
        ? await generateCloudDaily(card)
        : await generateCloudReading(card, position);

    if (cloud) {
      setCachedInterpretation(card.id, position, context, cloud, dateKey);
      return { text: cloud, source: 'cloud' };
    }
  }

  const generated = generateTemplateInterpretation(
    card,
    position,
    dateKey,
    getStoredLocale(),
  );
  setCachedInterpretation(card.id, position, context, generated, dateKey);
  return { text: generated, source: 'generated' };
}

export async function getReadingInterpretation(
  card: CardData,
  positionIndex: number,
  position: string,
): Promise<InterpretationResult> {
  return resolveInterpretation({
    card,
    position: position,
    context: 'reading',
  });
}

export async function getDailyArcanaInterpretation(
  card: CardData,
  dateKey: string,
): Promise<InterpretationResult> {
  return resolveInterpretation({
    card,
    position: getDailyArcanaPositionLabel(getStoredLocale()),
    context: 'daily',
    dateKey,
  });
}

export async function getReadingInterpretations(
  cards: CardData[],
  positions: readonly string[],
): Promise<InterpretationResult[]> {
  return Promise.all(
    cards.map((card, index) =>
      getReadingInterpretation(card, index, positions[index] ?? `Carta ${index + 1}`),
    ),
  );
}

export { getLlmAvailability, warmupTarotLlm, endTarotSessions } from './onDeviceProvider';
export type { LlmAvailability } from './onDeviceProvider';
export { isCloudConfigured } from './cloudProvider';
export { clearInterpretationCache } from './cache';
