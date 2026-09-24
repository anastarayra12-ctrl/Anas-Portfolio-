import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { links } from '../content/site';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import { GitHubIcon } from './ui/Icons';
import { PortfolioPreview, BrandPreview } from './ProjectPreviews';
import './Work.css';

const previews = { portfolio: PortfolioPreview, brand: BrandPreview };

function CaseStudy({ project, labels, index, newTab }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Preview = previews[project.id];

  return (
    <Reveal as="article" className={`case${open ? ' is-open' : ''}`} aria-labelledby={`${panelId}-title`}>
      <div className="case__main">
        <div className="case__visual">
          <Preview />
        </div>

        <div className="case__info">
          <p className="case__meta">
            <span className="case__index">{String(index + 1).padStart(2, '0')}</span>
            <span>{project.kind}</span>
            <span className="case__dot" aria-hidden="true" />
            <span>{project.year}</span>
          </p>
          <h3 className="case__title" id={`${panelId}-title`}>
            {project.title}
          </h3>
          <p className="case__summary">{project.summary}</p>

          <dl className="case__facts">
            <div>
              <dt>{labels.role}</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>{labels.stack}</dt>
              <dd>
                <ul className="case__tags">
                  {project.stack.map((s) => (
                    <li key={s} className="tag">
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="case__actions">
            <button
              type="button"
              className="btn btn--secondary case__toggle"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? labels.close : labels.open}
              <Plus size={16} className="case__plus" aria-hidden="true" />
            </button>
            {project.link && (
              <a className="link" href={project.link.href} target="_blank" rel="noopener noreferrer">
                {labels.live}
                <ArrowUpRight size={15} className="ext" aria-hidden="true" />
                <span className="sr-only">{newTab}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="case__panel"
            role="region"
            aria-labelledby={`${panelId}-title`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="case__detail">
              <div className="case__block case__block--problem">
                <h4>{labels.problem}</h4>
                <p>{project.problem}</p>
              </div>
              <div className="case__block">
                <h4>{labels.design}</h4>
                <ul className="case__list">
                  {project.design.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="case__block">
                <h4>{labels.dev}</h4>
                <ul className="case__list">
                  {project.dev.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="case__block">
                <h4>{labels.features}</h4>
                <ul className="case__tags">
                  {project.features.map((f) => (
                    <li key={f} className="tag tag--accent">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="case__block case__block--outcome">
                <h4>{labels.outcome}</h4>
                <p>{project.outcome}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export function Work() {
  const { t } = useLanguage();
  const w = t.work;

  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work" index={w.index} kicker={w.kicker} title={w.title} intro={w.intro} />

        <div className="work__list">
          {w.projects.map((p, i) => (
            <CaseStudy key={p.id} project={p} labels={w.labels} index={i} newTab={t.a11y.newTab} />
          ))}

          <Reveal className="work__empty">
            <span className="diamond" aria-hidden="true" />
            <div>
              <h3 className="work__empty-title">{w.empty.title}</h3>
              <p className="work__empty-text">{w.empty.text}</p>
            </div>
            <a className="btn btn--secondary btn--sm" href={links.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={16} />
              {w.empty.cta}
              <span className="sr-only">{t.a11y.newTab}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
