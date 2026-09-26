import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, m, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Splash.css';

const ease = [0.22, 1, 0.36, 1];

/** One continuous cursive stroke, written like the iPhone “hello”. viewBox 0 0 480 180 */
const HELLO_PATH =
  'M 14 150 C 40 145 62 118 76 82 C 88 50 90 22 76 20 C 62 18 58 50 60 90 C 61 120 62 140 62 158 C 66 128 84 110 100 112 C 116 114 118 132 116 148 C 115 158 118 162 126 160 C 150 155 176 140 176 124 C 176 110 158 110 150 124 C 142 140 150 160 170 160 C 196 160 214 124 224 84 C 232 50 234 22 220 22 C 206 22 204 60 206 100 C 207 136 212 160 230 160 C 254 160 268 124 278 84 C 286 50 288 22 274 22 C 260 22 258 60 260 100 C 261 136 266 160 284 160 C 300 160 312 140 322 124 C 330 112 348 108 360 116 C 374 126 374 152 356 160 C 338 168 322 150 330 128 C 336 114 356 110 372 118 C 386 124 400 118 412 108';
const WRITE_START = 0.55;
const WRITE_DURATION = 2.3;
const HOLD = 0.9; // let the finished word breathe before the curtain lifts

/** The splash greets every page load (skippable at any moment). */
// eslint-disable-next-line react-refresh/only-export-components
export const shouldShowSplash = () => true;

/*
 * Timeline (≈3.6s):
 *   0.0  frame meta fades in, counter starts
 *   0.1  the brand mark draws itself — lines, then nodes, then the diamond
 *   0.55 "hello" is handwritten in one continuous stroke (iPhone-style);
 *        the brand diamond lands as its full stop
 *   2.35 the Arabic greeting joins underneath
 *   3.75 content lifts away and the panel wipes up to reveal the site
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
    const total = reduce ? 0.9 : WRITE_START + WRITE_DURATION + HOLD;
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

            <h2 className="splash__hello">
              <span className="sr-only">Hello — مرحبًا</span>
              <svg className="splash__script" viewBox="0 0 480 180" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="splash-ink" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0.35" style={{ stopColor: 'var(--text)' }} />
                    <stop offset="1" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <m.path
                  d={HELLO_PATH}
                  stroke="url(#splash-ink)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduce ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
                  transition={
                    reduce
                      ? { duration: 0.4 }
                      : { pathLength: { delay: WRITE_START, duration: WRITE_DURATION, ease: [0.45, 0.05, 0.25, 1] }, opacity: { delay: WRITE_START, duration: 0.01 } }
                  }
                />
                {/* the brand diamond lands as the full stop once the pen lifts */}
                <m.polygon
                  points="426,93 434,103 426,113 418,103"
                  fill="#38BDF8"
                  style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
                  initial={reduce ? { opacity: 0 } : { scale: 0, rotate: -90, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: reduce ? 0.2 : WRITE_START + WRITE_DURATION - 0.05, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </svg>
            </h2>

            <m.p
              className="splash__sub"
              lang="ar"
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0.1 : WRITE_START + WRITE_DURATION - 0.5, duration: 0.6, ease }}
            >
              مرحبًا
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
