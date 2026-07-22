import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CyberCodeBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Code tokens stream
    const codeTokens = ['01', '</>', '{ }', '=>', 'C#', '.NET', 'React', 'async', 'SQL', 'await', 'func()', 'useState', 'API', 'npm', 'git'];
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.3 + Math.random() * 0.5,
      token: codeTokens[Math.floor(Math.random() * codeTokens.length)],
      opacity: 0.08 + Math.random() * 0.18,
      size: 11 + Math.random() * 5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const textColor = isDark ? '56, 189, 248' : '37, 99, 235';

      // Draw floating code particles
      ctx.font = '13px monospace';
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(${textColor}, ${p.opacity})`;
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.token, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
};
