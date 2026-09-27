import { useId, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { PenTool, Code2, Workflow, BadgeCheck, Hourglass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import './Stack.css';

const icons = { design: PenTool, engineering: Code2, workflow: Workflow };
const ease = [0.22, 1, 0.36, 1];

/** Two-letter monogram for a tool tile (Latin names only; Arabic uses the first word's letter). */
const monogram = (name) => {
  const clean = name.replace(/[^\p{L}\p{N}#+ ]/gu, '').trim();
  const words = clean.split(/\s+/);
  if (/^[A-Za-z]/.test(clean)) {
    return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : clean.slice(0, 2);
  }
  return clean.slice(0, 1);
};

/*
 * Workbench layout: pick a discipline (big selector cards), then see its tools
 * as tiles and the courses behind them as credential tickets.
 */
export function Stack() {
  const { t, isRTL } = useLanguage();
  const s = t.stack;
  const reduce = useReducedMotion();
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabsRef = useRef(null);
  const d = s.disciplines[active];

  const onKeyDown = (e) => {
    const n = s.disciplines.length;
    const fwd = isRTL ? 'ArrowLeft' : 'ArrowRight';
    const back = isRTL ? 'ArrowRight' : 'ArrowLeft';
    let next = null;
    if (e.key === fwd) next = (active + 1) % n;
    else if (e.key === back) next = (active - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <section className="section stack" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <SectionHead id="stack" index={s.index} kicker={s.kicker} title={s.title} intro={s.intro} />

        <Reveal>
          <div className="bench__tabs" role="tablist" aria-label={s.choose} ref={tabsRef} onKeyDown={onKeyDown}>
            {s.disciplines.map((disc, i) => {
              const Icon = icons[disc.key];
              const selected = i === active;
              return (
                <button
                  key={disc.key}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  className={`bench__tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {selected && (
                    <m.span layoutId={`${uid}-tab-bg`} className="bench__tab-bg" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />
                  )}
                  <span className="bench__tab-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="bench__tab-text">
                    <span className="bench__tab-name">{disc.name}</span>
                    <span className="bench__tab-purpose">{disc.purpose}</span>
                  </span>
                  <span className="bench__tab-count">
                    {disc.tools.length} {s.countTools} · {disc.certs.length} {s.countCourses}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="bench__panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${active}`}>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={d.key}
              className="bench__body"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -10 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="bench__col">
                <h3 className="bench__label">
                  {s.toolsLabel}
                  <span className="bench__legend" aria-hidden="true">
                    <span>
                      <i className="dot dot--using" /> {s.using}
                    </span>
                    <span>
                      <i className="dot dot--learning" /> {s.learning}
                    </span>
                  </span>
                </h3>
                <ul className="tiles">
                  {d.tools.map((tool, i) => (
                    <m.li
                      key={tool.t}
                      className={`tile${tool.learning ? ' tile--learning' : ''}`}
                      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease }}
                    >
                      <span className="tile__mono" aria-hidden="true" dir="auto">
                        {monogram(tool.t)}
                      </span>
                      <span className="tile__name" dir="auto">
                        {tool.t}
                      </span>
                      {tool.note && <span className="tile__note">{tool.note}</span>}
                      <span className={`tile__state tile__state--${tool.learning ? 'learning' : 'using'}`}>
                        <i className={`dot dot--${tool.learning ? 'learning' : 'using'}`} aria-hidden="true" />
                        {tool.learning ? s.learning : s.using}
                      </span>
                    </m.li>
                  ))}
                </ul>
              </div>

              <div className="bench__col">
                <h3 className="bench__label">{s.learnedLabel}</h3>
                <ul className="tickets">
                  {d.certs.map((c, i) => (
                    <m.li
                      key={c.title}
                      className={`ticket${c.live ? ' ticket--live' : ''}`}
                      initial={reduce ? false : { opacity: 0, x: isRTL ? -16 : 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease }}
                    >
                      <span className="ticket__stub">
                        <span className="ticket__icon" aria-hidden="true">
                          {c.live ? <Hourglass size={16} strokeWidth={1.75} /> : <BadgeCheck size={16} strokeWidth={1.75} />}
                        </span>
                        <span className="ticket__date">{c.date}</span>
                      </span>
                      <span className="ticket__body">
                        <span className="ticket__title" dir="auto">
                          {c.title}
                        </span>
                        <span className="ticket__org">{c.org}</span>
                        {c.by && (
                          <span className="ticket__by">
                            {s.reviewed} {c.by}
                          </span>
                        )}
                      </span>
                    </m.li>
                  ))}
                </ul>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
