export const AI_READINGS_ENABLED_KEY = 'tarocchi-ai-readings';

export function getAiReadingsEnabled(): boolean {
  const stored = localStorage.getItem(AI_READINGS_ENABLED_KEY);
  return stored !== 'false';
}

export function setAiReadingsEnabled(enabled: boolean): void {
  localStorage.setItem(AI_READINGS_ENABLED_KEY, String(enabled));
}
