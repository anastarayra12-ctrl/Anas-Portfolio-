import React from 'react';
import { motion } from 'framer-motion';

/**
 * Anas Personal Brand Logo (Precision Geometry: Letter A + Code Brackets < > + Vector Anchor Node)
 * Built for Software Engineering (.NET) & UI/UX Design Systems
 */
export const AnasLogo = ({
  size = 'md',
  color = 'var(--accent-blue)',
  monochrome = false,
  animated = false,
  showText = true,
  className = '',
}) => {
  // Dimensions and Font Sizes mapping
  const sizeMap = {
    sm: { iconSize: 30, nameSize: '1.1rem', titleSize: '0.5rem', gap: 8 },
    md: { iconSize: 42, nameSize: '1.4rem', titleSize: '0.68rem', gap: 10 },
    lg: { iconSize: 58, nameSize: '1.9rem', titleSize: '0.88rem', gap: 14 },
    xl: { iconSize: 84, nameSize: '3rem', titleSize: '1.2rem', gap: 18 },
  };

  const currentSize = typeof size === 'number'
    ? { iconSize: size, nameSize: `${size * 0.035}rem`, titleSize: `${size * 0.018}rem`, gap: size * 0.25 }
    : sizeMap[size] || sizeMap.md;

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.4, ease: 'easeInOut' },
    },
  };

  const primaryStroke = monochrome ? 'currentColor' : 'url(#anasLogoGradPrimary)';
  const secondaryStroke = monochrome ? 'currentColor' : 'url(#anasLogoGradSecondary)';

  return (
    <motion.div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: `${currentSize.gap}px`,
        cursor: 'pointer',
        userSelect: 'none',
        direction: 'ltr',
        color: monochrome ? 'var(--text-primary)' : 'inherit',
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {/* Precision Geometric Monogram Vector Logo */}
      <svg
        width={currentSize.iconSize}
        height={currentSize.iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {!monochrome && (
          <defs>
            <linearGradient id="anasLogoGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="anasLogoGradSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        )}

        {/* Letter 'A' Monogram Framework & Outer Code Brackets */}
        {animated ? (
          <motion.path
            d="M 50 14 L 18 84 M 50 14 L 82 84 M 18 84 L 38 48 M 82 84 L 62 48"
            stroke={primaryStroke}
            strokeWidth="6"
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
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}

        {/* Precision Crossbar Line of 'A' */}
        {animated ? (
          <motion.path
            d="M 28 58 L 72 58"
            stroke={secondaryStroke}
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        ) : (
          <path
            d="M 28 58 L 72 58"
            stroke={secondaryStroke}
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Central Vector Anchor Diamond (UI/UX Precision Node & Code Focus) */}
        <polygon
          points="50,50 57,58 50,66 43,58"
          fill={monochrome ? 'currentColor' : '#38BDF8'}
        />

        {/* Glowing Vertex Dots */}
        <circle cx="50" cy="14" r="3.5" fill={monochrome ? 'currentColor' : '#38BDF8'} />
        <circle cx="18" cy="84" r="3.5" fill={monochrome ? 'currentColor' : '#3B82F6'} />
        <circle cx="82" cy="84" r="3.5" fill={monochrome ? 'currentColor' : '#2563EB'} />
      </svg>

      {/* Brand Text: Anas + Developer + Designer */}
      {showText && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            lineHeight: 1.1,
            textAlign: 'left',
          }}
        >
          <span
            style={{
              fontSize: currentSize.nameSize,
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              letterSpacing: '0.02em',
              background: monochrome
                ? 'currentColor'
                : 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-blue) 100%)',
              WebkitBackgroundClip: monochrome ? 'unset' : 'text',
              WebkitTextFillColor: monochrome ? 'currentColor' : 'transparent',
              color: monochrome ? 'var(--text-primary)' : 'inherit',
            }}
          >
            Anas
          </span>
          <span
            style={{
              fontSize: currentSize.titleSize,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: monochrome ? 'var(--text-secondary)' : 'var(--accent-blue)',
              textTransform: 'uppercase',
              marginTop: '2px',
              opacity: 0.9,
              whiteSpace: 'nowrap',
            }}
          >
            Developer + Designer
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default AnasLogo;
