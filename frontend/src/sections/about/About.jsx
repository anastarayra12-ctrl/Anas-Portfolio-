import { Code2, PenTool } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SectionHead } from '../../components/ui/SectionHead';
import { Reveal } from '../../components/ui/Reveal';
import { IdBadge } from './IdBadge';
import './About.css';

const sideIcon = { dev: Code2, design: PenTool };

/** About — the CV summary, key facts, the two sides of the work and the ID badge. */
export function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about" index={a.index} kicker={a.kicker} title={a.title} />

        <div className="about__grid">
          <div className="about__copy">
            <Reveal as="p" className="about__lead">
              {a.lead}
            </Reveal>
            <Reveal as="p" className="about__body" delay={0.06}>
              {a.body}
            </Reveal>
            <Reveal as="dl" className="facts" delay={0.12}>
              {a.facts.map((f) => (
                <div className="facts__row" key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal className="about__badge" delay={0.1}>
            <IdBadge s={a.badge} name={t.header.name} />
          </Reveal>
        </div>

        <div className="about__sides">
          {a.sides.map((side, i) => {
            const Icon = sideIcon[side.key];
            return (
              <Reveal as="article" key={side.key} className={`side side--${side.key}`} delay={i * 0.08}>
                <div className="side__head">
                  <span className="side__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="label__index">0{i + 1}</span>
                </div>
                <h3 className="side__title">{side.title}</h3>
                <p className="side__text">{side.text}</p>
                <ul className="side__tags">
                  {side.tags.map((tag) => (
                    <li key={tag} className="tag" dir="ltr">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
          <Reveal as="blockquote" className="about__quote" delay={0.16}>
            <span className="diamond" aria-hidden="true" />
            <p>“{a.quote}”</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
