import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { links } from '../content/site';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import { GitHubIcon } from './ui/Icons';
import { PortfolioPreview, BrandPreview } from './ProjectPreviews';
import './Work.css';

const previews = { portfolio: PortfolioPreview, brand: BrandPreview };
const ease = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ Card */
function ProjectCard({ project, index, labels, onOpen }) {
  const Preview = previews[project.id];
  return (
    <Reveal as="article" className="wcard" delay={index * 0.08}>
      <button type="button" className="wcard__hit" onClick={(e) => onOpen(project.id, e.currentTarget)} aria-haspopup="dialog">
        <span className="sr-only">
          {labels.open}: {project.title}
        </span>
      </button>
      <div className="wcard__visual">
        <Preview />
        <span className="wcard__status">
          <i aria-hidden="true" />
          {project.status}
        </span>
      </div>
      <div className="wcard__body">
        <p className="wcard__meta">
          <span className="wcard__index">{String(index + 1).padStart(2, '0')}</span>
          <span>{project.kind}</span>
          <span className="wcard__dot" aria-hidden="true" />
          <span>{project.year}</span>
        </p>
        <h3 className="wcard__title">{project.title}</h3>
        <p className="wcard__summary">{project.summary}</p>
        <ul className="wcard__tags">
          {project.stack.slice(0, 4).map((s) => (
            <li key={s}>{s}</li>
          ))}
          {project.stack.length > 4 && <li className="wcard__more">+{project.stack.length - 4}</li>}
        </ul>
        <span className="wcard__cta" aria-hidden="true">
          {labels.open}
          <span className="wcard__cta-icon">
            <Plus size={16} strokeWidth={2} />
          </span>
        </span>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- Dialog */
function ProjectDialog({ project, labels, newTab, onClose }) {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const Preview = previews[project.id];

  // Scroll lock, Escape, focus trap
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const f = [...panelRef.current.querySelectorAll('a[href], button:not([disabled])')];
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const meta = [
    { k: labels.role, v: project.role },
    { k: labels.type, v: project.kind },
    { k: labels.year, v: project.year },
    { k: labels.status, v: project.status },
  ];

  return (
    <m.div
      className="pdlg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <m.div
        ref={panelRef}
        className="pdlg__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdlg-title"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.45, ease }}
      >
        <button ref={closeRef} type="button" className="pdlg__close" onClick={onClose} aria-label={labels.close}>
          <X size={20} strokeWidth={2} />
        </button>

        <div className="pdlg__scroll">
          <div className="pdlg__visual">
            <Preview />
          </div>

          <div className="pdlg__content">
            <header className="pdlg__head">
              <p className="wcard__meta">
                <span>{project.kind}</span>
                <span className="wcard__dot" aria-hidden="true" />
                <span>{project.year}</span>
              </p>
              <h2 className="pdlg__title" id="pdlg-title">
                {project.title}
              </h2>
              <p className="pdlg__summary">{project.summary}</p>
              {(project.link || project.repo) && (
                <div className="pdlg__actions">
                  {project.link && (
                    <a className="btn btn--primary btn--sm" href={project.link.href} target="_blank" rel="noopener noreferrer">
                      {labels.live}
                      <ArrowUpRight size={15} aria-hidden="true" />
                      <span className="sr-only">{newTab}</span>
                    </a>
                  )}
                  {project.repo && (
                    <a className="btn btn--secondary btn--sm" href={project.repo} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon size={15} />
                      {labels.repo}
                      <span className="sr-only">{newTab}</span>
                    </a>
                  )}
                </div>
              )}
            </header>

            <dl className="pdlg__meta">
              {meta.map((x) => (
                <div key={x.k}>
                  <dt>{x.k}</dt>
                  <dd>{x.v}</dd>
                </div>
              ))}
            </dl>

            <section className="pdlg__block">
              <h3 className="pdlg__label">{labels.problem}</h3>
              <p className="pdlg__lead">{project.problem}</p>
            </section>

            {project.highlights?.length > 0 && (
              <section className="pdlg__block">
                <h3 className="pdlg__label">{labels.highlights}</h3>
                <ol className="pdlg__highlights">
                  {project.highlights.map((h, i) => (
                    <li key={h.t}>
                      <span className="pdlg__hl-n">{String(i + 1).padStart(2, '0')}</span>
                      <strong>{h.t}</strong>
                      <p>{h.d}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <div className="pdlg__two">
              <section className="pdlg__block">
                <h3 className="pdlg__label">{labels.design}</h3>
                <ul className="pdlg__list">
                  {project.design.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
              <section className="pdlg__block">
                <h3 className="pdlg__label">{labels.dev}</h3>
                <ul className="pdlg__list">
                  {project.dev.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
            </div>

            {project.engineering?.length > 0 && (
              <section className="pdlg__block">
                <h3 className="pdlg__label">{labels.engineering}</h3>
                <dl className="pdlg__eng">
                  {project.engineering.map((e) => (
                    <div key={e.k}>
                      <dt>{e.k}</dt>
                      <dd>{e.v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <section className="pdlg__block">
              <h3 className="pdlg__label">{labels.stack}</h3>
              <ul className="wcard__tags wcard__tags--lg">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>

            <section className="pdlg__block pdlg__outcome">
              <h3 className="pdlg__label">{labels.outcome}</h3>
              <p>{project.outcome}</p>
            </section>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}

/* --------------------------------------------------------------- Section */
export function Work() {
  const { t } = useLanguage();
  const w = t.work;
  const [openId, setOpenId] = useState(null);
  const opener = useRef(null);
  const project = w.projects.find((p) => p.id === openId);

  const open = useCallback((id, el) => {
    opener.current = el;
    setOpenId(id);
  }, []);
  const close = useCallback(() => setOpenId(null), []);

  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work" index={w.index} kicker={w.kicker} title={w.title} intro={w.intro} />

        <div className="work__grid">
          {w.projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} labels={w.labels} onOpen={open} />
          ))}

          <Reveal as="article" className="wcard wcard--empty" delay={w.projects.length * 0.08}>
            <span className="wcard__empty-mark" aria-hidden="true">
              <span className="diamond" />
            </span>
            <h3 className="wcard__title">{w.empty.title}</h3>
            <p className="wcard__summary">{w.empty.text}</p>
            <a className="btn btn--secondary btn--sm" href={links.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={16} />
              {w.empty.cta}
              <span className="sr-only">{t.a11y.newTab}</span>
            </a>
          </Reveal>
        </div>
      </div>

      {createPortal(
        <AnimatePresence onExitComplete={() => opener.current?.focus({ preventScroll: true })}>
          {project && <ProjectDialog key={project.id} project={project} labels={w.labels} newTab={t.a11y.newTab} onClose={close} />}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
