import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { UserRound, Layers, LayoutGrid, Route, MessageSquareText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useActiveSection } from '../hooks/useActiveSection';
import { sectionIds } from '../content/site';
import './Dock.css';

const icons = { about: UserRound, stack: Layers, work: LayoutGrid, journey: Route, contact: MessageSquareText };

/**
 * Floating section dock — the only place the five sections are navigated from.
 * Tracks the section in view, supports arrow / Home / End keys (RTL-aware).
 * It stays out of the hero (which has its own actions) so it never covers the
 * hero CTAs, and slides in as soon as the visitor heads into the content.
 */
export function Dock() {
  const { t, isRTL } = useLanguage();
  const active = useActiveSection(sectionIds);
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.35);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const onKeyDown = (e) => {
    const items = [...listRef.current.querySelectorAll('a')];
    const i = items.indexOf(document.activeElement);
    if (i < 0) return;
    const fwd = isRTL ? 'ArrowLeft' : 'ArrowRight';
    const back = isRTL ? 'ArrowRight' : 'ArrowLeft';
    let next = null;
    if (e.key === fwd) next = (i + 1) % items.length;
    else if (e.key === back) next = (i - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next !== null) {
      e.preventDefault();
      items[next].focus();
    }
  };

  return (
    <motion.nav
      className="dock"
      aria-label={t.a11y.sections}
      inert={!visible}
      aria-hidden={!visible || undefined}
      initial={false}
      animate={visible ? { y: 0, opacity: 1 } : { y: reduce ? 0 : 32, opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <ul className="dock__list" ref={listRef} onKeyDown={onKeyDown}>
        {sectionIds.map((id, i) => {
          const Icon = icons[id];
          const isActive = active === id;
          return (
            <li key={id} className="dock__item">
              <a href={`#${id}`} className={`dock__link${isActive ? ' is-active' : ''}`} aria-current={isActive ? 'location' : undefined}>
                {isActive && (
                  <motion.span layoutId="dock-active" className="dock__active" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                )}
                <span className="dock__icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="dock__label">
                  <span className="dock__num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {t.dock[id]}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
