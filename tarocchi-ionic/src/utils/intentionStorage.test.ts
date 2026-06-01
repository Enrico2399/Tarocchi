import { describe, expect, it, beforeEach } from 'vitest';
import {
  getIntentionCacheSuffix,
  getStoredIntention,
  setStoredIntention,
} from './intentionStorage';

describe('intentionStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves intention', () => {
    setStoredIntention('Amore e lavoro');
    expect(getStoredIntention()).toBe('Amore e lavoro');
  });

  it('clears empty intention', () => {
    setStoredIntention('Test');
    setStoredIntention('   ');
    expect(getStoredIntention()).toBe('');
  });

  it('produces stable cache suffix', () => {
    setStoredIntention('Domanda');
    const suffix = getIntentionCacheSuffix();
    expect(suffix).toMatch(/^:intent-\d+$/);
    expect(getIntentionCacheSuffix()).toBe(suffix);
  });

  it('uses no-intent suffix when empty', () => {
    expect(getIntentionCacheSuffix()).toBe(':no-intent');
  });
});
