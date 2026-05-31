import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { getStoredLocale, setStoredLocale, type Locale } from './localeStorage';
import { translations } from './translations';
import { LocaleContext } from './localeContext';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    setStoredLocale(next);
    setLocaleState(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
