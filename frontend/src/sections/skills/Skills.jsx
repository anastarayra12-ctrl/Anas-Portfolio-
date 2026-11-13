import { useState } from 'react';
import { BadgeCheck, Globe, ArrowUpRight, Sparkles, Code2, PenTool, GitBranch } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { certificates, learningNow, skillGroups } from '../../content';
import { SectionHead } from '../../components/ui/SectionHead';
import { Reveal } from '../../components/ui/Reveal';
import './Skills.css';

const groupIcon = { design: PenTool, frontend: Code2, ai: Sparkles, workflow: GitBranch };

/**
 * "What I Use" — four groups of tools, each tied to the certificates that taught it.
 * Depth is shown with evidence (certified · used in live projects), never with
 * made-up percentages. Hovering or focusing a tool lights up its certificates and
 * vice versa, so the visitor can see where each skill comes from.
 */
export function Skills() {
  const { t, lang } = useLanguage();
  const s = t.skills;

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills" index={s.index} kicker={s.kicker} title={s.title} intro={s.intro} />

        <Reveal as="ul" className="skills__legend" aria-hidden="true">
          <li>
            <BadgeCheck size={15} /> {s.legend.certified}
          </li>
          <li>
            <Globe size={15} /> {s.legend.live}
          </li>
          <li>
            <span className="skills__legend-dot" /> {s.legend.learning}
          </li>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.key} group={g} index={i} lang={lang} s={s} />
          ))}
        </div>

        <Reveal className="learning">
          <div className="learning__media">
            <img src={learningNow.image} alt="" loading="lazy" decoding="async" width="160" height="113" />
          </div>
          <div className="learning__body">
            <p className="label learning__label">
              <span className="learning__pulse" aria-hidden="true" />
              {s.learningTitle}
            </p>
            <h3 className="learning__title">{learningNow.title[lang]}</h3>
            <p className="learning__meta">
              {learningNow.org[lang]} · {s.reviewed} {learningNow.by[lang]}
            </p>
          </div>
          <div className="learning__side">
            <ul className="learning__topics">
              {learningNow.topics.map((topic) => (
                <li key={topic} className="tag" dir="ltr">
                  {topic}
                </li>
              ))}
            </ul>
            <span className="learning__bar" aria-hidden="true" />
            <span className="learning__status">{s.inProgress}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SkillCard({ group, index, lang, s }) {
  const [hover, setHover] = useState(null); // { tool } | { cert }
  const Icon = groupIcon[group.key];
  const certIds = [...new Set(group.tools.flatMap((tool) => tool.certs ?? []))];

  const toolLit = (tool) => hover && (hover.tool === tool.name || (hover.cert && tool.certs?.includes(hover.cert)));
  const certLit = (id) => hover && (hover.cert === id || group.tools.some((tool) => tool.name === hover.tool && tool.certs?.includes(id)));
  const clear = () => setHover(null);

  return (
    <Reveal as="article" className={`skill-card${hover ? ' is-tracing' : ''}`} delay={(index % 2) * 0.08} aria-labelledby={`skill-${group.key}`}>
      <header className="skill-card__head">
        <span className="skill-card__icon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <span className="label__index">0{index + 1}</span>
        <span className="skill-card__count">
          {group.tools.length} {group.tools.length === 1 ? s.tool : s.tools}
        </span>
      </header>
      <h3 className="skill-card__title" id={`skill-${group.key}`}>
        {group.name[lang]}
      </h3>
      <p className="skill-card__purpose">{group.purpose[lang]}</p>

      <ul className="tools">
        {group.tools.map((tool) => (
          <li
            key={tool.name}
            className={`tool${toolLit(tool) ? ' is-lit' : ''}`}
            tabIndex={tool.certs ? 0 : undefined}
            onPointerEnter={() => setHover({ tool: tool.name })}
            onPointerLeave={clear}
            onFocus={() => setHover({ tool: tool.name })}
            onBlur={clear}
          >
            <span className="tool__name" dir="ltr">
              {tool.name}
            </span>
            <span className="tool__note">{tool.note[lang]}</span>
            <span className="tool__marks">
              {tool.certs && (
                <span className="tool__mark" title={s.legend.certified}>
                  <BadgeCheck size={15} aria-hidden="true" />
                  <span className="sr-only">{s.legend.certified}</span>
                </span>
              )}
              {tool.live && (
                <span className="tool__mark tool__mark--live" title={s.legend.live}>
                  <Globe size={15} aria-hidden="true" />
                  <span className="sr-only">{s.legend.live}</span>
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="skill-card__certs">
        <p className="skill-card__certs-label">{certIds.length ? s.certs : s.noCerts}</p>
        {certIds.length > 0 && (
          <ul className="certs">
            {certIds.map((id) => {
              const c = certificates[id];
              const body = (
                <>
                  <span className="cert__thumb" aria-hidden="true">
                    {c.image ? <img src={c.image} alt="" loading="lazy" decoding="async" width="56" height="40" /> : <BadgeCheck size={18} />}
                  </span>
                  <span className="cert__text">
                    <span className="cert__title">{c.title[lang]}</span>
                    <span className="cert__meta">
                      {c.org[lang]} · {c.year}
                      {c.by ? ` · ${s.reviewed} ${c.by[lang]}` : ''}
                    </span>
                  </span>
                  {c.image && <ArrowUpRight size={15} className="cert__go" aria-hidden="true" />}
                </>
              );
              const hoverProps = {
                onPointerEnter: () => setHover({ cert: id }),
                onPointerLeave: clear,
                onFocus: () => setHover({ cert: id }),
                onBlur: clear,
              };
              return (
                <li key={id} className={`cert${certLit(id) ? ' is-lit' : ''}`}>
                  {c.image ? (
                    <a href={c.image} target="_blank" rel="noreferrer" className="cert__inner" aria-label={`${s.viewCert}: ${c.title[lang]}`} {...hoverProps}>
                      {body}
                    </a>
                  ) : (
                    <span className="cert__inner" {...hoverProps}>
                      {body}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Reveal>
  );
}
