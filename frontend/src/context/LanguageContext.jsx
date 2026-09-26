import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { content } from '../content/site';
import { playSwitchFx } from '../fx/switchFx';

const LanguageContext = createContext(null);

/**
 * English is the default for every visitor, on every visit — the choice is
 * intentionally not persisted.
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    const t = content[lang];
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang]);

  /** Switch language with the "code" effect. */
  const setLanguage = useCallback(
    (next) => {
      if (next === lang) return;
      playSwitchFx({
        type: 'code',
        meta: { from: lang, to: next },
        apply: () => flushSync(() => setLang(next)),
      });
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
