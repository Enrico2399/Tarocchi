import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export function triggerFlipHaptic(): void {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
}

export function triggerDealHaptic(): void {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
}
