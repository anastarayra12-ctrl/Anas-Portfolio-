import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, m, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Splash.css';

const ease = [0.22, 1, 0.36, 1];

/** The splash greets every page load (skippable at any moment). */
// eslint-disable-next-line react-refresh/only-export-components
export const shouldShowSplash = () => true;

/*
 * Timeline (≈2.6s):
 *   0.0  frame meta fades in, counter starts
 *   0.1  the brand mark draws itself — lines, then nodes, then the diamond
 *   0.55 "Hello" rises letter by letter; the brand diamond is its full stop
 *   1.15 the Arabic greeting joins underneath
 *   2.2  content lifts away and the panel wipes up to reveal the site
 * Click, Enter, Space or Escape skips it. Reduced motion: a short, still fade.
 */
export function Splash({ onLeave, onDone }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, '0'));
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    onLeave?.(); // let the page start its entrance while the curtain lifts
  }, [onLeave]);

  // Lock scrolling while the splash is up
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const total = reduce ? 0.9 : 2.2;
    const ctrl = animate(progress, 100, { duration: total, ease: reduce ? 'linear' : [0.65, 0, 0.35, 1] });
    const t = setTimeout(finish, total * 1000 + 80);
    const onKey = (e) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) finish();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      ctrl.stop();
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [finish, progress, reduce]);

  const primary = lang === 'ar' ? 'مرحبًا' : 'Hello';
  const secondary = lang === 'ar' ? 'Hello' : 'مرحبًا';
  const letters = lang === 'ar' ? [primary] : [...primary]; // Arabic letters must stay joined

  const draw = (delay, duration = 0.6) =>
    reduce ? {} : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { delay, duration, ease } };
  const pop = (delay) =>
    reduce ? {} : { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay, duration: 0.45, ease } };

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <m.div
          className="splash"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'ar' ? 'مرحبًا — أنس طرايرة' : 'Hello — Anas Tarayra'}
          onClick={finish}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduce ? { opacity: 0, transition: { duration: 0.35 } } : { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.18 } }}
        >
          <m.div
            className="splash__content"
            exit={reduce ? {} : { y: -40, opacity: 0, transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45] } }}
          >
            <svg className="splash__mark" viewBox="12 8 76 82" fill="none" aria-hidden="true">
              <g stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round">
                <m.path d="M50 14 L18 84" strokeWidth="4.6" {...draw(0.1)} />
                <m.path d="M50 14 L82 84" strokeWidth="4.6" {...draw(0.1)} />
                <m.path d="M38 48 L18 84" strokeWidth="6.2" {...draw(0.35, 0.4)} />
                <m.path d="M62 48 L82 84" strokeWidth="6.2" {...draw(0.35, 0.4)} />
              </g>
              <m.circle cx="50" cy="14" r="3.5" fill="#38BDF8" style={{ transformOrigin: '50px 14px' }} {...pop(0.45)} />
              <m.circle cx="18" cy="84" r="3.5" fill="#3B82F6" style={{ transformOrigin: '18px 84px' }} {...pop(0.5)} />
              <m.circle cx="82" cy="84" r="3.5" fill="#2563EB" style={{ transformOrigin: '82px 84px' }} {...pop(0.55)} />
              <m.polygon points="50,50 57,58 50,66 43,58" fill="#38BDF8" style={{ transformOrigin: '50px 58px' }} {...pop(0.65)} />
            </svg>

            <h2 className="splash__hello" lang={lang}>
              {letters.map((ch, i) => (
                <span key={i} className="splash__mask">
                  <m.span
                    className="splash__ch"
                    initial={reduce ? { opacity: 0 } : { y: '110%' }}
                    animate={reduce ? { opacity: 1 } : { y: 0 }}
                    transition={{ delay: 0.55 + i * 0.07, duration: 0.8, ease }}
                  >
                    {ch}
                  </m.span>
                </span>
              ))}
              <m.span
                className="splash__dot"
                aria-hidden="true"
                initial={reduce ? { opacity: 0 } : { scale: 0, rotate: 0 }}
                animate={reduce ? { opacity: 1 } : { scale: 1, rotate: 45 }}
                transition={{ delay: 0.55 + letters.length * 0.07 + 0.1, duration: 0.5, ease }}
              />
            </h2>

            <m.p
              className="splash__sub"
              lang={lang === 'ar' ? 'en' : 'ar'}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0.1 : 1.15, duration: 0.6, ease }}
            >
              {secondary}
            </m.p>
          </m.div>

          {/* Frame: a technical-drawing border that echoes the site's blueprint language */}
          <m.div className="splash__frame" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <span className="splash__meta splash__meta--tl">ANAS TARAYRA</span>
            <span className="splash__meta splash__meta--tr">PORTFOLIO — {new Date().getFullYear()}</span>
            <span className="splash__meta splash__meta--bl">
              <m.span>{counter}</m.span>
              <span className="splash__pct">%</span>
            </span>
            <span className="splash__meta splash__meta--br">AMMAN, JO</span>
            <span className="splash__bar">
              <m.span className="splash__bar-fill" style={{ scaleX: barScale }} />
            </span>
          </m.div>

          <button type="button" className="splash__skip" onClick={finish}>
            {lang === 'ar' ? 'تخطي' : 'Skip'}
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
