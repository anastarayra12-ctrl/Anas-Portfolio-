import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Download, Moon, Sun, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { links } from '../content/site';
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
    const r = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
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
          {/* Language: segmented on wide screens, single toggle on small ones */}
          <div className="lang-switch" role="group" aria-label={t.a11y.language}>
            {[
              { code: 'en', label: 'EN', full: 'English' },
              { code: 'ar', label: 'عربي', full: 'العربية' },
            ].map((o) => (
              <button
                key={o.code}
                type="button"
                className={`lang-switch__opt${lang === o.code ? ' is-active' : ''}`}
                aria-pressed={lang === o.code}
                aria-label={o.full}
                lang={o.code}
                onClick={() => setLanguage(o.code)}
              >
                {lang === o.code && (
                  <motion.span layoutId="lang-thumb" className="lang-switch__thumb" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />
                )}
                <span className="lang-switch__label">{o.label}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="h-btn lang-toggle"
            onClick={() => setLanguage(lang === 'en' ? 'ar' : 'en')}
            aria-label={lang === 'en' ? 'العربية' : 'English'}
            lang={lang === 'en' ? 'ar' : 'en'}
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          <button type="button" className="h-btn theme-toggle" onClick={onTheme} aria-label={themeLabel} title={themeLabel}>
            <span className="theme-toggle__icon" key={theme}>
              {theme === 'dark' ? <Sun size={17} strokeWidth={1.75} /> : <Moon size={17} strokeWidth={1.75} />}
            </span>
          </button>

          <span className="header__divider" aria-hidden="true" />

          <a className="h-btn h-btn--cv" href={links.cvPdf} download={links.cvFileName} aria-label={t.header.cvLong} title={t.header.cvLong}>
            <Download size={16} strokeWidth={1.75} aria-hidden="true" />
            <span className="h-btn__text">{t.header.cv}</span>
          </a>

          <a className="btn btn--primary btn--sm header__talk" href="#contact">
            {t.header.talk}
            <ArrowRight size={15} className="btn__arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
      <motion.div className="header__progress" style={{ scaleX: progress }} aria-hidden="true" />
    </header>
  );
}
