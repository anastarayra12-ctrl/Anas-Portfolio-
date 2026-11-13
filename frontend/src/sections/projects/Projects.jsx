import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../content';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { track } from '../../lib/analytics';
import { SectionHead } from '../../components/ui/SectionHead';
import { ProjectStage } from './ProjectStage';
import { ProjectList } from './ProjectList';
import { ProjectDialog } from './ProjectDialog';
import './Projects.css';

const HASH = '#projects/';
const idFromHash = () => {
  const h = window.location.hash;
  return h.startsWith(HASH) && projects.some((p) => p.id === h.slice(HASH.length)) ? h.slice(HASH.length) : null;
};

/**
 * "What I've Built". Large screens get the 3D scroll stage; phones, tablets in
 * portrait and reduced-motion visitors get a lighter list with the same content.
 * Each project opens a detail dialog with its own shareable URL (#projects/<id>).
 */
export function Projects() {
  const { t, lang } = useLanguage();
  const w = t.projects;
  const reduce = useReducedMotion();
  const roomy = useMediaQuery('(min-width: 64rem) and (min-height: 36rem)');
  const [openId, setOpenId] = useState(idFromHash);

  useEffect(() => {
    const onPop = () => setOpenId(idFromHash());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const open = useCallback((id) => {
    setOpenId(id);
    track('project_open', { id });
    window.history.pushState(null, '', `${window.location.search}${HASH}${id}`);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    if (window.location.hash.startsWith(HASH)) window.history.replaceState(null, '', `${window.location.search}#projects`);
  }, []);

  const project = projects.find((p) => p.id === openId);
  const count = `${String(projects.length).padStart(2, '0')}`;

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead id="projects" index={w.index} kicker={w.kicker} title={w.title} intro={w.intro} count={count} />
      </div>

      {roomy && !reduce ? (
        <ProjectStage list={projects} lang={lang} labels={w.labels} newTab={t.a11y.newTab} onOpen={open} />
      ) : (
        <ProjectList list={projects} lang={lang} labels={w.labels} newTab={t.a11y.newTab} onOpen={open} />
      )}

      {project && <ProjectDialog key={project.id} project={project} lang={lang} labels={w.labels} newTab={t.a11y.newTab} onClose={close} />}
    </section>
  );
}
