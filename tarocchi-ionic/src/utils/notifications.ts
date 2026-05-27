import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export const DAILY_ARCANA_NOTIFICATION_ID = 1;

export async function requestNotificationPermission(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  const current = await LocalNotifications.checkPermissions();
  if (current.display === 'granted') {
    return true;
  }

  const requested = await LocalNotifications.requestPermissions();
  return requested.display === 'granted';
}

export async function scheduleDailyArcanaNotification(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  await LocalNotifications.cancel({
    notifications: [{ id: DAILY_ARCANA_NOTIFICATION_ID }],
  });

  await LocalNotifications.schedule({
    notifications: [
      {
        id: DAILY_ARCANA_NOTIFICATION_ID,
        title: 'Tarocchi',
        body: 'Il tuo arcano del giorno ti aspetta 🔮',
        schedule: {
          on: { hour: 9, minute: 0 },
          repeats: true,
          allowWhileIdle: true,
        },
      },
    ],
  });
}

export async function cancelDailyArcanaNotification(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  await LocalNotifications.cancel({
    notifications: [{ id: DAILY_ARCANA_NOTIFICATION_ID }],
  });
}

export async function enableDailyNotifications(): Promise<boolean> {
  const granted = await requestNotificationPermission();
  if (!granted) {
    return false;
  }

  await scheduleDailyArcanaNotification();
  return true;
}

export async function disableDailyNotifications(): Promise<void> {
  await cancelDailyArcanaNotification();
}
