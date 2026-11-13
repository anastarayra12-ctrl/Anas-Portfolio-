import { useId } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import './Controls.css';

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Dark / light switch. The knob slides and its icon morphs between a sun and a
 * crescent moon (a mask circle slides over the sun's core while the rays retract).
 * Toggling plays the "design" transition, growing from the switch itself.
 */
export function ThemeSwitch() {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const maskId = useId();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={t.a11y.darkMode}
      title={dark ? t.a11y.themeToLight : t.a11y.themeToDark}
      className={`theme-switch is-${theme}`}
      onClick={(e) => toggleTheme(e.currentTarget.getBoundingClientRect())}
      dir="ltr"
    >
      <span className="theme-switch__stars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="theme-switch__knob" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" className="theme-switch__icon">
          <mask id={maskId}>
            <rect width="24" height="24" fill="#fff" />
            <circle className="theme-switch__cut" cx="17" cy="7" r="7" fill="#000" />
          </mask>
          <circle className="theme-switch__core" cx="12" cy="12" r="5" fill="currentColor" mask={`url(#${maskId})`} />
          <g className="theme-switch__rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {RAYS.map((deg) => (
              <line key={deg} x1="12" y1="2" x2="12" y2="4" transform={`rotate(${deg} 12 12)`} />
            ))}
          </g>
        </svg>
      </span>
    </button>
  );
}
