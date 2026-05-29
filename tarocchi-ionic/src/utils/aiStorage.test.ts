import { describe, expect, it, beforeEach } from 'vitest';
import {
  getAiReadingsEnabled,
  setAiReadingsEnabled,
  AI_READINGS_ENABLED_KEY,
} from './aiStorage';

describe('aiStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to enabled (auto)', () => {
    expect(getAiReadingsEnabled()).toBe(true);
  });

  it('persists disabled state', () => {
    setAiReadingsEnabled(false);
    expect(localStorage.getItem(AI_READINGS_ENABLED_KEY)).toBe('false');
    expect(getAiReadingsEnabled()).toBe(false);
  });
});
