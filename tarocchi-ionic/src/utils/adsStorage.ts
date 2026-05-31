const ADS_STORAGE_KEY = 'tarocchi-ads-enabled';

export function getAdsEnabled(): boolean {
  const stored = localStorage.getItem(ADS_STORAGE_KEY);
  if (stored === null) {
    return true;
  }
  return stored === 'true';
}

export function setAdsEnabled(enabled: boolean): void {
  localStorage.setItem(ADS_STORAGE_KEY, String(enabled));
}
