import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { ProjectDevice } from './ProjectDevice';
import { latin } from '../../lib/text';

/**
 * Phones, tablets and reduced motion: the same projects as a list. Each device
 * tilts up from a 3D angle into place as it scrolls in — transforms only, so it
 * stays smooth on mobile. Reduced motion shows them flat.
 */
export function ProjectList({ list, lang, labels, newTab, onOpen }) {
  return (
    <ol className="container project-list">
      {list.map((p, i) => (
        <ListItem key={p.id} project={p} index={i} total={list.length} lang={lang} labels={labels} newTab={newTab} onOpen={onOpen} />
      ))}
    </ol>
  );
}

function ListItem({ project, index, total, lang, labels, newTab, onOpen }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const c = project[lang];
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 60%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <li className="project-item" style={{ '--p-accent': project.accent, '--p-glow': project.glow }}>
      <div className="project-item__media" ref={ref}>
        <span className="project-item__glow" aria-hidden="true" />
        <m.button
          type="button"
          className="project-item__device"
          style={reduce ? undefined : { rotateX, scale, y }}
          onClick={() => onOpen(project.id)}
          aria-label={`${labels.details}: ${c.title}`}
        >
          <ProjectDevice project={project} title={c.title} labels={labels} />
        </m.button>
      </div>
      <div className="project-item__body">
        <p className="label">
          <span className="label__index">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span>{c.category}</span>
        </p>
        <h3 className="project-item__title">
          <span {...latin(c.title)}>{c.title}</span>
        </h3>
        <p className="project-item__summary">{c.summary}</p>
        <p className="project-item__role">
          <span>{labels.role}</span>
          {c.role}
        </p>
        <div className="project-item__actions">
          <button type="button" className="btn btn--primary" onClick={() => onOpen(project.id)}>
            {labels.details}
            <Maximize2 size={15} aria-hidden="true" />
          </button>
          <a className="btn btn--secondary" href={project.url} target="_blank" rel="noreferrer">
            {labels.visit}
            <ArrowUpRight size={16} className="btn__ext" aria-hidden="true" />
            <span className="sr-only">{newTab}</span>
          </a>
        </div>
      </div>
    </li>
  );
}
