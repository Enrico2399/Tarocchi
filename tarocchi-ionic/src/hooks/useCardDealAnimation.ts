import { useEffect, useRef } from 'react';
import { triggerDealHaptic } from '../utils/haptics';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export const DEAL_STAGGER_MS = 140;
export const DEAL_DURATION_MS = 550;

export function getDealTotalMs(cardCount: number): number {
  if (cardCount <= 0) {
    return 0;
  }
  return (cardCount - 1) * DEAL_STAGGER_MS + DEAL_DURATION_MS;
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
        }, index * DEAL_STAGGER_MS),
      );
    }

    const completeTimer = setTimeout(() => {
      onCompleteRef.current();
    }, getDealTotalMs(cardCount));

    return () => {
      hapticTimers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [cardCount, enabled, generation, reducedMotion]);

  return isAnimating;
}
