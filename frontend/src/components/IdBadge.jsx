import { useRef, useState } from 'react';
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { BrandMark } from './ui/BrandMark';
import './IdBadge.css';

/*
 * A personal ID badge hanging from a lanyard.
 *  - tilts in 3D towards the pointer, with a holographic sheen that follows it
 *  - click / Enter / Space flips it: the front is who I am, the back is how I work
 *  - reduced motion: no tilt or swing, the flip becomes a crossfade
 */
export function IdBadge({ s, name }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-14, 14]), { stiffness: 150, damping: 18 });
  const sheenX = useTransform(px, [0, 1], ['0%', '100%']);
  const sheenY = useTransform(py, [0, 1], ['0%', '100%']);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.22), transparent 45%)`;

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={`badge${reduce ? ' badge--still' : ''}`}>
      {/* Lanyard */}
      <svg className="badge__lanyard" viewBox="0 0 120 150" aria-hidden="true">
        <path d="M30 0 L52 118" />
        <path d="M90 0 L68 118" />
      </svg>

      <div className="badge__swing" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
        <span className="badge__clip" aria-hidden="true">
          <span className="badge__ring" />
        </span>

        <m.div className="badge__tilt" style={reduce ? undefined : { rotateX: rx, rotateY: ry }}>
          <button
            type="button"
            className={`badge__card${flipped ? ' is-flipped' : ''}`}
            onClick={() => setFlipped((f) => !f)}
            aria-pressed={flipped}
            aria-label={`${name} — ${s.flip}`}
            title={s.hint}
          >
            {/* FRONT */}
            <span className="badge__face badge__face--front" aria-hidden={flipped}>
              <span className="badge__slot" />
              <span className="badge__top">
                <BrandMark size={20} />
                <span className="badge__org">{s.org}</span>
              </span>

              <span className="badge__photo">
                <BrandMark size={58} />
              </span>

              <span className="badge__name" dir="auto">
                {name}
              </span>
              <span className="badge__role">{s.role}</span>

              <span className="badge__fields">
                {s.fields.map((f) => (
                  <span key={f.k} className="badge__field">
                    <span className="badge__k">{f.k}</span>
                    <span className="badge__v">{f.v}</span>
                  </span>
                ))}
              </span>

              <span className="badge__foot">
                <span className="badge__status">
                  <i /> {s.status}
                </span>
                <span className="badge__barcode" />
                <span className="badge__id">{s.id}</span>
              </span>
              {!reduce && <m.span className="badge__sheen" style={{ backgroundImage: sheen }} />}
            </span>

            {/* BACK */}
            <span className="badge__face badge__face--back" aria-hidden={!flipped}>
              <span className="badge__slot" />
              <span className="badge__back-grid" />
              <span className="badge__back-mark">
                <BrandMark size={44} />
              </span>
              <span className="badge__back-title">{s.backTitle}</span>
              <span className="badge__back-list">
                {s.back.map((b) => (
                  <span key={b.k} className="badge__field badge__field--back">
                    <span className="badge__k">{b.k}</span>
                    <span className="badge__v" dir="ltr">
                      {b.v}
                    </span>
                  </span>
                ))}
              </span>
              <span className="badge__motto">{s.motto}</span>
              <span className="badge__palette">
                {['#0B0B0B', '#2563EB', '#3B82F6', '#38BDF8', '#F5F4F1'].map((c) => (
                  <i key={c} style={{ background: c }} />
                ))}
              </span>
              {!reduce && <m.span className="badge__sheen" style={{ backgroundImage: sheen }} />}
            </span>
          </button>
        </m.div>
      </div>

      <p className="badge__hint" aria-hidden="true">
        <RotateCw size={13} /> {s.hint}
      </p>
      <p className="sr-only">{s.label}</p>
    </div>
  );
}
