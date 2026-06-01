const INTENTION_KEY = 'tarocchi-reading-intention';
const MAX_INTENTION_LENGTH = 200;

export function getStoredIntention(): string {
  try {
    return localStorage.getItem(INTENTION_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setStoredIntention(text: string): void {
  const trimmed = text.trim().slice(0, MAX_INTENTION_LENGTH);
  try {
    if (trimmed) {
      localStorage.setItem(INTENTION_KEY, trimmed);
    } else {
      localStorage.removeItem(INTENTION_KEY);
    }
  } catch {
    // Storage pieno
  }
}

export function getIntentionCacheSuffix(): string {
  const intention = getStoredIntention().trim();
  if (!intention) {
    return ':no-intent';
  }

  let hash = 0;
  for (let i = 0; i < intention.length; i += 1) {
    hash = (hash << 5) - hash + intention.charCodeAt(i);
    hash |= 0;
  }

  return `:intent-${Math.abs(hash)}`;
}
