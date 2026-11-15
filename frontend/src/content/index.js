/**
 * Site content — the only place to edit text.
 *
 *   en.js / ar.js   interface copy for each language
 *   projects.js     the four projects (shared data + text per language)
 *   skills.js       tools, skill groups and certificates (from the CV)
 *   design.js       the UI/UX case study (screens cut from the design board)
 *   links.js        email, phone, social profiles, CV file
 *
 * Content rule: every fact comes from the CV, the live projects themselves or this
 * repository. Never add experience, skills, metrics or clients that cannot be verified.
 */
import en from './en';
import ar from './ar';

export { links } from './links';
export { projects } from './projects';
export { skillGroups, certificates, learningNow } from './skills';
export { caseStudy } from './design';

/** Page order = dock order. */
export const sectionIds = ['about', 'skills', 'projects', 'design', 'journey', 'contact'];

/** Process nodes of the brand mark (logo geometry → meaning). */
export const processIds = ['idea', 'design', 'build', 'product'];

export const content = { en, ar };
