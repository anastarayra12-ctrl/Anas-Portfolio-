import { useEffect, useRef } from 'react';
import './Backdrop.css';

/**
 * Site-wide background, one system instead of per-section decorations:
 *  - blueprint grid in page coordinates, visible around the hero and the
 *    closing contact section and fading out in between (all grids line up);
 *  - a pointer "spotlight" that reveals the grid in the brand blue (fine
 *    pointers only, rAF-throttled, off for reduced motion);
 *  - fixed ambient light + a very fine grain for depth.
 * Pure CSS layers — no canvas, no constant animation.
 */
export function Backdrop() {
  const spotRef = useRef(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;

    let raf = 0;
    let cx = -9999;
    let cy = -9999;
    const paint = () => {
      raf = 0;
      el.style.setProperty('--mx', `${cx + window.scrollX}px`);
      el.style.setProperty('--my', `${cy + window.scrollY}px`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onMove = (e) => {
      cx = e.clientX;
      cy = e.clientY;
      el.classList.add('is-on');
      queue();
    };
    const onLeave = () => el.classList.remove('is-on');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', queue, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', queue);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__light" />
      <div className="backdrop__grid" />
      <div className="backdrop__spot" ref={spotRef} />
      <div className="backdrop__grain" />
    </div>
  );
}
