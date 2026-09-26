import { useEffect, useState } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { BrandMark } from './ui/BrandMark';
import './Header.css';

/**
 * Identity header: who I am (left) + what I want you to do (right).
 * Section navigation lives exclusively in the bottom dock.
 */
export function Header() {
  const { t, lang, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const themeLabel = theme === 'dark' ? t.a11y.themeToLight : t.a11y.themeToDark;
  const onTheme = (e) => {
    toggleTheme(e.currentTarget.getBoundingClientRect());
  };

  return (
    <header className={`header${scrolled ? ' header--solid' : ''}`}>
      <div className="header__inner container">
        <a href="#top" className="identity" aria-label={t.a11y.home}>
          <BrandMark size={30} className="identity__mark" />
          <span className="identity__text">
            <span className="identity__name" lang={lang}>
              {t.header.name}
            </span>
            <span className="identity__role">{t.header.role}</span>
          </span>
        </a>

        <div className="header__actions">
          {/* One control capsule: language · theme */}
          <div className="controls">
            <button
              type="button"
              className={`lang-toggle is-${lang}`}
              onClick={() => setLanguage(lang === 'en' ? 'ar' : 'en')}
              aria-label={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
              title={lang === 'en' ? 'العربية' : 'English'}
              dir="ltr"
            >
              <span className="lang-toggle__thumb" aria-hidden="true" />
              <span className="lang-toggle__opt" lang="en" aria-hidden="true">
                EN
              </span>
              <span className="lang-toggle__opt" lang="ar" aria-hidden="true">
                AR
              </span>
            </button>

            <span className="controls__sep" aria-hidden="true" />

            <button
              type="button"
              role="switch"
              aria-checked={theme === 'dark'}
              className={`theme-switch is-${theme}`}
              onClick={onTheme}
              aria-label={t.a11y.darkMode}
              title={themeLabel}
              dir="ltr"
            >
              <Sun size={13} strokeWidth={2} className="theme-switch__icon theme-switch__icon--sun" aria-hidden="true" />
              <Moon size={13} strokeWidth={2} className="theme-switch__icon theme-switch__icon--moon" aria-hidden="true" />
              <span className="theme-switch__knob" aria-hidden="true">
                {theme === 'dark' ? <Moon size={13} strokeWidth={2.25} /> : <Sun size={13} strokeWidth={2.25} />}
              </span>
            </button>
          </div>

          <a className="btn btn--primary btn--sm header__talk" href="#contact">
            {t.header.talk}
            <ArrowRight size={15} className="btn__arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
      <m.div className="header__progress" style={{ scaleX: progress }} aria-hidden="true" />
    </header>
  );
}
