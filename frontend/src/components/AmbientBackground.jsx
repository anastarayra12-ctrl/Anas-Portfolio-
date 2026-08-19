import React from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export const AmbientBackground = () => {
  useMousePosition();

  return (
    <>
      {/* Layer 1: Base Linear Gradient Wrapper */}
      <div className="ambient-bg-wrapper" />

      {/* Layer 2: Slow Moving Ambient Glow Orbs */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />

      {/* Layer 3: Subtle Dot Grid Overlay (Base) */}
      <div className="ambient-dot-grid" />

      {/* Layer 4: Interactive Spotlight Masked Dot Grid Layer */}
      <div className="spotlight-grid" />
    </>
  );
};

export default AmbientBackground;
