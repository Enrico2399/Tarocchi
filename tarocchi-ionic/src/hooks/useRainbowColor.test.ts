import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useRainbowColor } from './useRainbowColor';

describe('useRainbowColor', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns first color when inactive', () => {
    const { result } = renderHook(() => useRainbowColor(false));
    expect(result.current).toBe('rgb(0, 191, 255)');
  });

  it('cycles colors when active', () => {
    const { result } = renderHook(() => useRainbowColor(true));
    const first = result.current;
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).not.toBe(first);
  });
});
