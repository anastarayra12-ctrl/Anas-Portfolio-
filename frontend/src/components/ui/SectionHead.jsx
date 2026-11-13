import { m, useReducedMotion } from 'framer-motion';
import { Reveal } from './Reveal';

const ease = [0.22, 1, 0.36, 1];

/**
 * Section header used by every section:
 *   ── 02  TOOLKIT ─────────────────────── (optional count)
 *   Title that rises word by word            intro paragraph
 */
export function SectionHead({ id, index, kicker, title, intro, count }) {
  const reduce = useReducedMotion();
  const words = title.split(' ');

  return (
    <header className="section-head">
      <Reveal className="section-head__rule">
        <p className="label">
          <span className="label__index">{index}</span>
          <span>{kicker}</span>
        </p>
        {count && <span className="section-head__count">{count}</span>}
      </Reveal>
      <div className="section-head__body">
        <div className="section-head__title">
          <m.h2
            className="h2 h2--words"
            id={`${id}-title`}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            aria-label={title}
          >
            {words.map((w, i) => (
              <span key={`${w}-${i}`} className="word" aria-hidden="true">
                <m.span
                  className="word__inner"
                  variants={
                    reduce
                      ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.4 } } }
                      : { hidden: { y: '110%' }, shown: { y: 0, transition: { delay: 0.08 + i * 0.07, duration: 0.85, ease } } }
                  }
                >
                  {w}
                </m.span>
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </m.h2>
        </div>
        {intro && (
          <Reveal className="section-head__intro" delay={0.15}>
            <p className="lead">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
