import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { DEAL_DURATION_MS, DEAL_INITIAL_DELAY_MS, DEAL_STAGGER_MS, getDealTotalMs, useCardDealAnimation } from './useCardDealAnimation';

vi.mock('../utils/haptics', () => ({
  triggerDealHaptic: vi.fn(),
}));

describe('getDealTotalMs', () => {
  it('returns zero for empty deal', () => {
    expect(getDealTotalMs(0)).toBe(0);
  });

  it('computes stagger plus duration with initial deck pause', () => {
    expect(getDealTotalMs(4)).toBe(
      DEAL_INITIAL_DELAY_MS + 3 * DEAL_STAGGER_MS + DEAL_DURATION_MS,
    );
  });
});

describe('useCardDealAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('completes immediately when disabled', () => {
    const onComplete = vi.fn();
    renderHook(() =>
      useCardDealAnimation({
        cardCount: 4,
        generation: 1,
        enabled: false,
        onComplete,
      }),
    );
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('waits for cards before completing when count is zero', () => {
    const onComplete = vi.fn();
    renderHook(() =>
      useCardDealAnimation({
        cardCount: 0,
        generation: 1,
        enabled: true,
        onComplete,
      }),
    );
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('completes after deal timeline when enabled', () => {
    const onComplete = vi.fn();
    renderHook(() =>
      useCardDealAnimation({
        cardCount: 3,
        generation: 2,
        enabled: true,
        onComplete,
      }),
    );

    expect(onComplete).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(getDealTotalMs(3));
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
