export const ARCANA_VIEW_STORAGE_KEY = 'lastArcanaView';

export function shouldShowArcanaNotificationDot(
  lastViewed: string | null,
  today: string,
): boolean {
  return lastViewed !== today;
}
