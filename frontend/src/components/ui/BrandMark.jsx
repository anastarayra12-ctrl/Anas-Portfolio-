/**
 * Official brand symbol — geometry traced from Logo_Symbol_Colored_Transparent.png.
 * An "A" of two lines meeting at a point, three connection nodes and a central
 * diamond (the meeting point of design and technical execution).
 * Brand rule: never recolour, rotate, stretch or fade the colour version.
 */
export function BrandMark({ size = 32, mono = false, title, className }) {
  const c = mono
    ? { stroke: 'currentColor', top: 'currentColor', left: 'currentColor', right: 'currentColor', diamond: 'currentColor' }
    : { stroke: '#3B82F6', top: '#38BDF8', left: '#3B82F6', right: '#2563EB', diamond: '#38BDF8' };

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
      <g stroke={c.stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 14 L18 84 M50 14 L82 84" strokeWidth="4.6" />
        <path d="M38 48 L18 84 M62 48 L82 84" strokeWidth="6.2" />
      </g>
      <polygon points="50,50 57,58 50,66 43,58" fill={c.diamond} />
      <circle cx="50" cy="14" r="3.5" fill={c.top} />
      <circle cx="18" cy="84" r="3.5" fill={c.left} />
      <circle cx="82" cy="84" r="3.5" fill={c.right} />
    </svg>
  );
}
