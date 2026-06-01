const DEAL_ANIMATIONS_KEY = 'tarocchi-deal-animations-v1';

export function getDealAnimationsEnabled(): boolean {
  const stored = localStorage.getItem(DEAL_ANIMATIONS_KEY);
  if (stored === 'false') {
    return false;
  }
  return true;
}

export function setDealAnimationsEnabled(enabled: boolean): void {
  localStorage.setItem(DEAL_ANIMATIONS_KEY, enabled ? 'true' : 'false');
}
