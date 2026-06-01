export const INTERPRETATION_MAX_CHARS = 320;
export const CARD_EXPAND_THRESHOLD = 120;

export type TextLengthBucket = 'short' | 'medium' | 'long';

const SHORT_MAX = 100;
const MEDIUM_MAX = 200;

export function getTextLengthBucket(text: string): TextLengthBucket {
  const len = text.trim().length;
  if (len <= SHORT_MAX) {
    return 'short';
  }
  if (len <= MEDIUM_MAX) {
    return 'medium';
  }
  return 'long';
}

export function truncateInterpretation(
  text: string,
  maxChars: number = INTERPRETATION_MAX_CHARS,
): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxChars) {
    return normalized;
  }

  const slice = normalized.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > maxChars * 0.6 ? slice.slice(0, lastSpace) : slice;

  return `${cut.trim()}…`;
}

export function normalizeInterpretation(text: string): string {
  return truncateInterpretation(text.replace(/\s+/g, ' ').trim());
}

export function shouldShowReadMore(text: string): boolean {
  return text.trim().length > CARD_EXPAND_THRESHOLD;
}
