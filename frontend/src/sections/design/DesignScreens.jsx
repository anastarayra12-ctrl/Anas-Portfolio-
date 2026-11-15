import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Monitor, Smartphone, Shapes } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ease = [0.22, 1, 0.36, 1];
const pad = (n) => String(n).padStart(2, '0');
const TABS = [
  { id: 'desktop', Icon: Monitor },
  { id: 'mobile', Icon: Smartphone },
  { id: 'kit', Icon: Shapes },
];

/** Screens of the case study in three tabs; every image opens full size. */
export function DesignScreens({ cs, c, w, onOpen }) {
  const [tab, setTab] = useState('desktop');
  const counts = { desktop: cs.desktop.length, mobile: cs.mobile.length, kit: cs.kit.length };

  const onKeyDown = (e) => {
    const i = TABS.findIndex((x) => x.id === tab);
    const dir = document.documentElement.dir === 'rtl' ? -1 : 1;
    let next = null;
    if (e.key === 'ArrowRight') next = i + dir;
    else if (e.key === 'ArrowLeft') next = i - dir;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    const id = TABS[(next + TABS.length) % TABS.length].id;
    setTab(id);
    document.getElementById(`cs-tab-${id}`)?.focus();
  };

  return (
    <div className="cs-screens">
      <div className="cs-screens__head">
        <h4 className="cs__h">{w.screensTitle}</h4>
        <div className="cs-tabs" role="tablist" aria-label={w.screensTitle} onKeyDown={onKeyDown}>
          {TABS.map(({ id, Icon }) => (
            <button
              key={id}
              id={`cs-tab-${id}`}
              type="button"
              role="tab"
              aria-selected={tab === id}
              aria-controls="cs-panel"
              tabIndex={tab === id ? 0 : -1}
              className={`cs-tab${tab === id ? ' is-active' : ''}`}
              onClick={() => setTab(id)}
            >
              {tab === id && <m.span layoutId="cs-tab-pill" className="cs-tab__pill" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
              <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>{w.tabs[id]}</span>
              <span className="cs-tab__n">{pad(counts[id])}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="cs-panel" id="cs-panel" role="tabpanel" aria-labelledby={`cs-tab-${tab}`}>
        {tab === 'desktop' && <DesktopViewer cs={cs} c={c} w={w} onOpen={onOpen} />}
        {tab === 'mobile' && <MobileRail cs={cs} c={c} w={w} onOpen={onOpen} />}
        {tab === 'kit' && <KitGrid cs={cs} c={c} w={w} onOpen={onOpen} />}
      </div>
    </div>
  );
}

/** One large screen + a rail of thumbnails. The screen pans down on hover. */
function DesktopViewer({ cs, c, w, onOpen }) {
  const [i, setI] = useState(0);
  const list = cs.desktop;
  const s = list[i];
  const items = list.map((x) => ({ ...x, caption: c.screens[x.id] }));
  const go = (d) => setI((v) => (v + d + list.length) % list.length);

  return (
    <div className="cs-desk">
      <div className="cs-desk__stage">
        <button type="button" className="cs-frame" onClick={() => onOpen(items, i, 'desktop')} aria-label={`${w.open}: ${c.screens[s.id]}`}>
          <span className="cs-frame__bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="cs-frame__view">
            <AnimatePresence initial={false} mode="popLayout">
              <m.img
                key={s.id}
                className="cs-frame__img"
                src={s.src}
                alt=""
                width={s.w}
                height={s.h}
                decoding="async"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease }}
              />
            </AnimatePresence>
            <span className="cs-frame__zoom" aria-hidden="true">
              <Maximize2 size={16} />
            </span>
          </span>
        </button>

        <div className="cs-desk__caption">
          <p className="cs-desk__title" aria-live="polite">
            <span className="label__index">
              {pad(i + 1)} / {pad(list.length)}
            </span>
            <span>{c.screens[s.id]}</span>
          </p>
          <div className="cs-arrows">
            <ArrowBtn dir={-1} label={w.prev} onClick={() => go(-1)} />
            <ArrowBtn dir={1} label={w.next} onClick={() => go(1)} />
          </div>
        </div>
      </div>

      <div className="cs-desk__side">
      <ol className="cs-thumbs">
        {list.map((x, n) => (
          <li key={x.id}>
            <button
              type="button"
              className={`cs-thumb${n === i ? ' is-active' : ''}`}
              onClick={() => setI(n)}
              aria-current={n === i ? 'true' : undefined}
              aria-label={c.screens[x.id]}
              title={c.screens[x.id]}
            >
              <span className="cs-thumb__img">
                <img src={x.thumb} alt="" width="560" height={Math.round((560 * x.h) / x.w)} loading="lazy" decoding="async" />
              </span>
              <span className="cs-thumb__text">
                <span className="cs-thumb__n" aria-hidden="true">
                  {pad(n + 1)}
                </span>
                <span className="cs-thumb__name">{c.screens[x.id]}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}

/** Phone screens in a horizontal, snapping rail. */
function MobileRail({ cs, c, w, onOpen }) {
  const ref = useRef(null);
  const { isRTL } = useLanguage();
  const items = cs.mobile.map((x) => ({ ...x, caption: c.screens[x.id] }));
  const scroll = (d) => {
    const el = ref.current;
    el.scrollBy({ left: d * (isRTL ? -1 : 1) * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="cs-mob">
      <ol className="cs-rail" ref={ref}>
        {items.map((x, n) => (
          <li key={x.id} className="cs-rail__item">
            <button type="button" className="cs-phone" onClick={() => onOpen(items, n, 'mobile')} aria-label={`${w.open}: ${x.caption}`}>
              <span className="cs-phone__screen">
                <img src={x.src} alt="" width={x.w} height={x.h} loading="lazy" decoding="async" style={{ '--pan': `${Math.max(0, 1 - 844 / x.h) * -100}%` }} />
              </span>
            </button>
            <p className="cs-rail__cap">
              <span className="label__index">{pad(n + 1)}</span> {x.caption}
            </p>
          </li>
        ))}
      </ol>
      <div className="cs-mob__foot">
        <p className="cs-mob__hint">{w.swipe}</p>
        <div className="cs-arrows">
          <ArrowBtn dir={-1} label={w.prev} onClick={() => scroll(-1)} />
          <ArrowBtn dir={1} label={w.next} onClick={() => scroll(1)} />
        </div>
      </div>
    </div>
  );
}

/** The component sheets of the board. */
function KitGrid({ cs, c, w, onOpen }) {
  const items = cs.kit.map((x) => ({ ...x, caption: c.kit[x.id].t }));
  return (
    <ul className="cs-kit">
      {items.map((x, n) => (
        <li key={x.id} className={`cs-kit__item cs-kit__item--${x.id}`}>
          <button type="button" className="cs-kit__media" onClick={() => onOpen(items, n, 'kit')} aria-label={`${w.open}: ${x.caption}`}>
            <img src={x.src} alt="" width={x.w} height={x.h} loading="lazy" decoding="async" />
          </button>
          <h5 className="cs-kit__t">{c.kit[x.id].t}</h5>
          <p className="cs-kit__d">{c.kit[x.id].d}</p>
        </li>
      ))}
    </ul>
  );
}

/** Prev / next button whose arrow follows the reading direction. */
export function ArrowBtn({ dir, label, onClick }) {
  const { isRTL } = useLanguage();
  const pointsRight = (dir > 0) !== isRTL;
  const Icon = pointsRight ? ChevronRight : ChevronLeft;
  return (
    <button type="button" className="cs-arrow" onClick={onClick} aria-label={label} title={label}>
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
