/**
 * Official brand symbol — Brand Identity v3.0 "Deep Blue". An "A" of two lines meeting
 * at a point, three connection nodes and a central diamond (where design meets
 * technical execution). Dark Blue, with a Navy diamond on light grounds: colours come
 * from the --mark-* tokens in styles/tokens.css. Never recolour, rotate or stretch it.
 */
export function BrandMark({ size = 32, mono = false, title, className }) {
  const c = mono
    ? { stroke: 'currentColor', top: 'currentColor', left: 'currentColor', right: 'currentColor', diamond: 'currentColor' }
    : { stroke: 'var(--mark-stroke)', top: 'var(--mark-top)', left: 'var(--mark-left)', right: 'var(--mark-right)', diamond: 'var(--mark-diamond)' };

  return (
    <svg
      width={size}
      height={size}
      viewBox="12 8 76 82"
      fill="none"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g style={{ stroke: c.stroke }} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 14 L18 84 M50 14 L82 84" strokeWidth="4.6" />
        <path d="M38 48 L18 84 M62 48 L82 84" strokeWidth="6.2" />
      </g>
      <polygon points="50,50 57,58 50,66 43,58" style={{ fill: c.diamond }} />
      <circle cx="50" cy="14" r="3.5" style={{ fill: c.top }} />
      <circle cx="18" cy="84" r="3.5" style={{ fill: c.left }} />
      <circle cx="82" cy="84" r="3.5" style={{ fill: c.right }} />
    </svg>
  );
}
