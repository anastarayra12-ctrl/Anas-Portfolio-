import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import './Journey.css';

export function Journey() {
  const { t } = useLanguage();
  const j = t.journey;
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const [active, setActive] = useState(0);

  // Rail fills with scroll progress through the chapters
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // Chapter crossing the middle of the viewport drives the sticky marker
  useEffect(() => {
    const items = listRef.current?.querySelectorAll('[data-chapter]');
    if (!items?.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.chapter));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = j.chapters[active];

  return (
    <section className="section journey" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <SectionHead id="journey" index={j.index} kicker={j.kicker} title={j.title} intro={j.intro} />

        <div className="route">
          <div className="route__aside" aria-hidden="true">
            <div className="route__sticky">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={current.key}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className={`route__big${current.future ? ' is-future' : ''}`}>{current.mark}</p>
                  <p className="route__big-tag">{current.tag}</p>
                </m.div>
              </AnimatePresence>
              <p className="route__count">
                <span>{String(active + 1).padStart(2, '0')}</span> / {String(j.chapters.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className="route__track">
            <span className="route__rail" aria-hidden="true">
              <m.span className="route__rail-fill" style={{ scaleY: reduce ? 1 : fill }} />
            </span>
          <ol className="route__list" ref={listRef}>

            {j.chapters.map((c, i) => (
              <Reveal
                as="li"
                key={c.key}
                data-chapter={i}
                className={`chapter${c.current ? ' chapter--current' : ''}${c.future ? ' chapter--future' : ''}${
                  i === active ? ' is-active' : ''
                }`}
              >
                <span className="chapter__node" aria-hidden="true" />
                <p className="chapter__meta">
                  <span className="chapter__mark">{c.mark}</span>
                  <span className="chapter__tag">{c.tag}</span>
                  {c.current && <span className="chapter__here">{j.here}</span>}
                </p>
                <h3 className="chapter__title">{c.title}</h3>
                <p className="chapter__text">{c.text}</p>
              </Reveal>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
