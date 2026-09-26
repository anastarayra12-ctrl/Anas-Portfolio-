import { useCallback, useEffect, useRef, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useIntroReady } from '../context/IntroContext';
import { links, processIds } from '../content/site';
import { ProcessMark } from './ProcessMark';
import { Magnetic } from './ui/Magnetic';
import './Hero.css';

const ease = [0.22, 1, 0.36, 1];

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
      }, 1500 + i * 850),
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
      : { initial: { opacity: 0, y: 16 }, animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }, transition: { delay: delay + (ready ? 0.35 : 0), duration: 0.8, ease } };
  const line = (i) =>
    reduce ? {} : { initial: { y: '108%' }, animate: { y: ready ? 0 : '108%' }, transition: { delay: 0.1 + i * 0.1, duration: 1, ease } };

  const [first, last] = h.name.split(' ');

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">

      <div className="container hero__layout">
        <div className="hero__copy">
          <m.p className="hero__status" {...rise(0)}>
            <span className="status-dot" aria-hidden="true" />
            {h.status}
          </m.p>

          <h1 className="hero__name" id="hero-name" key={lang}>
            <span className="hero__name-line">
              <m.span {...line(0)}>{first}</m.span>
            </span>
            {" "}
            <span className="hero__name-line">
              <m.span {...line(1)}>{last}</m.span>
            </span>
          </h1>

          <m.ul className="hero__roles" {...rise(0.35)}>
            {h.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </m.ul>

          <m.p className="hero__statement" {...rise(0.45)}>
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

          <m.div className="hero__ctas" {...rise(0.55)}>
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

      <div className="container">
        <m.dl className="hero__facts" {...rise(0.7)}>
          {h.facts.map((f) => (
            <div key={f.k} className="hero__fact">
              <dt>{f.k}</dt>
              <dd>
                <span className="hero__fact-v">{f.v}</span>
                <span className="hero__fact-d">{f.d}</span>
              </dd>
            </div>
          ))}
        </m.dl>
      </div>
    </section>
  );
}
