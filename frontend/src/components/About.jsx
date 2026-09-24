import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Code2, PenTool, Diamond } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import './About.css';

const lensIcon = { engineer: Code2, designer: PenTool, product: Diamond };

export function About() {
  const { t, isRTL } = useLanguage();
  const a = t.about;
  const reduce = useReducedMotion();
  const uid = useId();
  const [lens, setLens] = useState(2); // start on "Both" — the point of the section
  const tabsRef = useRef(null);
  const current = a.lenses[lens];

  // WAI-ARIA tabs keyboard model (RTL-aware)
  const onKeyDown = (e) => {
    const n = a.lenses.length;
    const fwd = isRTL ? 'ArrowLeft' : 'ArrowRight';
    const back = isRTL ? 'ArrowRight' : 'ArrowLeft';
    let next = null;
    if (e.key === fwd) next = (lens + 1) % n;
    else if (e.key === back) next = (lens - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setLens(next);
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about" index={a.index} kicker={a.kicker} title={a.title} />

        <div className="about__grid">
          <Reveal className="about__story">
            <p className="about__lead">{a.lead}</p>
            {a.body.map((p, i) => (
              <p key={i} className="about__body">
                {p}
              </p>
            ))}
            <blockquote className="about__quote">
              <span className="diamond" aria-hidden="true" />
              <p>{a.quote}</p>
            </blockquote>
          </Reveal>

          <Reveal className="lens" delay={0.1}>
            <p className="lens__label" id={`${uid}-label`}>
              {a.lensLabel}
            </p>
            <div className="lens__tabs" role="tablist" aria-labelledby={`${uid}-label`} ref={tabsRef} onKeyDown={onKeyDown}>
              {a.lenses.map((l, i) => {
                const Icon = lensIcon[l.key];
                const selected = i === lens;
                return (
                  <button
                    key={l.key}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${i}`}
                    aria-selected={selected}
                    aria-controls={`${uid}-panel`}
                    tabIndex={selected ? 0 : -1}
                    className={`lens__tab${selected ? ' is-active' : ''}`}
                    onClick={() => setLens(i)}
                  >
                    {selected && (
                      <motion.span layoutId={`${uid}-lens`} className="lens__thumb" transition={{ type: 'spring', stiffness: 460, damping: 36 }} />
                    )}
                    <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                    <span>{l.tab}</span>
                  </button>
                );
              })}
            </div>

            <div className="lens__panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${lens}`} tabIndex={0}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.key}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="lens__question">{current.question}</h3>
                  <ol className="lens__points">
                    {current.points.map((p, i) => (
                      <li key={p}>
                        <span className="lens__num" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {p}
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* The two sides meeting — the logo's idea in miniature */}
            <div className={`lens__meter lens__meter--${current.key}`} aria-hidden="true">
              <span className="lens__side">{a.lenses[0].tab}</span>
              <span className="lens__track">
                <span className="lens__fill lens__fill--a" />
                <span className="lens__dot" />
                <span className="lens__fill lens__fill--b" />
              </span>
              <span className="lens__side">{a.lenses[1].tab}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
