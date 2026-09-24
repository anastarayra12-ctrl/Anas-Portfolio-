import { Reveal } from './Reveal';

export function SectionHead({ id, index, kicker, title, intro }) {
  return (
    <header className="section-head">
      <Reveal className="section-head__title">
        <p className="kicker">
          <span className="kicker__index">{index}</span>
          <span className="kicker__rule" aria-hidden="true" />
          <span>{kicker}</span>
        </p>
        <h2 className="h2" id={`${id}-title`}>
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal className="section-head__intro" delay={0.08}>
          <p className="lead">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
