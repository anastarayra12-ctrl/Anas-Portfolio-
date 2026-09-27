import { Code2, PenTool } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import { IdBadge } from './IdBadge';
import './About.css';

const sideIcon = { dev: Code2, design: PenTool };

export function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about" index={a.index} kicker={a.kicker} title={a.title} />

        <div className="about__grid">
          <Reveal className="about__intro">
            <h3 className="about__intro-title">
              <span className="diamond" aria-hidden="true" />
              {a.intro.title}
            </h3>
            <p className="about__intro-text">{a.intro.text}</p>
            <blockquote className="about__quote">
              <p>“{a.quote}”</p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <IdBadge s={a.badge} name={t.header.name} />
          </Reveal>
        </div>

        <div className="about__sides">
          {a.sides.map((side, i) => {
            const Icon = sideIcon[side.key];
            return (
              <Reveal
                as="article"
                key={side.key}
                className={`side side--${side.key}`}
                delay={i * 0.08}
              >
                <div className="side__head">
                  <span className="side__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="side__num" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="side__title">{side.title}</h3>
                <p className="side__text">{side.text}</p>
                <ul className="side__tags">
                  {side.tags.map((tag) => (
                    <li key={tag} dir="auto">
                      <bdi>{tag}</bdi>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
