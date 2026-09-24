import { PenTool, Code2, Workflow, BadgeCheck, Hourglass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import './Stack.css';

const icons = { design: PenTool, engineering: Code2, workflow: Workflow };

export function Stack() {
  const { t } = useLanguage();
  const s = t.stack;

  return (
    <section className="section stack" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <SectionHead id="stack" index={s.index} kicker={s.kicker} title={s.title} intro={s.intro} />

        <p className="stack__legend" aria-hidden="true">
          <span>
            <i className="stack__state stack__state--using" /> {s.using}
          </span>
          <span>
            <i className="stack__state stack__state--learning" /> {s.learning}
          </span>
        </p>

        <div className="stack__grid">
          {s.disciplines.map((d, i) => {
            const Icon = icons[d.key];
            return (
              <Reveal as="article" key={d.key} className={`disc disc--${d.key}`} delay={i * 0.08} aria-labelledby={`disc-${d.key}`}>
                <header className="disc__head">
                  <span className="disc__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="disc__name" id={`disc-${d.key}`}>
                      {d.name}
                    </h3>
                    <p className="disc__purpose">{d.purpose}</p>
                  </div>
                  <span className="disc__index" aria-hidden="true">
                    0{i + 1}
                  </span>
                </header>

                <h4 className="disc__sub">{s.toolsLabel}</h4>
                <ul className="disc__tools">
                  {d.tools.map((tool) => (
                    <li key={tool.t} className="tool">
                      <i className={`stack__state stack__state--${tool.learning ? 'learning' : 'using'}`} aria-hidden="true" />
                      <span className="tool__name" dir="auto">
                        {tool.t}
                      </span>
                      {tool.note && <span className="tool__note">{tool.note}</span>}
                      <span className="sr-only">— {tool.learning ? s.learning : s.using}</span>
                    </li>
                  ))}
                </ul>

                <div className="disc__learned">
                <h4 className="disc__sub">{s.learnedLabel}</h4>
                <ul className="disc__certs">
                  {d.certs.map((c) => (
                    <li key={c.title} className={`cred${c.live ? ' cred--live' : ''}`}>
                      <span className="cred__icon" aria-hidden="true">
                        {c.live ? <Hourglass size={15} strokeWidth={1.75} /> : <BadgeCheck size={15} strokeWidth={1.75} />}
                      </span>
                      <div className="cred__body">
                        <p className="cred__title" dir="auto">
                          {c.title}
                        </p>
                        <p className="cred__meta">
                          {c.org}
                          {c.by && (
                            <>
                              <span aria-hidden="true"> · </span>
                              {s.reviewed} {c.by}
                            </>
                          )}
                        </p>
                      </div>
                      <span className="cred__date">{c.date}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
