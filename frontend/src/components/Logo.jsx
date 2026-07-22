import React from 'react';
import { AnasLogo } from './AnasLogo';

/**
 * Reusable Logo Component
 * Accepts size, color, monochrome, and variant props for maximum versatility
 */
export const Logo = ({
  size = 'md',
  color = 'var(--accent-blue)',
  monochrome = false,
  animated = false,
  showText = true,
  className = '',
}) => {
  return (
    <AnasLogo
      size={size}
      color={color}
      monochrome={monochrome}
      animated={animated}
      showText={showText}
      className={className}
    />
  );
};

export default Logo;
