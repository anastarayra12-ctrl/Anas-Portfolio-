import { useCallback, useEffect, useRef, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, GraduationCap, Code2, PenTool } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useIntroReady } from '../context/IntroContext';
import { links, processIds } from '../content/site';
import { ProcessMark } from './ProcessMark';
import { Magnetic } from './ui/Magnetic';
import './Hero.css';

const ease = [0.22, 1, 0.36, 1];
const roleIcons = [GraduationCap, Code2, PenTool];

export function Hero() {
  const { t, lang } = useLanguage();
  const h = t.hero;
  const reduce = useReducedMotion();
  const ready = useIntroReady();

  const [active, setActive] = useState(reduce ? 'product' : 'idea');
  const [wordHover, setWordHover] = useState(false);
  const touched = useRef(false);

  // One-time story on load: idea → design → build → product. Stops as soon as
  // the visitor interacts, and never loops.
  useEffect(() => {
    if (reduce || !ready) return undefined;
    const timers = processIds.map((id, i) =>
      setTimeout(() => {
        if (!touched.current) setActive(id);
      }, 1700 + i * 1500),
    );
    return () => timers.forEach(clearTimeout);
  }, [reduce, ready]);

  const activate = useCallback((id) => {
    touched.current = true;
    setActive(id);
  }, []);

  // Entrance choreography waits for the splash to finish (`ready`).
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { delay: delay + (ready ? 0.35 : 0), duration: 0.8, ease },
        };

  const [first, ...rest] = h.name.split(' ');
  const last = rest.join(' ');
  const isAr = lang === 'ar';
  // Latin names reveal letter by letter; Arabic letters must stay joined, so by word.
  const units = (word) => (isAr ? [word] : [...word]);

  let n = 0;
  const glyph = (ch) => {
    const i = n++;
    return (
      <span key={i} className="hero__glyph-mask">
        <m.span
          className="hero__glyph"
          initial={reduce ? false : { y: '110%', opacity: 0, filter: 'blur(8px)' }}
          animate={ready || reduce ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: '110%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ delay: 0.15 + i * 0.045, duration: 0.9, ease }}
        >
          {ch}
        </m.span>
      </span>
    );
  };

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="container hero__layout">
        <div className="hero__copy">
          <m.p className="hero__status" {...rise(0)}>
            <span className="hero__status-dot" aria-hidden="true">
              <span className="status-dot" />
            </span>
            <span>{h.status}</span>
          </m.p>

          <h1 className="hero__name" id="hero-name" key={lang} aria-label={h.name}>
            <span className="hero__first" aria-hidden="true">
              {units(first).map(glyph)}
            </span>
            <span className="hero__last" aria-hidden="true">
              {units(last).map(glyph)}
            </span>
          </h1>

          <m.ul className="hero__roles" {...rise(0.3)}>
            {h.roles.map((r, i) => {
              const Icon = roleIcons[i];
              return (
                <li key={r} className="role">
                  <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                  {r}
                </li>
              );
            })}
          </m.ul>

          <m.p className="hero__statement" {...rise(0.42)}>
            {h.statement.map((part, i) =>
              part.node ? (
                <span
                  key={i}
                  className={`hero__word${active === part.node ? ' is-active' : ''}`}
                  onPointerEnter={() => {
                    activate(part.node);
                    setWordHover(true);
                  }}
                  onPointerLeave={() => setWordHover(false)}
                >
                  {part.t}
                </span>
              ) : (
                <span key={i}>{part.t}</span>
              ),
            )}
          </m.p>

          <m.div className="hero__ctas" {...rise(0.52)}>
            <Magnetic>
              <a href="#work" className="btn btn--primary">
                {h.primary}
                <ArrowDown size={16} className="btn__down" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={links.cvPdf} download={links.cvFileName} className="btn btn--secondary">
                <Download size={16} className="btn__down" aria-hidden="true" />
                {h.secondary}
                <span className="hero__file" aria-hidden="true">
                  PDF
                </span>
              </a>
            </Magnetic>
          </m.div>
        </div>

        <m.div
          className="hero__system"
          {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: ready ? 1 : 0 }, transition: { duration: 0.8, delay: 0.1 } })}
        >
          <ProcessMark copy={h.system} active={active} onActivate={activate} highlight={wordHover} ready={ready} />
        </m.div>
      </div>

    </section>
  );
}
