import { useEffect, useRef } from 'react';
import { triggerDealHaptic } from '../utils/haptics';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Deck visible alone before the first card flies */
export const DEAL_INITIAL_DELAY_MS = 550;
export const DEAL_STAGGER_MS = 180;
export const DEAL_DURATION_MS = 600;

export function getCardsDealEndMs(cardCount: number): number {
  if (cardCount <= 0) {
    return 0;
  }
  return DEAL_INITIAL_DELAY_MS + (cardCount - 1) * DEAL_STAGGER_MS + DEAL_DURATION_MS;
}

/** @deprecated use getCardsDealEndMs — kept for tests/docs */
export function getDealTotalMs(cardCount: number): number {
  return getCardsDealEndMs(cardCount);
}

type UseCardDealAnimationParams = {
  cardCount: number;
  generation: number;
  enabled: boolean;
  onComplete: () => void;
};

export function useCardDealAnimation({
  cardCount,
  generation,
  enabled,
  onComplete,
}: UseCardDealAnimationParams): boolean {
  const reducedMotion = usePrefersReducedMotion();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const isAnimating = enabled && cardCount > 0 && !reducedMotion;

  useEffect(() => {
    if (cardCount === 0) {
      if (!enabled) {
        onCompleteRef.current();
      }
      return;
    }

    if (!enabled) {
      onCompleteRef.current();
      return;
    }

    if (reducedMotion) {
      onCompleteRef.current();
      return;
    }

    const hapticTimers: ReturnType<typeof setTimeout>[] = [];
    for (let index = 0; index < cardCount; index += 1) {
      hapticTimers.push(
        setTimeout(() => {
          triggerDealHaptic();
        }, DEAL_INITIAL_DELAY_MS + index * DEAL_STAGGER_MS),
      );
    }

    const completeTimer = setTimeout(() => {
      onCompleteRef.current();
    }, getCardsDealEndMs(cardCount));

    return () => {
      hapticTimers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [cardCount, enabled, generation, reducedMotion]);

  return isAnimating;
}
