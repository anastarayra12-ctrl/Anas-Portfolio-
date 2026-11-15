import { useEffect, useRef } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { ProjectDevice } from './ProjectDevice';
import { latin } from '../../lib/text';
import './ProjectDialog.css';

/**
 * Project details in a native <dialog>: focus is trapped and restored, Esc closes,
 * the page behind is inert. Clicking the dimmed backdrop also closes it.
 */
export function ProjectDialog({ project, lang, labels, newTab, onClose }) {
  const ref = useRef(null);
  const c = project[lang];

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

  const onCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  const onBackdrop = (e) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <dialog
      ref={ref}
      className="pd"
      aria-labelledby="pd-title"
      onCancel={onCancel}
      onClick={onBackdrop}
      style={{ '--p-accent': project.accent, '--p-glow': project.glow }}
    >
      <div className="pd__panel">
        <header className="pd__top">
          <p className="label">
            <span className="label__index">{c.category}</span>
          </p>
          <button type="button" className="pd__close" onClick={onClose} aria-label={labels.close} title={labels.close}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="pd__hero">
          <div className="pd__heading">
            <h2 className="pd__title" id="pd-title">
              <span {...latin(c.title)}>{c.title}</span>
            </h2>
            <p className="pd__tagline">{c.tagline}</p>
            <a className="btn btn--primary pd__visit" href={project.url} target="_blank" rel="noreferrer">
              {labels.visit}
              <ArrowUpRight size={16} className="btn__ext" aria-hidden="true" />
              <span className="sr-only">{newTab}</span>
            </a>
          </div>
          <div className="pd__media">
            <ProjectDevice project={project} title={c.title} labels={labels} eager />
          </div>
        </div>

        <div className="pd__body">
          <div className="pd__main">
            <section className="pd__block">
              <h3 className="pd__h">{labels.overview}</h3>
              <p className="pd__lead">{c.summary}</p>
            </section>
            <div className="pd__pair">
              <section className="pd__block">
                <h3 className="pd__h">{labels.goal}</h3>
                <p>{c.goal}</p>
              </section>
              <section className="pd__block">
                <h3 className="pd__h">{labels.idea}</h3>
                <p>{c.idea}</p>
              </section>
            </div>
            <section className="pd__block">
              <h3 className="pd__h">{labels.features}</h3>
              <ul className="pd__list">
                {c.features.map((f) => (
                  <li key={f}>
                    <span className="diamond" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="pd__aside">
            <section className="pd__contribution">
              <h3 className="pd__h">{labels.contribution}</h3>
              <ul>
                {c.contribution.map((x) => (
                  <li key={x}>
                    <Check size={16} aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </section>
            <dl className="pd__facts">
              <div>
                <dt>{labels.role}</dt>
                <dd>{c.role}</dd>
              </div>
              <div>
                <dt>{labels.type}</dt>
                <dd>{c.type}</dd>
              </div>
              <div>
                <dt>{labels.live}</dt>
                <dd>
                  <a className="link" href={project.url} target="_blank" rel="noreferrer" dir="ltr">
                    {project.domain}
                  </a>
                </dd>
              </div>
            </dl>
            <section>
              <h3 className="pd__h">{labels.stack}</h3>
              <ul className="pd__stack">
                {project.stack.map((s) => (
                  <li key={s} className="tag" dir="ltr">
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <section className="pd__gallery" aria-label={labels.gallery}>
          <img src={`/projects/${project.id}-detail.webp`} alt={`${labels.desktop} ${c.title}`} width="1280" height="800" loading="lazy" decoding="async" />
          <img src={`/projects/${project.id}-mobile.webp`} alt={`${labels.mobile} ${c.title}`} width="585" height="1266" loading="lazy" decoding="async" />
        </section>
      </div>
    </dialog>
  );
}
