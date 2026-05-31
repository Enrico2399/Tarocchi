import { getStoredLocale, type Locale } from './localeStorage';
import { translations } from './translations';

export function getTranslations(locale?: Locale) {
  return translations[locale ?? getStoredLocale()];
}
