import { createContext } from 'react';
import type { Locale } from './localeStorage';
import { translations } from './translations';

export type TranslationBundle = (typeof translations)[Locale];

export type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationBundle;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);
