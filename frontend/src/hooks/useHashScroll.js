import { useEffect } from 'react';

/**
 * Opening the site from a link such as /#contact or /#design (the CV links there):
 * the page is rendered by React after the browser has already tried to jump to
 * the anchor, so do the jump ourselves once it exists — and once more after
 * everything has loaded, in case images or fonts moved it.
 * #projects/<id> (a project dialog) lands on the projects section.
 */
export function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1)).split('/')[0];
    if (!id) return undefined;
    let done = false;
    const jump = () => {
      const el = document.getElementById(id);
      if (el && !done) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(jump));
    const onLoad = () => setTimeout(jump, 60);
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    // stop correcting as soon as the visitor scrolls on their own
    const stop = () => {
      done = true;
    };
    window.addEventListener('wheel', stop, { passive: true, once: true });
    window.addEventListener('touchstart', stop, { passive: true, once: true });
    window.addEventListener('keydown', stop, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
  }, []);
}
