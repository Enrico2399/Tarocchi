import { useCallback, useEffect, useState } from 'react';
import {
  applyTheme,
  getStoredTheme,
  setStoredTheme,
  type ThemeMode,
} from '../utils/themeStorage';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
      setStoredTheme(next);
      return next;
    });
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setStoredTheme(mode);
    setTheme(mode);
  }, []);

  return { theme, isDark: theme === 'dark', toggleTheme, setThemeMode };
}
