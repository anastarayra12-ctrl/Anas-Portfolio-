import { useLanguage } from '../../context/LanguageContext';
import './Controls.css';

const OPTIONS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ar', label: 'ع', name: 'العربية' },
];

/**
 * Two-option language control with a sliding thumb. Choosing the other language
 * plays the "code" transition (see LanguageContext → playSwitchFx).
 * Always laid out left-to-right so the thumb does not jump when the page flips.
 */
export function LanguageSwitch() {
  const { t, lang, setLanguage } = useLanguage();

  return (
    <div className={`seg is-${lang}`} role="group" aria-label={t.a11y.language} dir="ltr">
      <span className="seg__thumb" aria-hidden="true" />
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          className="seg__opt"
          lang={o.code}
          aria-pressed={lang === o.code}
          aria-label={o.name}
          title={o.name}
          onClick={() => setLanguage(o.code)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
