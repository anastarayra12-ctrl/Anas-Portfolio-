import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, m, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion';
import { Code2, PenTool, GripVertical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHead } from './ui/SectionHead';
import { Reveal } from './ui/Reveal';
import { BrandMark } from './ui/BrandMark';
import './About.css';

const sideIcon = { dev: Code2, design: PenTool };
const ease = [0.22, 1, 0.36, 1];

/* The same profile card, written as code… */
function CodeView() {
  const k = (s) => <span className="tk-k">{s}</span>; // keyword
  const c = (s) => <span className="tk-c">{s}</span>; // component / tag
  const a = (s) => <span className="tk-a">{s}</span>; // attribute
  const v = (s) => <span className="tk-v">{s}</span>; // string
  const g = (s) => <span className="tk-g">{s}</span>; // comment
  return (
    <pre className="split__code" aria-hidden="true">
      {g('// ProfileCard.jsx')}
      {'\n'}
      {k('export function')} {c('ProfileCard')}() {'{'}
      {'\n  '}
      {k('return')} (
      {'\n    '}&lt;{c('article')} {a('className')}={v('"card"')}&gt;
      {'\n      '}&lt;{c('Avatar')} {a('mark')}={v('"A"')} /&gt;
      {'\n      '}&lt;{c('h3')}&gt;Anas Tarayra&lt;/{c('h3')}&gt;
      {'\n      '}&lt;{c('p')}&gt;Full Stack Developer
      {'\n         '}&amp; UI/UX Designer&lt;/{c('p')}&gt;
      {'\n      '}&lt;{c('Status')} {a('online')}&gt;Available&lt;/{c('Status')}&gt;
      {'\n      '}&lt;{c('Button')} {a('variant')}={v('"primary"')}&gt;
      {'\n        '}Let&apos;s build
      {'\n      '}&lt;/{c('Button')}&gt;
      {'\n    '}&lt;/{c('article')}&gt;
      {'\n  '});
      {'\n'}
      {'}'}
      {'\n\n'}
      {g('/* card.css */')}
      {'\n'}
      {c('.card')} {'{'} {a('padding')}: {v('24px')}; {a('radius')}: {v('24px')}; {'}'}
    </pre>
  );
}

/* …and as a designed frame on a canvas */
function DesignView({ s }) {
  return (
    <div className="split__design" aria-hidden="true">
      <div className="dcard-frame">
        <span className="dcard-frame__tag">ProfileCard</span>
        {['tl', 'tr', 'bl', 'br'].map((p) => (
          <i key={p} className={`dcard-frame__h dcard-frame__h--${p}`} />
        ))}
        <span className="dcard-frame__pad dcard-frame__pad--top">24</span>
        <span className="dcard-frame__pad dcard-frame__pad--left">24</span>
        <div className="dcard">
          <span className="dcard__avatar">
            <BrandMark size={26} />
          </span>
          <p className="dcard__name">Anas Tarayra</p>
          <p className="dcard__role">{s.role}</p>
          <span className="dcard__status">
            <i /> {s.status}
          </span>
          <span className="dcard__btn">{s.cta}</span>
        </div>
      </div>
      <div className="dcard-tokens">
        {['#0B0B0B', '#2563EB', '#3B82F6', '#38BDF8'].map((hex) => (
          <span key={hex} className="dcard-tokens__sw" style={{ '--sw': hex }} title={hex} />
        ))}
        <span className="dcard-tokens__type">Space Grotesk</span>
      </div>
    </div>
  );
}

function CodeDesignSplit({ s, target }) {
  const reduce = useReducedMotion();
  const stageRef = useRef(null);
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, margin: '0px 0px -20% 0px' });
  const pos = useMotionValue(50);
  const posPct = useTransform(pos, (v) => `${v}%`);
  const [side, setSide] = useState('both');
  const dragging = useRef(false);

  useMotionValueEvent(pos, 'change', (v) => setSide(v > 64 ? 'dev' : v < 36 ? 'design' : 'both'));

  const go = useCallback(
    (to, opts = {}) => (reduce ? pos.set(to) : animate(pos, to, { duration: 0.7, ease, ...opts })),
    [pos, reduce],
  );

  // A one-time demo when it scrolls into view: show code, then design, then both.
  useEffect(() => {
    if (!inView || reduce) return undefined;
    let cancelled = false;
    (async () => {
      await new Promise((r) => setTimeout(r, 400));
      for (const to of [82, 18, 50]) {
        if (cancelled || dragging.current) return;
        await go(to, { duration: 0.9 });
        await new Promise((r) => setTimeout(r, 350));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inView, reduce, go]);

  // The cards below steer the slider
  useEffect(() => {
    if (target === 'dev') go(84);
    else if (target === 'design') go(16);
    else if (target === 'reset') go(50);
  }, [target, go]);

  const setFromX = (clientX) => {
    const r = stageRef.current.getBoundingClientRect();
    pos.set(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  };
  const onDown = (e) => {
    dragging.current = true;
    pos.stop();
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onMove = (e) => {
    if (dragging.current) setFromX(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };
  const onKey = (e) => {
    const step = e.shiftKey ? 20 : 5;
    const map = { ArrowLeft: -step, ArrowRight: step, ArrowDown: -step, ArrowUp: step };
    if (e.key in map) pos.set(Math.min(96, Math.max(4, pos.get() + map[e.key])));
    else if (e.key === 'Home') go(4);
    else if (e.key === 'End') go(96);
    else return;
    e.preventDefault();
  };

  return (
    <div className={`split split--${side}`} ref={rootRef}>
      <div className="split__labels" dir="ltr">
        <span className="split__label split__label--code">
          <Code2 size={14} aria-hidden="true" /> {s.code}
        </span>
        <span className="split__label split__label--design">
          {s.design} <PenTool size={14} aria-hidden="true" />
        </span>
      </div>
      <m.div
        className="split__stage"
        ref={stageRef}
        dir="ltr"
        style={{ '--pos': posPct }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <DesignView s={s} />
        <div className="split__code-layer">
          <CodeView />
        </div>
        <div
          className="split__handle"
          role="slider"
          tabIndex={0}
          aria-label={s.label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos.get())}
          aria-valuetext={side === 'dev' ? s.code : side === 'design' ? s.design : `${s.code} / ${s.design}`}
          onKeyDown={onKey}
        >
          <span className="split__knob">
            <GripVertical size={16} strokeWidth={2} aria-hidden="true" />
          </span>
        </div>
      </m.div>
      <p className="split__caption">{s.label}</p>
    </div>
  );
}

export function About() {
  const { t } = useLanguage();
  const a = t.about;
  const [target, setTarget] = useState(null);

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
            <CodeDesignSplit s={a.split} target={target} />
          </Reveal>
        </div>

        <div className="about__sides" onPointerLeave={() => setTarget('reset')}>
          {a.sides.map((side, i) => {
            const Icon = sideIcon[side.key];
            return (
              <Reveal
                as="article"
                key={side.key}
                className={`side side--${side.key}`}
                delay={i * 0.08}
                onPointerEnter={() => setTarget(side.key)}
                onFocus={() => setTarget(side.key)}
                tabIndex={-1}
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
