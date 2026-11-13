import { useEffect, useState } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { BrandMark } from '../brand/BrandMark';
import { LanguageSwitch } from '../controls/LanguageSwitch';
import { ThemeSwitch } from '../controls/ThemeSwitch';
import './Header.css';

/**
 * Identity header: who I am (start) · language, theme and the call to action (end).
 * Section navigation lives in the floating dock.
 */
export function Header() {
  const { t, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <LanguageSwitch />
          <ThemeSwitch />
          <a className="header__cta" href="#contact" aria-label={t.header.cta}>
            <span className="status-dot" aria-hidden="true" />
            <span className="header__cta-label">{t.header.cta}</span>
            <ArrowRight size={15} className="btn__arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
      <m.div className="header__progress" style={{ scaleX: progress }} aria-hidden="true" />
    </header>
  );
}
