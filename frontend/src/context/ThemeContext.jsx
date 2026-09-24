import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'anas_portfolio_theme';
const ThemeContext = createContext(null);

const readStored = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
};

// The inline script in index.html resolves the theme before first paint.
const initialTheme = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#F5F4F1' : '#0B0B0B');
  }, [theme]);

  // Follow the OS preference until the visitor makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e) => {
      if (!readStored()) setTheme(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /**
   * Switch theme. When an origin point is given (the toggle button), the new
   * theme expands as a circle from it using the View Transitions API.
   */
  const toggleTheme = useCallback(
    (origin) => {
      const next = theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || !document.startViewTransition) {
        setTheme(next);
        return;
      }
      const root = document.documentElement;
      root.classList.add('theme-vt');
      const vt = document.startViewTransition(() => flushSync(() => setTheme(next)));
      vt.ready
        .then(() => {
          const x = origin?.x ?? window.innerWidth / 2;
          const y = origin?.y ?? 0;
          const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
          );
        })
        .catch(() => {});
      vt.finished.finally(() => root.classList.remove('theme-vt'));
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
