import { describe, expect, it, beforeEach } from 'vitest';
import {
  getNotificationsEnabled,
  setNotificationsEnabled,
  NOTIFICATIONS_ENABLED_KEY,
} from './notificationStorage';

describe('notificationStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to disabled', () => {
    expect(getNotificationsEnabled()).toBe(false);
  });

  it('persists enabled state', () => {
    setNotificationsEnabled(true);
    expect(localStorage.getItem(NOTIFICATIONS_ENABLED_KEY)).toBe('true');
    expect(getNotificationsEnabled()).toBe(true);
  });
});
