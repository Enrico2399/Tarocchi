export const NOTIFICATIONS_ENABLED_KEY = 'dailyArcanaNotifications';

export function getNotificationsEnabled(): boolean {
  return localStorage.getItem(NOTIFICATIONS_ENABLED_KEY) === 'true';
}

export function setNotificationsEnabled(enabled: boolean): void {
  localStorage.setItem(NOTIFICATIONS_ENABLED_KEY, String(enabled));
}
