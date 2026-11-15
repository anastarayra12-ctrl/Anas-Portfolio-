import { useCallback, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { caseStudy } from '../../content';
import { track } from '../../lib/analytics';
import { SectionHead } from '../../components/ui/SectionHead';
import { Reveal } from '../../components/ui/Reveal';
import { DesignScreens } from './DesignScreens';
import { DesignFlow } from './DesignFlow';
import { DesignLightbox } from './DesignLightbox';
import './Design.css';

/**
 * "What I've Designed" — a UI/UX case study presented from its design board:
 * intro + key numbers, every screen (desktop / mobile / components) with a
 * full-size viewer, the booking journey and the design foundations.
 */
export function Design() {
  const { t, lang } = useLanguage();
  const w = t.design;
  const cs = caseStudy;
  const c = cs[lang];
  const [box, setBox] = useState(null); // { items: [{ src, w, h, caption }], index }

  const openBox = useCallback((items, index, kind) => {
    setBox({ items, index });
    track('design_open', { kind, index });
  }, []);
  const closeBox = useCallback(() => setBox(null), []);

  const desktopItems = cs.desktop.map((s) => ({ ...s, caption: c.screens[s.id] }));
  const boardItem = [{ src: cs.board, w: cs.boardSize.w, h: cs.boardSize.h, caption: c.title, wide: true }];

  return (
    <section className="section design" id="design" aria-labelledby="design-title">
      <div className="container">
        <SectionHead id="design" index={w.index} kicker={w.kicker} title={w.title} intro={w.intro} count="01" />

        <article className="cs" aria-labelledby="cs-title">
          <div className="cs__intro">
            <Reveal className="cs__copy">
              <div className="cs__brand">
                <span className="cs__logo">
                  <img src={cs.logo} alt={c.name} width="189" height="63" loading="lazy" decoding="async" />
                </span>
                <p className="label">
                  <span className="label__index">{c.category}</span>
                </p>
              </div>
              <h3 className="cs__title" id="cs-title">
                {c.title}
              </h3>
              <p className="cs__tagline" dir="rtl" lang="ar">
                {cs.ar.tagline}
              </p>
              {lang !== 'ar' && <p className="cs__tagline-tr">{c.tagline}</p>}
              <p className="cs__summary">{c.summary}</p>
              <dl className="cs__facts">
                {c.facts.map((f) => (
                  <div key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="cs__actions">
                <button type="button" className="btn btn--primary" onClick={() => openBox(boardItem, 0, 'board')}>
                  {w.board}
                  <Maximize2 size={15} aria-hidden="true" />
                </button>
              </div>
            </Reveal>

            <Reveal className="cs__media" delay={0.12}>
              <button type="button" className="cs__device" onClick={() => openBox(desktopItems, 0, 'desktop')} aria-label={`${w.open}: ${c.screens.home}`}>
                <span className="device">
                  <span className="device__browser">
                    <span className="device__bar" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <span className="device__url">{c.name}</span>
                    </span>
                    <img className="device__shot" src={cs.desktop[0].src} alt="" width="1440" height="1224" loading="lazy" decoding="async" />
                  </span>
                  <span className="device__phone">
                    <img src={cs.mobile[0].src} alt="" width="390" height="980" loading="lazy" decoding="async" />
                  </span>
                </span>
              </button>
            </Reveal>
          </div>

          <ul className="cs__stats">
            {cs.stats.map((s, i) => (
              <Reveal as="li" key={s.key} className="cs__stat" delay={i * 0.06}>
                <span className="cs__stat-n">{s.n}</span>
                <span className="cs__stat-k">{w.stats[s.key]}</span>
              </Reveal>
            ))}
          </ul>

          <DesignScreens cs={cs} c={c} w={w} onOpen={openBox} />
          <DesignFlow cs={cs} c={c} w={w} />

          <p className="cs__note">{c.note}</p>
        </article>
      </div>

      {box && <DesignLightbox items={box.items} start={box.index} labels={w} onClose={closeBox} />}
    </section>
  );
}
