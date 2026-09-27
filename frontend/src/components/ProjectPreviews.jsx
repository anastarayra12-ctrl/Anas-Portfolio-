/*
 * Project previews composed from real brand assets and site UI — no stock
 * imagery. Purely decorative; the case-study text carries the meaning.
 */
import { BrandMark } from './ui/BrandMark';

export function PortfolioPreview() {
  return (
    <div className="pv pv--site" aria-hidden="true">
      <div className="pv-browser">
        <div className="pv-browser__bar">
          <span className="pv-browser__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="pv-browser__url">anas-portfolio-rose-nine.vercel.app</span>
        </div>
        <div className="pv-site" dir="ltr">
          <div className="pv-site__nav">
            <BrandMark size={14} />
            <span className="pv-site__brand">Anas Tarayra</span>
            <span className="pv-site__links">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="pv-site__cta" />
          </div>
          <div className="pv-site__hero">
            <div className="pv-site__copy">
              <span className="pv-site__kicker">● AVAILABLE FOR WORK</span>
              <span className="pv-site__h1">
                ANAS
                <br />
                <em>TARAYRA</em>
              </span>
              <span className="pv-site__line" />
              <span className="pv-site__line pv-site__line--short" />
              <span className="pv-site__btns">
                <i />
                <i />
              </span>
            </div>
            <div className="pv-site__mark">
              <BrandMark size={84} />
            </div>
          </div>
        </div>
      </div>
      <div className="pv-phone" dir="ltr">
        <div className="pv-phone__screen">
          <BrandMark size={12} />
          <span className="pv-phone__h1">
            أنس <em>الطرايرة</em>
          </span>
          <span className="pv-site__line" />
          <span className="pv-site__line pv-site__line--short" />
          <span className="pv-phone__mark">
            <BrandMark size={44} />
          </span>
          <span className="pv-phone__rows">
            <i />
            <i />
            <i />
          </span>
          <span className="pv-phone__btn" />
        </div>
      </div>
    </div>
  );
}

const swatches = [
  { hex: '#0B0B0B', name: 'Black' },
  { hex: '#2563EB', name: 'Deep' },
  { hex: '#3B82F6', name: 'Accent' },
  { hex: '#38BDF8', name: 'Sky' },
  { hex: '#F5F4F1', name: 'Off white' },
];

export function BrandPreview() {
  return (
    <div className="pv pv--brand" aria-hidden="true" dir="ltr">
      <div className="pv-brand__tile pv-brand__tile--dark">
        <BrandMark size={96} />
        <span className="pv-brand__name-ar">أنس الطرايرة</span>
        <span className="pv-brand__name-en">ANAS TARAYRA</span>
      </div>
      <div className="pv-brand__tile pv-brand__tile--light">
        <BrandMark size={44} mono />
        <span className="pv-brand__spec">16 × 16 px min</span>
      </div>
      <div className="pv-brand__tile pv-brand__tile--type">
        <span className="pv-brand__aa">Aa</span>
        <span className="pv-brand__type-name">Space Grotesk · Lalezar · Changa</span>
      </div>
      <div className="pv-brand__palette">
        {swatches.map((s) => (
          <span key={s.hex} className="pv-brand__swatch" style={{ '--sw': s.hex }}>
            <b>{s.name}</b>
            {s.hex}
          </span>
        ))}
      </div>
    </div>
  );
}
