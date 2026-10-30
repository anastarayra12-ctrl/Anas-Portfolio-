import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { content, links } from '../content/site';
import { playSwitchFx } from '../fx/switchFx';
import { PREF_KEYS, initialLang, savePref, syncLangParam } from '../prefs';

const LanguageContext = createContext(null);

/** Fonts the next language needs, so they arrive while the transition covers the page. */
const FONTS = {
  ar: ['400 1em Changa', '600 1em Changa', '400 1em Lalezar'],
  en: ['400 1em "Space Grotesk"', '600 1em "Space Grotesk"'],
};
const loadFonts = (lang) => Promise.all(FONTS[lang].map((f) => document.fonts?.load(f))).catch(() => {});

/**
 * Re-applies the reader's position after the page re-lays out in the other
 * direction: same section, same relative depth inside it (copy lengths differ
 * between languages, so a raw scrollY would land somewhere else).
 */
function keepPlace(change) {
  const y = window.scrollY;
  const probe = window.innerHeight * 0.3;
  const sections = [...document.querySelectorAll('main > section[id]')];
  const anchor = y > 8 && sections.find((s) => s.getBoundingClientRect().bottom > probe);
  if (!anchor) {
    change();
    return;
  }
  const r = anchor.getBoundingClientRect();
  const depth = (probe - r.top) / r.height;
  change();
  const n = anchor.getBoundingClientRect();
  window.scrollTo({ top: window.scrollY + n.top + depth * n.height - probe, behavior: 'instant' });
}

/** English by default; an explicit choice is remembered and reflected in the URL. */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    const t = content[lang];
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', lang === 'ar' ? `${links.site}?lang=ar` : links.site);
    syncLangParam(lang);
  }, [lang]);

  /** Switch language with the "code" effect. */
  const setLanguage = useCallback(
    (next) => {
      if (next === lang) return;
      playSwitchFx({
        type: 'code',
        meta: { from: lang, to: next },
        ready: loadFonts(next),
        // saved only when actually applied: a toggle ignored mid-transition must not be remembered
        apply: () => {
          savePref(PREF_KEYS.lang, next);
          keepPlace(() => flushSync(() => setLang(next)));
        },
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
