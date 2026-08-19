import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Anas Personal Brand Logo Component
 * Supports standalone icon mode and seamless inline wordmark mode
 * where the SVG monogram A integrates pixel-perfectly with "nas Al-Tarayrah".
 */
export const AnasLogo = ({
  size = 'md',
  color = 'var(--accent-blue)',
  monochrome = false,
  showText = false,
  inlineWord = false,
  className = '',
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem('anas_logo_animated');
    if (!hasAnimated) {
      setShouldAnimate(true);
      sessionStorage.setItem('anas_logo_animated', 'true');
    }
  }, []);

  const primaryStroke = monochrome ? 'currentColor' : 'url(#anasLogoGradPrimary)';

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.4, ease: 'easeInOut' },
    },
  };

  // SVG Monogram Icon Component
  const MonogramSvg = ({ customStyle = {} }) => (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, ...customStyle }}
    >
      {!monochrome && (
        <defs>
          <linearGradient id="anasLogoGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      )}

      {/* Letter 'A' Framework */}
      {shouldAnimate ? (
        <motion.path
          d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48"
          stroke={primaryStroke}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      ) : (
        <path
          d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48"
          stroke={primaryStroke}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}

      {/* Central Vector Diamond & Vertices */}
      <polygon points="50,50 57,58 50,66 43,58" fill={monochrome ? 'currentColor' : '#38BDF8'} />
      <circle cx="50" cy="14" r="3.8" fill={monochrome ? 'currentColor' : '#38BDF8'} />
      <circle cx="18" cy="84" r="3.8" fill={monochrome ? 'currentColor' : '#3B82F6'} />
      <circle cx="82" cy="84" r="3.8" fill={monochrome ? 'currentColor' : '#2563EB'} />
    </svg>
  );

  // Mode 1: Integrated Inline Wordmark ("A" Logo + "nas Al-Tarayrah")
  if (inlineWord) {
    return (
      <span
        className={`anas-inline-brand ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          userSelect: 'none',
          direction: 'ltr',
          lineHeight: 1,
        }}
      >
        <MonogramSvg
          customStyle={{
            height: '1.06em',
            width: 'auto',
            verticalAlign: 'baseline',
            display: 'inline-block',
            marginRight: '-0.05em', // Tight letter-spacing matching font kerning
            transform: 'translateY(0.14em)', // Lower logo slightly for baseline alignment
            filter: 'drop-shadow(0 0 10px var(--accent-blue-glow))',
          }}
        />
        <span
          style={{
            background: monochrome
              ? 'currentColor'
              : 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent-blue) 100%)',
            WebkitBackgroundClip: monochrome ? 'unset' : 'text',
            WebkitTextFillColor: monochrome ? 'currentColor' : 'transparent',
            letterSpacing: '0.01em',
          }}
        >
          nas Al-Tarayrah
        </span>
      </span>
    );
  }

  // Dimensions mapping for Standalone mode
  const sizeMap = {
    sm: { iconSize: 28 },
    md: { iconSize: 36 },
    lg: { iconSize: 48 },
    xl: { iconSize: 64 },
  };

  const iconDimension = typeof size === 'number'
    ? size
    : (sizeMap[size]?.iconSize || 36);

  // Mode 2: Standalone Icon Only
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MonogramSvg customStyle={{ width: iconDimension, height: iconDimension }} />
    </div>
  );
};

export default AnasLogo;
