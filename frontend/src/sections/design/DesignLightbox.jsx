import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowBtn } from './DesignScreens';

/**
 * Full-size viewer in a native <dialog> (focus trap, Esc, inert page).
 * Arrow keys move between screens and follow the reading direction.
 * Long screens scroll inside the viewer at their real size.
 */
export function DesignLightbox({ items, start, labels, onClose }) {
  const ref = useRef(null);
  const viewRef = useRef(null);
  const { isRTL } = useLanguage();
  const [i, setI] = useState(start);
  const [zoom, setZoom] = useState(false);
  const item = items[i];
  const many = items.length > 1;
  const go = (d) => setI((v) => (v + d + items.length) % items.length);

  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    dialog.showModal();
    document.documentElement.classList.add('has-dialog');
    return () => {
      document.documentElement.classList.remove('has-dialog');
      if (dialog.open) dialog.close();
      opener?.focus?.({ preventScroll: true });
      // a locked page can be nudged sideways in RTL while the dialog is open — undo it
      if (window.scrollX) window.scrollTo({ left: 0, top: window.scrollY, behavior: 'instant' });
    };
  }, []);

  useEffect(() => {
    viewRef.current?.scrollTo({ top: 0, left: 0 });
  }, [i]);

  const onKeyDown = (e) => {
    if (!many) return;
    if (e.key === 'ArrowRight') go(isRTL ? -1 : 1);
    else if (e.key === 'ArrowLeft') go(isRTL ? 1 : -1);
  };
  const onCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  const onBackdrop = (e) => {
    if (e.target === ref.current || e.target === viewRef.current) onClose();
  };

  const kind = item.wide ? 'wide' : item.w <= 400 ? 'phone' : 'screen';

  return (
    <dialog ref={ref} className="lb" aria-label={item.caption} onCancel={onCancel} onClick={onBackdrop} onKeyDown={onKeyDown}>
      <header className="lb__top">
        <p className="lb__cap" aria-live="polite">
          {many && (
            <span className="label__index">
              {String(i + 1).padStart(2, '0')} {labels.of} {String(items.length).padStart(2, '0')}
            </span>
          )}
          <span>{item.caption}</span>
        </p>
        <div className="lb__tools">
          {many && (
            <>
              <ArrowBtn dir={-1} label={labels.prev} onClick={() => go(-1)} />
              <ArrowBtn dir={1} label={labels.next} onClick={() => go(1)} />
            </>
          )}
          <button type="button" className="cs-arrow" onClick={onClose} aria-label={labels.close} title={labels.close}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="lb__view" ref={viewRef}>
        <img
          key={item.src}
          className={`lb__img lb__img--${kind}${kind === 'wide' && zoom ? ' is-zoomed' : ''}`}
          src={item.src}
          alt={item.caption}
          width={item.w}
          height={item.h}
          decoding="async"
          onClick={kind === 'wide' ? () => setZoom((z) => !z) : undefined}
        />
      </div>
    </dialog>
  );
}
