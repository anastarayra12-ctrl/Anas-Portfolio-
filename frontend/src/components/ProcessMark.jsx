import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { processIds } from '../content/site';
import './ProcessMark.css';

/*
 * The brand mark as a process diagram.
 *
 *            02 DESIGN  (apex node)
 *              /  \
 *   outer legs     outer legs
 *            /  ◆  \        ◆ = PRODUCT: the inner strokes of IDEA and BUILD
 *     01 IDEA    03 BUILD      converge on the diamond — where the two meet.
 *
 * The explanation lives *on* the mark: the active node grows an annotation
 * card, tied to it by a leader line, floating on the closest layer of the
 * 3D stack. Node labels are real buttons (click / hover / arrow keys).
 * Stacked SVG layers in CSS 3D space — no WebGL.
 */

const TOP = [50, 14];
const BL = [18, 84];
const BR = [82, 84];
const IL = [38, 48];
const IR = [62, 48];
const D = [50, 58];

const STROKES = {
  outerL: { from: TOP, to: BL, w: 4.6 },
  outerR: { from: TOP, to: BR, w: 4.6 },
  innerL: { from: BL, to: IL, w: 6.2 },
  innerR: { from: BR, to: IR, w: 6.2 },
};
/** Signal-only path: the idea (bottom-left) climbs to design (apex). */
const SIGNALS = { ...STROKES, outerLUp: { from: BL, to: TOP, w: 4.6 } };

const LIT = {
  idea: ['bl'],
  design: ['bl', 'top', 'outerL'],
  build: ['top', 'br', 'outerR'],
  product: ['bl', 'br', 'innerL', 'innerR', 'diamond'],
};
const FLOW = { idea: [], design: ['outerLUp'], build: ['outerR'], product: ['innerL', 'innerR'] };

/** Node label positions (% of the stage). */
const LABEL_POS = {
  idea: { left: 18, top: 93 },
  design: { left: 50, top: 3 },
  build: { left: 82, top: 93 },
  product: { left: 50, top: 74 },
};

/**
 * Annotation card per step: where the card sits (% of stage) and the leader
 * line from the node to the card's attachment point (viewBox units = %).
 */
const CARDS = {
  design: { style: { left: '60%', top: '9%' }, leader: [[54, 14], [60, 14]] },
  idea: { style: { left: '-4%', bottom: '28%' }, leader: [[18, 80], [18, 72]] },
  build: { style: { right: '-4%', bottom: '28%' }, leader: [[82, 80], [82, 72]] },
  product: { style: { left: '-8%', top: '2%' }, leader: [[44, 54], [30, 30]] },
};

const ease = [0.22, 1, 0.36, 1];
const line = ({ from, to }) => `M${from[0]} ${from[1]} L${to[0]} ${to[1]}`;

export function ProcessMark({ copy, active, onActivate, highlight = false, ready = true }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [exploring, setExploring] = useState(false);
  const [pulse, setPulse] = useState(0);

  // Pointer parallax (fine pointers only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 110, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 110, damping: 16 });
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setExploring(false);
  };

  useEffect(() => setPulse((p) => p + 1), [active]);

  const lit = new Set(LIT[active]);
  const cls = (key) => `pm-el${lit.has(key) ? ' is-lit' : ''}`;
  const step = copy.steps[active];
  const card = CARDS[active];
  const docDir = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';

  const draw = (delay) =>
    reduce ? {} : { initial: { pathLength: 0 }, animate: { pathLength: ready ? 1 : 0 }, transition: { delay, duration: 0.9, ease } };
  const pop = (delay) =>
    reduce ? {} : { initial: { scale: 0 }, animate: { scale: ready ? 1 : 0 }, transition: { delay, duration: 0.55, ease } };

  const select = (id) => onActivate(id);

  // Arrow keys move through the steps in reading order (RTL-aware)
  const onKeySteps = (e) => {
    const i = processIds.indexOf(active);
    const rtl = document.documentElement.dir === 'rtl';
    const fwd = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    let next = null;
    if (e.key === fwd || e.key === 'ArrowDown') next = (i + 1) % processIds.length;
    if (e.key === back || e.key === 'ArrowUp') next = (i - 1 + processIds.length) % processIds.length;
    if (next === null) return;
    e.preventDefault();
    select(processIds[next]);
    e.currentTarget.querySelector(`[data-step="${processIds[next]}"]`)?.focus();
  };

  return (
    <div className={`pm${exploring || highlight ? ' is-exploring' : ''}`} data-active={active}>
      <div
        className="pm__viewport"
        ref={ref}
        dir="ltr"
        onPointerMove={onMove}
        onPointerEnter={() => setExploring(true)}
        onPointerLeave={onLeave}
        role="group"
        aria-label={copy.label}
        onKeyDown={onKeySteps}
      >
        <m.div className="pm__stage" style={reduce ? undefined : { rotateX: rx, rotateY: ry }}>
          {/* Layer 0 — construction guides */}
          <svg className="pm__layer pm__layer--guides" viewBox="0 0 100 100" aria-hidden="true">
            <line x1="50" y1="3" x2="50" y2="97" />
            <line x1="3" y1="84" x2="97" y2="84" />
            <line x1="3" y1="48" x2="97" y2="48" opacity="0.5" />
            <circle cx="50" cy="58" r="15" />
            <circle cx="50" cy="58" r="26" opacity="0.45" />
          </svg>

          <div className="pm__glow" aria-hidden="true" />

          {/* Layer 1 — the strokes of the A */}
          <svg className="pm__layer pm__layer--strokes" viewBox="0 0 100 100" aria-hidden="true">
            {Object.entries(STROKES).map(([key, s], i) => (
              <m.path key={key} d={line(s)} className={cls(key)} strokeWidth={s.w} {...draw(0.15 + (i > 1 ? 0.45 : 0))} />
            ))}
            {!reduce &&
              FLOW[active].map((key) => (
                <m.path
                  key={`${key}-${pulse}`}
                  d={line(SIGNALS[key])}
                  className="pm__signal"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                  transition={{ duration: 0.9, ease, opacity: { times: [0, 0.75, 1], duration: 1.1 } }}
                />
              ))}
          </svg>

          {/* Layer 2 — nodes + the leader line to the annotation */}
          <svg className="pm__layer pm__layer--nodes" viewBox="0 0 100 100" aria-hidden="true">
            {ready && (
              <m.path
                key={`leader-${active}`}
                className="pm__leader"
                d={`M${card.leader[0][0]} ${card.leader[0][1]} L${card.leader[1][0]} ${card.leader[1][1]}`}
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease }}
              />
            )}
            {[
              ['top', TOP, 'var(--brand-sky)', 0.9, 'design'],
              ['bl', BL, 'var(--brand-accent)', 1.0, 'idea'],
              ['br', BR, 'var(--brand-deep)', 1.1, 'build'],
            ].map(([key, [cx, cy], fill, delay, id]) => (
              <g key={key} className={cls(key)}>
                {active === id && <circle className="pm__halo" cx={cx} cy={cy} r="7" />}
                <m.circle cx={cx} cy={cy} r="3.5" fill={fill} style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'view-box' }} {...pop(delay)} />
                <circle className="pm__hit" cx={cx} cy={cy} r="9" onPointerEnter={() => select(id)} onClick={() => select(id)} />
              </g>
            ))}
          </svg>

          {/* Layer 3 — the product */}
          <svg className="pm__layer pm__layer--product" viewBox="0 0 100 100" aria-hidden="true">
            <g className={cls('diamond')}>
              {active === 'product' && <circle className="pm__halo pm__halo--product" cx={D[0]} cy={D[1]} r="11" />}
              <m.polygon
                points={`${D[0]},${D[1] - 8} ${D[0] + 7},${D[1]} ${D[0]},${D[1] + 8} ${D[0] - 7},${D[1]}`}
                fill="var(--brand-sky)"
                style={{ transformOrigin: `${D[0]}px ${D[1]}px`, transformBox: 'view-box' }}
                {...pop(1.25)}
              />
              <circle className="pm__hit" cx={D[0]} cy={D[1]} r="11" onPointerEnter={() => select('product')} onClick={() => select('product')} />
            </g>
          </svg>

          {/* Layer 4 — node labels (buttons) */}
          <div className="pm__layer pm__layer--labels">
            {processIds.map((id) => {
              const p = LABEL_POS[id];
              return (
                <button
                  key={id}
                  type="button"
                  data-step={id}
                  dir={docDir}
                  className={`pm__label${active === id ? ' is-active' : ''}`}
                  style={{ left: `${p.left}%`, top: `${p.top}%` }}
                  aria-pressed={active === id}
                  onClick={() => select(id)}
                  onPointerEnter={() => select(id)}
                  onFocus={() => {
                    setExploring(true);
                    select(id);
                  }}
                  onBlur={() => setExploring(false)}
                  tabIndex={active === id ? 0 : -1}
                >
                  <span className="pm__label-n">{copy.steps[id].n}</span>
                  <span>{copy.steps[id].t}</span>
                </button>
              );
            })}
          </div>

          {/* Layer 5 — the annotation card, closest to the viewer */}
          <div className="pm__layer pm__layer--card" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {ready && (
                <m.div
                  key={active}
                  className={`pm__card pm__card--${active}`}
                  dir={docDir}
                  style={card.style}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.96, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease, delay: reduce ? 0 : 0.12 }}
                >
                  <p className="pm__card-head">
                    <span className="pm__card-n">{step.n}</span>
                    <strong>{step.t}</strong>
                    <span className="pm__card-short">{step.short}</span>
                  </p>
                  <p className="pm__card-text">{step.d}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </m.div>
        <span className="pm__corner pm__corner--tl" aria-hidden="true" />
        <span className="pm__corner pm__corner--tr" aria-hidden="true" />
        <span className="pm__corner pm__corner--bl" aria-hidden="true" />
        <span className="pm__corner pm__corner--br" aria-hidden="true" />
      </div>
    </div>
  );
}
