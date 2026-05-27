import { describe, expect, it } from 'vitest';
import { shouldShowArcanaNotificationDot } from './arcanaStorage';

describe('arcanaStorage', () => {
  it('shows dot when never viewed', () => {
    expect(shouldShowArcanaNotificationDot(null, 'Mon Jan 01 2026')).toBe(true);
  });

  it('hides dot when viewed today', () => {
    const today = 'Mon Jan 01 2026';
    expect(shouldShowArcanaNotificationDot(today, today)).toBe(false);
  });

  it('shows dot when last viewed on another day', () => {
    expect(shouldShowArcanaNotificationDot('Sun Dec 31 2025', 'Mon Jan 01 2026')).toBe(true);
  });
});
