/**
 * Visitor preferences (theme, language).
 *
 * The inline script in index.html applies the saved values to <html> before
 * first paint; the contexts read their initial state back from <html>, so the
 * resolution rules live in one place. Only explicit choices are saved — a
 * first visit always gets the brand defaults (dark, English).
 */
export const PREF_KEYS = { theme: 'at-theme', lang: 'at-lang' };

export function savePref(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode / blocked storage: the choice just won't be remembered */
  }
}

export const initialTheme = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
export const initialLang = () => (document.documentElement.lang === 'ar' ? 'ar' : 'en');

/** Keep `?lang=` in the address bar in step with the page, so links are shareable per language. */
export function syncLangParam(lang) {
  const url = new URL(window.location.href);
  if (lang === 'ar') url.searchParams.set('lang', 'ar');
  else url.searchParams.delete('lang');
  if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
}
