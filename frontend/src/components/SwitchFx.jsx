import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { registerSwitchFx } from '../fx/switchFx';
import './SwitchFx.css';

/*
 * Two preference-switch transitions, one per discipline:
 *
 *  DESIGN (theme) — a Figma-style selection frame grows out of the toggle,
 *  handles and live W × H readout included, filling the canvas with the new
 *  background like a designer re-styling a frame. An inspector chip names the
 *  new fill. The theme swaps while the screen is covered, then the frame fades.
 *
 *  CODE (language) — the page is swept by an editor pane in the reading
 *  direction of the new language while a one-line diff is typed:
 *      - <html lang="en" dir="ltr">
 *      + <html lang="ar" dir="rtl">
 *  The language swaps under cover, greets in the new language, and the sweep
 *  continues to reveal the re-laid-out page.
 *
 * Driven by rAF tweens on refs (no re-renders per frame).
 */

const THEMES = {
  dark: { bg: '#0B0B0B', text: '#F5F4F1', muted: 'rgba(245,244,241,0.55)', grid: 'rgba(245,244,241,0.06)', panel: '#141518' },
  light: { bg: '#F5F4F1', text: '#0B0B0B', muted: 'rgba(11,11,11,0.55)', grid: 'rgba(11,11,11,0.07)', panel: '#FFFFFF' },
};

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const tween = (ms, ease, fn) =>
  new Promise((resolve) => {
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      fn(ease(k));
      if (k < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });

/* ------------------------------------------------------------------ DESIGN */
function DesignFx({ job, onDone }) {
  const root = useRef(null);
  const fill = useRef(null);
  const frame = useRef(null);
  const dims = useRef(null);
  const chip = useRef(null);
  const c = THEMES[job.meta.to];
  const from = THEMES[job.meta.from];

  useLayoutEffect(() => {
    let alive = true;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const o = job.origin ?? { left: vw / 2 - 20, top: 12, width: 40, height: 40 };
    const s = { x: o.left - 6, y: o.top - 6, w: o.width + 12, h: o.height + 12 };
    const pad = Math.min(16, vw * 0.03);
    const e = { x: pad, y: pad, w: vw - pad * 2, h: vh - pad * 2 };

    const paint = (t) => {
      const x = lerp(s.x, e.x, t);
      const y = lerp(s.y, e.y, t);
      const w = lerp(s.w, e.w, t);
      const h = lerp(s.h, e.h, t);
      Object.assign(frame.current.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
      dims.current.textContent = `${Math.round(w)} × ${Math.round(h)}`;
      frame.current.classList.toggle('is-big', t > 0.4);
      // the fill runs slightly ahead of the frame and ends edge-to-edge
      const f = Math.min(1, t * 1.06);
      const ft = lerp(s.y, 0, f);
      const fl = lerp(s.x, 0, f);
      const fr = lerp(vw - (s.x + s.w), 0, f);
      const fb = lerp(vh - (s.y + s.h), 0, f);
      fill.current.style.clipPath = `inset(${ft}px ${fr}px ${fb}px ${fl}px round ${lerp(14, 0, f)}px)`;
      fill.current.style.opacity = String(Math.min(1, 0.25 + t * 1.2));
      chip.current.style.opacity = String(Math.max(0, (t - 0.55) / 0.45));
      chip.current.style.transform = `translate(-50%, calc(-50% + ${lerp(10, 0, Math.max(0, (t - 0.55) / 0.45))}px))`;
    };

    (async () => {
      paint(0);
      root.current.classList.add('is-in');
      await wait(140);
      await tween(680, easeInOut, (t) => alive && paint(t));
      if (!alive) return;
      job.apply();
      await wait(320);
      root.current.classList.add('is-out');
      await wait(420);
      onDone();
    })();
    return () => {
      alive = false;
    };
  }, [job, onDone]);

  return (
    <div className="sfx sfx--design" ref={root} aria-hidden="true" style={{ '--sfx-bg': c.bg, '--sfx-text': c.text, '--sfx-muted': c.muted, '--sfx-grid': c.grid, '--sfx-panel': c.panel }}>
      <div className="sfx__fill" ref={fill}>
        <div className="sfx__inspector" ref={chip}>
          <p className="sfx__insp-title">Fill</p>
          <p className="sfx__insp-row">
            <span className="sfx__swatch" style={{ background: from.bg }} />
            <span className="sfx__hex sfx__hex--old">{from.bg}</span>
            <span className="sfx__arrow">→</span>
            <span className="sfx__swatch" style={{ background: c.bg }} />
            <span className="sfx__hex">{c.bg}</span>
          </p>
          <p className="sfx__insp-name">{job.meta.to === 'dark' ? 'Dark mode' : 'Light mode'}</p>
        </div>
      </div>
      <div className="sfx__frame" ref={frame}>
        <span className="sfx__tag">Frame · Theme</span>
        {['tl', 'tr', 'bl', 'br', 't', 'b', 'l', 'r'].map((k) => (
          <i key={k} className={`sfx__handle sfx__handle--${k}`} />
        ))}
        <span className="sfx__dims" ref={dims} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- CODE */
function CodeFx({ job, onDone }) {
  const root = useRef(null);
  const pane = useRef(null);
  const edge = useRef(null);
  const typed = useRef(null);
  const hello = useRef(null);
  const toAr = job.meta.to === 'ar';
  const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const c = THEMES[theme];
  const oldLine = `<html lang="${job.meta.from}" dir="${job.meta.from === 'ar' ? 'rtl' : 'ltr'}">`;
  const newLine = `<html lang="${job.meta.to}" dir="${toAr ? 'rtl' : 'ltr'}">`;

  useLayoutEffect(() => {
    let alive = true;
    const vw = window.innerWidth;
    // Arabic reads right→left, so the sweep travels that way; English the reverse.
    const cover = (q) => {
      const hidden = (1 - q) * 100;
      pane.current.style.clipPath = toAr ? `inset(0 0 0 ${hidden}%)` : `inset(0 ${hidden}% 0 0)`;
      edge.current.style.transform = `translateX(${toAr ? (1 - q) * vw : q * vw}px)`;
    };
    const reveal = (q) => {
      const gone = q * 100;
      pane.current.style.clipPath = toAr ? `inset(0 ${gone}% 0 0)` : `inset(0 0 0 ${gone}%)`;
      edge.current.style.transform = `translateX(${toAr ? (1 - q) * vw : q * vw}px)`;
    };

    const type = async () => {
      for (let i = 1; i <= newLine.length && alive; i++) {
        typed.current.textContent = newLine.slice(0, i);
        await wait(i < 10 ? 22 : 13);
      }
    };

    (async () => {
      cover(0);
      root.current.classList.add('is-in');
      const typing = wait(160).then(type);
      await tween(480, easeInOut, (q) => alive && cover(q));
      await typing;
      if (!alive) return;
      root.current.classList.add('is-committed');
      await wait(150);
      job.apply();
      hello.current.classList.add('is-shown');
      await wait(520);
      root.current.classList.add('is-leaving');
      await tween(520, easeInOut, (q) => alive && reveal(q));
      edge.current.style.opacity = '0';
      onDone();
    })();
    return () => {
      alive = false;
    };
  }, [job, onDone, toAr, newLine]);

  return (
    <div className="sfx sfx--code" ref={root} aria-hidden="true" style={{ '--sfx-bg': c.bg, '--sfx-text': c.text, '--sfx-muted': c.muted, '--sfx-grid': c.grid, '--sfx-panel': c.panel }}>
      <div className="sfx__pane" ref={pane}>
        <div className="sfx__editor" dir="ltr">
          <p className="sfx__file">
            <span className="sfx__dot" />
            index.html
            <span className="sfx__branch">i18n · {job.meta.from} → {job.meta.to}</span>
          </p>
          <pre className="sfx__code">
            <span className="sfx__ln sfx__ln--del">
              <b>-</b>
              {oldLine}
            </span>
            <span className="sfx__ln sfx__ln--add">
              <b>+</b>
              <span ref={typed} />
              <i className="sfx__caret" />
            </span>
          </pre>
          <p className="sfx__status">
            <span className="sfx__check">✓</span> {toAr ? 'dir switched to rtl · layout mirrored' : 'dir switched to ltr · layout restored'}
          </p>
        </div>
        <p className="sfx__hello" ref={hello} lang={job.meta.to}>
          {toAr ? 'مرحبًا' : 'Hello'}
        </p>
      </div>
      <span className="sfx__edge" ref={edge} />
    </div>
  );
}

/* ------------------------------------------------------------------- HOST */
export function SwitchFx() {
  const [job, setJob] = useState(null);
  const resolver = useRef(null);

  useEffect(
    () =>
      registerSwitchFx(
        (j) =>
          new Promise((resolve) => {
            resolver.current = resolve;
            setJob({ ...j, id: Date.now() });
          }),
      ),
    [],
  );

  const done = useCallback(() => {
    setJob(null);
    resolver.current?.();
    resolver.current = null;
  }, []);

  if (!job) return null;
  return job.type === 'design' ? <DesignFx key={job.id} job={job} onDone={done} /> : <CodeFx key={job.id} job={job} onDone={done} />;
}
