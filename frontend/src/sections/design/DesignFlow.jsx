import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Reveal } from '../../components/ui/Reveal';

/** Booking journey (4 steps + how errors are handled) and the design foundations. */
export function DesignFlow({ cs, c, w }) {
  return (
    <div className="cs-flow">
      <Reveal className="cs-journey">
        <div className="cs-journey__head">
          <h4 className="cs__h">{w.journeyTitle}</h4>
          <p className="cs-journey__sub">{w.journeySub}</p>
        </div>
        <ol className="cs-steps">
          {c.journey.map((s, i) => (
            <li key={s.t} className={`cs-step${i === c.journey.length - 1 ? ' is-last' : ''}`}>
              <span className="cs-step__n">{i + 1}</span>
              <h5 className="cs-step__t">{s.t}</h5>
              <p className="cs-step__d">{s.d}</p>
            </li>
          ))}
        </ol>
        <dl className="cs-rules">
          {c.rules.map((r) => (
            <div key={r.k}>
              <dt>{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="cs-found">
        <h4 className="cs__h">{w.foundationsTitle}</h4>
        <div className="cs-found__grid">
          <div className="cs-found__col">
            <p className="cs-found__label">{w.colorsLabel}</p>
            <ul className="cs-swatches">
              {cs.colors.map((col) => (
                <Swatch key={col.key} hex={col.hex} name={c.colors[col.key]} />
              ))}
            </ul>

            <div className="cs-found__row">
              <div>
                <p className="cs-found__label">{w.typeLabel}</p>
                <p className="cs-type" dir="ltr">
                  {cs.typeface}
                </p>
              </div>
              <div>
                <p className="cs-found__label">{w.spacingLabel}</p>
                <ul className="cs-space" dir="ltr">
                  {cs.spacing.map((n) => (
                    <li key={n}>
                      <span className="cs-space__box" style={{ '--n': n }} aria-hidden="true" />
                      <span className="cs-space__n">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <dl className="cs-principles">
            {c.principles.map((p) => (
              <div key={p.k}>
                <dt>{p.k}</dt>
                <dd>{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </div>
  );
}

/** A colour swatch; click copies the hex value. */
function Swatch({ hex, name }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable — the value is visible anyway */
    }
  };
  return (
    <li>
      <button type="button" className="cs-swatch" onClick={copy} title={hex}>
        <span className="cs-swatch__chip" style={{ background: hex }} aria-hidden="true" />
        <span className="cs-swatch__name">{name}</span>
        <span className="cs-swatch__hex" dir="ltr">
          {hex}
          {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
        </span>
      </button>
    </li>
  );
}
