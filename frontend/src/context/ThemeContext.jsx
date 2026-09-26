import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { playSwitchFx } from '../fx/switchFx';

const ThemeContext = createContext(null);

/**
 * Dark is the brand default for every visitor, on every visit — the choice is
 * intentionally not persisted.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#F5F4F1' : '#0B0B0B');
  }, [theme]);

  /** Switch theme with the "design" effect, expanding from `origin` (a DOMRect). */
  const toggleTheme = useCallback(
    (origin) => {
      const next = theme === 'dark' ? 'light' : 'dark';
      playSwitchFx({
        type: 'design',
        origin,
        meta: { from: theme, to: next },
        apply: () => flushSync(() => setTheme(next)),
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
