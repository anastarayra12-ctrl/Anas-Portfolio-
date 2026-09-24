import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { content } from '../content/site';

const STORAGE_KEY = 'anas_portfolio_lang';
const LanguageContext = createContext(null);

const safeStore = (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable (private mode) — preference just won't persist */
  }
};

// The inline script in index.html resolves the language before first paint.
const initialLang = () => (document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en');

const withTransition = (fn) => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && document.startViewTransition) document.startViewTransition(fn);
  else fn();
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    const t = content[lang];
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang]);

  const setLanguage = useCallback(
    (next) => {
      if (next === lang) return;
      safeStore(next);
      withTransition(() => flushSync(() => setLang(next)));
    },
    [lang],
  );
  const toggleLanguage = useCallback(() => setLanguage(lang === 'en' ? 'ar' : 'en'), [lang, setLanguage]);

  const value = useMemo(
    () => ({ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', isRTL: lang === 'ar', t: content[lang], toggleLanguage, setLanguage }),
    [lang, toggleLanguage, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
};
