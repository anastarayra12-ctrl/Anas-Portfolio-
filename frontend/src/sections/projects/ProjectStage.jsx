import { useRef, useState } from 'react';
import {
  AnimatePresence,
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { ProjectDevice } from './ProjectDevice';
import { latin } from '../../lib/text';

const ease = [0.22, 1, 0.36, 1];

/**
 * 3D scroll stage (desktop). The section is pinned while you scroll through it;
 * scroll moves a camera along a line of projects set out in depth. The project in
 * front is the one described on the side — upcoming projects wait behind it,
 * passed ones lift away past the viewer. The pointer gently tilts the whole space.
 *
 *   pos = 0 … N-1 (scroll)   d = pos − i   d < 0 waiting · d = 0 in front · d > 0 passed
 */
export function ProjectStage({ list, lang, labels, newTab, onOpen }) {
  const ref = useRef(null);
  const N = list.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, N - 1]);
  const pos = useSpring(raw, { stiffness: 110, damping: 24, mass: 0.6 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(raw, 'change', (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.round(v)));
    setActive((cur) => (cur === i ? cur : i));
  });

  // Pointer tilt of the whole space (subtle parallax between the depth layers).
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const tiltX = useSpring(useTransform(ty, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 20 });
  const tiltY = useSpring(useTransform(tx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 20 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    tx.set((e.clientX - r.left) / r.width - 0.5);
    ty.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    tx.set(0);
    ty.set(0);
  };

  const go = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * i) / (N - 1) + 2, behavior: 'smooth' });
  };

  const p = list[active];
  const c = p[lang];

  return (
    <div className="stage" ref={ref} style={{ height: `${N * 85 + 25}vh` }}>
      <div className="stage__sticky">
        {list.map((proj, i) => (
          <span
            key={proj.id}
            className={`stage__glow${i === active ? ' is-on' : ''}`}
            style={{ '--p-accent': proj.accent, '--p-glow': proj.glow }}
            aria-hidden="true"
          />
        ))}

        <div className="container stage__layout">
          <div className="stage__info" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={p.id}
                className="stage__copy"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
              >
                <p className="label">
                  <span className="label__index">
                    {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                  </span>
                  <span>{c.category}</span>
                </p>
                <h3 className="stage__title">
                  <span {...latin(c.title)}>{c.title}</span>
                </h3>
                <p className="stage__summary">{c.summary}</p>
                <dl className="stage__facts">
                  <div>
                    <dt>{labels.role}</dt>
                    <dd>{c.role}</dd>
                  </div>
                  <div>
                    <dt>{labels.type}</dt>
                    <dd>{c.type}</dd>
                  </div>
                </dl>
                <ul className="stage__stack" aria-label={labels.stack}>
                  {p.stack.map((s) => (
                    <li key={s} className="tag" dir="ltr">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="stage__actions">
                  <button type="button" className="btn btn--primary" onClick={() => onOpen(p.id)}>
                    {labels.details}
                    <Maximize2 size={15} aria-hidden="true" />
                  </button>
                  <a className="btn btn--secondary" href={p.url} target="_blank" rel="noreferrer">
                    {labels.visit}
                    <ArrowUpRight size={16} className="btn__ext" aria-hidden="true" />
                    <span className="sr-only">{newTab}</span>
                  </a>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="stage__scene" onPointerMove={onMove} onPointerLeave={onLeave}>
            <m.div className="stage__space" style={{ rotateX: tiltX, rotateY: tiltY }}>
              {list.map((proj, i) => (
                <StageCard
                  key={proj.id}
                  project={proj}
                  index={i}
                  pos={pos}
                  active={i === active}
                  title={proj[lang].title}
                  labels={labels}
                  onOpen={onOpen}
                />
              ))}
            </m.div>
          </div>
        </div>

        <div className="container stage__foot">
          <ol className="stage__nav">
            {list.map((proj, i) => (
              <li key={proj.id}>
                <button
                  type="button"
                  className={`stage__step${i === active ? ' is-active' : ''}`}
                  onClick={() => go(i)}
                  aria-current={i === active ? 'step' : undefined}
                  aria-label={`${labels.jump}: ${proj[lang].title}`}
                >
                  <span className="label__index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="stage__step-name">
                    <span {...latin(proj[lang].title)}>{proj[lang].title}</span>
                  </span>
                  <span className="stage__step-bar" aria-hidden="true">
                    <StepFill pos={pos} index={i} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="stage__hint" aria-hidden="true">
            <span className="stage__hint-wheel" />
            {labels.hint}
          </p>
        </div>
      </div>
    </div>
  );
}

/** One project on the depth line. */
function StageCard({ project, index, pos, active, title, labels, onOpen }) {
  const d = useTransform(pos, (v) => v - index);
  const transform = useTransform(d, (v) => {
    if (v <= 0) {
      // waiting: further back, a little higher and to the side
      return `translate3d(${v * -9}%, ${v * 13}%, ${v * 380}px) rotateY(${v * 4}deg)`;
    }
    // passed: lifts up and comes past the viewer
    return `translate3d(${v * -6}%, ${v * -70}%, ${v * 520}px) rotateX(${v * 24}deg)`;
  });
  // fully opaque while in front (|d| small), then fades: waiting cards dim slowly, passed ones quickly
  const opacity = useTransform(d, (v) => (v <= 0 ? Math.max(0, 1 + Math.min(0, v + 0.12) * 0.32) : Math.max(0, 1 - Math.max(0, v - 0.12) * 2)));
  const veil = useTransform(d, (v) => (v < 0 ? Math.min(0.75, -v * 0.38) : 0));
  const zIndex = useTransform(d, (v) => Math.round(100 - Math.abs(v) * 10));

  return (
    <m.div
      className={`stage__card${active ? ' is-active' : ''}`}
      style={{ transform, opacity, zIndex, '--p-accent': project.accent }}
      aria-hidden={!active}
    >
      <button
        type="button"
        className="stage__card-btn"
        onClick={() => onOpen(project.id)}
        tabIndex={active ? 0 : -1}
        aria-label={`${labels.details}: ${title}`}
      >
        <ProjectDevice project={project} title={title} labels={labels} eager={index === 0} />
        <m.span className="stage__veil" style={{ opacity: veil }} aria-hidden="true" />
      </button>
    </m.div>
  );
}

/** Progress of one step in the stage navigation. */
function StepFill({ pos, index }) {
  const scaleX = useTransform(pos, (v) => Math.min(1, Math.max(0, v - index + 1)));
  return <m.span className="stage__step-fill" style={{ scaleX }} />;
}
