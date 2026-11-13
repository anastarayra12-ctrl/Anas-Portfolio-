import { useEffect, useRef } from 'react';
import './Backdrop.css';

/**
 * Site-wide background, one system instead of per-section decorations:
 *  - blueprint grid in page coordinates: faint everywhere, stronger around the
 *    hero and the closing contact section (all grids line up);
 *  - a pointer spotlight — brighter blue lines, glowing intersections and a
 *    soft light that eases after the cursor (fine pointers only, off for
 *    reduced motion);
 *  - fixed ambient light + a very fine grain for depth.
 * Pure CSS layers — no canvas, no constant animation.
 */
export function Backdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;

    // The light eases towards the pointer (page coordinates) instead of snapping.
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = null;
    let y = null;
    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.setProperty('--mx', `${x.toFixed(1)}px`);
      el.style.setProperty('--my', `${y.toFixed(1)}px`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const target = (cx, cy) => {
      tx = cx + window.scrollX;
      ty = cy + window.scrollY;
      if (x === null) {
        x = tx;
        y = ty;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    let last = [0, 0];
    const onMove = (e) => {
      last = [e.clientX, e.clientY];
      el.classList.add('is-on');
      target(e.clientX, e.clientY);
    };
    const onScroll = () => target(last[0], last[1]);
    const onLeave = () => el.classList.remove('is-on');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="backdrop" ref={ref} aria-hidden="true">
      <div className="backdrop__light" />
      <div className="backdrop__grid" />
      <div className="backdrop__glow" />
      <div className="backdrop__spot" />
      <div className="backdrop__grain" />
    </div>
  );
}
