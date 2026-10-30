import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { playSwitchFx } from '../fx/switchFx';
import { PREF_KEYS, initialTheme, savePref } from '../prefs';

const ThemeContext = createContext(null);

/**
 * Dark is the brand default (black-first palette), deliberately not the OS
 * setting; an explicit choice is remembered and applied before first paint.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#F5F4F1' : '#0B0B0B');
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', theme);
  }, [theme]);

  /** Switch theme with the "design" effect, expanding from `origin` (a DOMRect). */
  const toggleTheme = useCallback(
    (origin) => {
      const next = theme === 'dark' ? 'light' : 'dark';
      playSwitchFx({
        type: 'design',
        origin,
        meta: { from: theme, to: next },
        // saved only when actually applied: a toggle ignored mid-transition must not be remembered
        apply: () => {
          savePref(PREF_KEYS.theme, next);
          flushSync(() => setTheme(next));
        },
      });
    },
    [theme],
  );

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};
